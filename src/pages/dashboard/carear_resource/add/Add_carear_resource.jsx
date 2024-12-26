import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Kalbela_AuthProvider } from "../../../../context/MainContext";
import Custom_Button from "../../../../components/small_component/Custom_Button";
import Custom_Input from "../../../../components/small_component/Custom_Input";
import Link_Button from "../../../../components/small_component/Link_Button";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import JoditEditor from "jodit-react";
import sweet_alert from "../../../../utils/custom_alert";

const Add_career_resources = () => {
      const [fileName, setFileName] = useState("");
      const [description, setDescription] = useState("");
      const [preDeleteUrl, setPreDeleteUrl] = useState("");
      const [loading, setLoading] = useState(false);

      const { user, base_url, setWorkspace, setUser, setCookie } = useContext(Kalbela_AuthProvider);
      const navigate = useNavigate();

      const { data: category = [], isLoading, refetch } = useQuery({
            queryKey: ["career_resources_category"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/resource/category`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });



      const dataSubmit = async (e) => {
            e.preventDefault();
            const form_data = e.target;
            console.log(form_data, 'photo');
            const data = {
                  name: form_data.Name.value,
                  slag: form_data.Category.value,
                  description: description, // Use the state for description
            };
            console.log(data);
            fetch(`${base_url}/resource/create?token=${user._id}`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data)
            }).then((res) => res.json())
                  .then((data) => {
                        console.log(data, 'data');
                        if (!data.error) {
                              sweet_alert("Success", data.message, "success");
                              navigate("/admin/career-resources");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      };

      const handleFileChange = (event) => {
            const file = event.target.files[0];
            setSelectedFile(file);

            if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                        setPreDeleteUrl(reader.result);
                  };
                  reader.readAsDataURL(file);
                  setFileName(file.name);
            }
      };


      return (
            <div>
                  <div className="w-full">
                        <div className="px-10 py-4">
                              <Link_Button name='Back to Career Resources' url="/admin/career-resources" />
                        </div>
                        <div className="my-8">

                              <div className="p-10 border-2  rounded m-10">
                                    <form onSubmit={dataSubmit} className="w-full ">
                                          <Custom_Input label="Name" className="w-full" name="Name" type="text" placeholder="Category Name" />

                                          <div className="my-4 z-40">
                                                <Select name='Category' options={category.map(category => ({
                                                      value: category.slug,
                                                      label: category.name
                                                }))} />
                                          </div>

                                          <JoditEditor value={description}
                                                onChange={(newDescription) => setDescription(newDescription)} name="description" config={{
                                                      placeholder: "",
                                                }} className="my-4" />

                                          <div className='mt-4'>
                                                <Custom_Button name="Create Category" />
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Add_career_resources;

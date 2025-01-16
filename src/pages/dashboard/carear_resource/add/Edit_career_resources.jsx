import { useContext, useEffect, useState } from "react";
import { Kalbela_AuthProvider } from "../../../../context/MainContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Custom_Input from "../../../../components/small_component/Custom_Input";
import Select from "react-select";
import JoditEditor from "jodit-react";
import Custom_Button from "../../../../components/small_component/Custom_Button";
import sweet_alert from "../../../../utils/custom_alert";
import uploadImage from "../../../../hooks/upload_image";
import { Input } from "antd";

const Edit_career_resources = ({ data, refetch, set_modal }) => {
      const { user, base_url, setWorkspace, setUser, setCookie } = useContext(Kalbela_AuthProvider);
      const [description, setDescription] = useState(data.description);
      const [selectedCategory, setSelectedCategory] = useState({ value: data.slag, label: data.slag });
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      useEffect(() => {
            setSelectedCategory({ value: data.slag, label: data.slag });
            setDescription(data.description);
      }, [data]);

      const { data: category = [], isLoading } = useQuery({
            queryKey: ["career_resources_category"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/resource/category`);
                  const data = await res.json();
                  return data.data;
            },
      });

      const dataSubmit = async (e) => {
            e.preventDefault();
            const form_data = e.target;
            const submittedData = {
                  updated_at: new Date(),
                  name: form_data.Name.value,
                  slag: selectedCategory.value,
                  description: description, // Use the state for description
            };
            const photo = form_data?.photo?.files[0];

            if (photo) {
                  const photo_url = await uploadImage(photo);
                  submittedData.photo = photo_url;
            }

            console.log(submittedData)

            fetch(`${base_url}/resource/update?resource_id=${data._id}&token=${user._id}`, {
                  method: 'PUT',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(submittedData)
            }).then((res) => res.json())
                  .then((data) => {
                        set_modal(false);
                        refetch();
                        if (!data.error) {
                              sweet_alert("Success", data.message, "success");
                              navigate("/admin/career-resources");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      };

      return (
            <div>
                  <div className="p-10 border-2 rounded m-10">
                        <form onSubmit={dataSubmit} className="w-full">
                              <Input type="file" name="photo" className="w-full my-2" />
                              <Custom_Input
                                    label="Name"
                                    default_value={data.name}
                                    className="w-full"
                                    name="Name"
                                    type="text"
                                    placeholder="Category Name"
                              />

                              <div className="my-4 z-40">
                                    <Select
                                          name="Category"
                                          options={category?.map((cat) => ({
                                                value: cat?.slug,
                                                label: cat?.name,
                                          }))}
                                          value={selectedCategory}
                                          onChange={(option) => setSelectedCategory(option)}
                                    />
                              </div>

                              <JoditEditor
                                    value={description}
                                    onChange={(newDescription) => setDescription(newDescription)}
                                    name="description"
                                    className="my-4"
                              />

                              <div className="mt-4">
                                    <Custom_Button name="Update Category" />
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default Edit_career_resources;

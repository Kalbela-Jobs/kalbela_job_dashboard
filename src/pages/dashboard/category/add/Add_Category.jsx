import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Kalbela_AuthProvider } from "../../../../context/MainContext";
import Custom_Button from "../../../../components/small_component/Custom_Button";
import Custom_Input from "../../../../components/small_component/Custom_Input";
import Link_Button from "../../../../components/small_component/Link_Button";

const Add_Category = () => {
      const [fileName, setFileName] = useState("");
      const [preDeleteUrl, setPreDeleteUrl] = useState("");
      const [loading, setLoading] = useState(false);

      const { user, base_url, setWorkspace, setUser, setCookie } = useContext(Kalbela_AuthProvider);
      const navigate = useNavigate();

      const dataSubmit = async (e) => {
            e.preventDefault();
            const form_data = e.target;
            const photo = form_data.photo.files[0];
            const photo_url = await uploadImage(photo);
            const data = {
                  name: form_data.categoryName.value,
                  slag: form_data.slag.value,
                  photo: photo_url,
            };
            fetch(`${base_url}/category/add?token=${user._id}`, {
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
                              navigate("/dashboard/category");
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
                              <Link_Button name='Back to Category' url="/admin/category" />
                        </div>
                        <div className="my-8">

                              <div className="p-10 border-2  rounded m-10">
                                    <form onSubmit={dataSubmit} className="w-full ">
                                          <Custom_Input label="Category Name" name="categoryName" type="text" placeholder="Category Name" />
                                          <div className="my-4">
                                                <Custom_Input label="Category Slag" name="slag" type="text" placeholder="Category Slag" />
                                          </div>
                                          <input type="file" name="photo" onChange={handleFileChange} accept="image/*" />

                                          <div className='mt-4'>
                                                <Custom_Button handleClick={dataSubmit} name="Create Category" />
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Add_Category;

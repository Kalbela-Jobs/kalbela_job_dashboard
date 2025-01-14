import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Kalbela_AuthProvider } from "../../../../context/MainContext";
import Custom_Button from "../../../../components/small_component/Custom_Button";
import Custom_Input from "../../../../components/small_component/Custom_Input";
import Link_Button from "../../../../components/small_component/Link_Button";
import uploadImage from "../../../../hooks/upload_image";
import sweet_alert from "../../../../utils/custom_alert";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";

const Add_Category = () => {


      const { user, base_url, } = useContext(Kalbela_AuthProvider);
      const [select_mega_category, set_select_mega_category] = useState();
      const navigate = useNavigate();


      const { data: mega_category = [], isLoading, refetch } = useQuery({
            queryKey: ["mega-category"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/category/mega-category`
                  );
                  const data = await res.json();
                  return data.data;
            },
      });

      const dataSubmit = async (e) => {
            e.preventDefault();
            const form_data = e.target;
            console.log(form_data, 'photo');
            const photo = form_data?.photo?.files[0];
            const photo_url = await uploadImage(photo);
            if (form_data.categoryName.value === "" || form_data.slag.value === "" || select_mega_category === "" || photo_url === "") {
                  sweet_alert("Error", "Please fill all the fields", "error");
                  return;
            }
            const data = {
                  name: form_data.categoryName.value,
                  slag: form_data.slag.value,
                  mega_category: select_mega_category,
                  image: photo_url,
            };
            console.log(data, 'data');
            fetch(`${base_url}/category/create?token=${user._id}`, {
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
                              navigate("/admin/category");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
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
                                          <div className="my-4">
                                                <Select
                                                      required
                                                      onChange={(e) => set_select_mega_category(e)}
                                                      name="mega_category"
                                                      style={{ width: '100%', height: '2.5rem', lineHeight: '1.5rem' }} // Optimized inline styles
                                                      placeholder="Select Mega Category"
                                                      defaultValue={[]}
                                                      className="h-8 text-sm placeholder:text-black focus:ring-2 focus:ring-blue-500"
                                                      options={mega_category?.map((item) => ({ label: item.name, value: item._id }))}
                                                />
                                          </div>
                                          <Custom_Input required label="Category Name" name="categoryName" type="text" placeholder="Category Name" />
                                          <div className="my-4">
                                                <Custom_Input required label="Category Slag" name="slag" type="text" placeholder="Category Slag" />
                                          </div>
                                          <input type="file" name="photo" accept="image/*" />

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

export default Add_Category;

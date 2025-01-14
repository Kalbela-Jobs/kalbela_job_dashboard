import { useNavigate } from "react-router-dom";
import { Kalbela_AuthProvider } from "../../../../context/MainContext";
import { useContext, useState } from "react";
import Custom_Input from "../../../../components/small_component/Custom_Input";
import Custom_Button from "../../../../components/small_component/Custom_Button";
import uploadImage from "../../../../hooks/upload_image";
import sweet_alert from "../../../../utils/custom_alert";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";

const Edit = ({ data, refetch, set_modal }) => {
      const { user, base_url, } = useContext(Kalbela_AuthProvider);
      const [select_mega_category, set_select_mega_category] = useState(data?.mega_category);
      const navigate = useNavigate();

      const { data: mega_category = [], isLoading } = useQuery({
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
            const update_data = {
                  _id: data._id,
                  name: form_data.categoryName.value,
                  slag: form_data.slag.value,
                  mega_category: select_mega_category,
            };

            update_data.image = photo && await uploadImage(photo);
            fetch(`${base_url}/category/update`, {
                  method: 'PATCH',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(update_data)
            }).then((res) => res.json())
                  .then((data) => {
                        set_modal(false);
                        refetch();
                        if (!data.error) {
                              sweet_alert("Success", data.message, "success");

                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });
      };


      return (
            <div className="p-10 border-2  rounded m-10">
                  <form onSubmit={dataSubmit} className="w-full ">
                        <div className="my-4">
                              <Select
                                    required
                                    onChange={(e) => set_select_mega_category(e)}
                                    name="mega_category"
                                    style={{ width: '100%', height: '2.5rem', lineHeight: '1.5rem' }} // Optimized inline styles
                                    placeholder="Select Mega Category"
                                    defaultValue={mega_category?.find((item) => item._id === data.mega_category)?._id}
                                    className="h-8 text-sm placeholder:text-black focus:ring-2 focus:ring-blue-500"
                                    options={mega_category?.map((item) => ({ label: item.name, value: item._id }))}
                              />
                        </div>
                        <Custom_Input label="Category Name" name="categoryName" type="text" default_value={data.name} placeholder="Category Name" />
                        <div className="my-4">
                              <Custom_Input label="Category Slag" name="slag" type="text" default_value={data.slag} placeholder="Category Slag" />
                        </div>
                        <input type="file" name="photo" accept="image/*" />

                        <div className='mt-4'>
                              <Custom_Button name="Update Category" />
                        </div>
                  </form>
            </div>
      );
};

export default Edit;

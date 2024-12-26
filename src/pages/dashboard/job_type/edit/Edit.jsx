
import { useNavigate } from "react-router-dom";
import { Kalbela_AuthProvider } from "../../../../context/MainContext";
import { useContext } from "react";
import Custom_Input from "../../../../components/small_component/Custom_Input";
import Custom_Button from "../../../../components/small_component/Custom_Button";
import uploadImage from "../../../../hooks/upload_image";
import sweet_alert from "../../../../utils/custom_alert";

const Edit = ({ data, refetch, set_modal }) => {
      const { user, base_url, } = useContext(Kalbela_AuthProvider);
      const navigate = useNavigate();

      const dataSubmit = async (e) => {
            e.preventDefault();
            const form_data = e.target;

            const photo = form_data?.photo?.files[0];
            const update_data = {
                  _id: data._id,
                  name: form_data.typeName.value,
                  slag: form_data.slag.value,
            };

            update_data.image = photo && await uploadImage(photo);
            fetch(`${base_url}/job-type/update`, {
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
                        {/* <Custom_Input label="Category Name" name="categoryName" type="text" default_value={data.name} placeholder="Category Name" />
                        <div className="my-4">
                              <Custom_Input default_value={data.slag} label="Type Slag" name="slag" type="text" placeholder="Type Slag" />
                        </div>
                        <input type="file" name="photo" accept="image/*" /> */}

                        <Custom_Input default_value={data.name} label="Type Name" name="typeName" type="text" placeholder="Type Name" />
                        <div className="my-4">
                              <Custom_Input default_value={data.slag} label="Type Slag" name="slag" type="text" placeholder="Type Slag" />
                        </div>
                        <input type="file" name="photo" accept="image/*" />


                        <div className='mt-4'>
                              <Custom_Button name="Update Type" />
                        </div>
                  </form>
            </div>
      );
};

export default Edit;

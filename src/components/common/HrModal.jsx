import { Button, message } from "antd";
import { useContext, useState } from "react";
import Modal_Component from "./Modal_Component";
import Edit from "./Edit";
import { Kalbela_AuthProvider } from "../../context/MainContext";

const HrModal = ({ workspace }) => {
      const { base_url, user } = useContext(Kalbela_AuthProvider)

      const initialFormState = {
            company_id: workspace._id,
            name: "",
            email: "",
            role: "",
            permissions: [],
      };

      const [copy_url, set_copy_url] = useState(false);
      const [copied, setCopied] = useState(false);


      const [isOpen, setIsOpen] = useState(false);
      const [formData, setFormData] = useState(initialFormState);

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                  ...formData,
                  [name]: value,
            });
      };

      const handleCheckboxChange = (e) => {
            const { value, checked } = e.target;
            setFormData((prev) => {
                  if (checked) {
                        return {
                              ...prev,
                              permissions: [...prev.permissions, value],
                        };
                  } else {
                        return {
                              ...prev,
                              permissions: prev.permissions.filter(
                                    (permission) => permission !== value
                              ),
                        };
                  }
            });
      };

      const handleSubmit = (e) => {
            e.preventDefault();

            fetch(`${base_url}/admin/create-hr-account?token=${user._id}`, {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(formData)
            }).then((res) => res.json())
                  .then((data) => {
                        console.log(data, 'data');

                        if (!data.error) {
                              set_copy_url(data.data);
                              message.success(data.message);
                        }
                        else {
                              message.error(data.message);
                        }
                  })

            setFormData(initialFormState);

      };


      const copyToClipboard = async () => {
            try {
                  await navigator.clipboard.writeText(copy_url)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                  setTimeout(() => {
                        set_copy_url(false);
                  }, 2000);
                  setTimeout(() => {
                        setIsOpen(false);
                  }, 2000);

            } catch (err) {
                  console.error("Failed to copy: ", err)
            }
      }
      // Reset form when opening modal to ensure clean state
      const openModal = () => {
            setFormData(initialFormState);
            setIsOpen(true);
            set_copy_url(false);
            setCopied(false);

      };
      return (
            <div>
                  {/* Button to open modal */}
                  <button onClick={openModal}>
                        <Button> Add New User</Button>
                  </button>

                  {/* Modal Overlay */}
                  {isOpen && (
                        <Modal_Component title="Add New User" modal={isOpen} set_modal={setIsOpen} JSX={<Edit handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} data={formData} set_modal={setIsOpen} copy_url={copy_url} copied={copied} set_copy_url={set_copy_url} copyToClipboard={copyToClipboard} />}
                        />
                  )
                  }
            </div >
      );
};

export default HrModal;

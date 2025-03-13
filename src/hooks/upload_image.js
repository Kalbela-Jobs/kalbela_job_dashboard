
import sweet_alert from '../utils/custom_alert';

const uploadImage = async (file) => {


      try {
            const formData = new FormData();
            formData.append("image", file);

            // const url = `http://localhost:5005/api/v1/image/upload-image`;
            const url = `https://server.kalbelajobs.com/api/v1/image/upload-image`;
            const response = await fetch(url, {
                  method: "PUT",
                  body: formData,
            });

            if (!response.ok) {
                  sweet_alert('Failed to upload image', '', 'error');
                  throw new Error('Failed to upload image');

            }

            const imageData = await response.json();

            return imageData.data.image_url;
      } catch (error) {
            sweet_alert('Failed to upload image', error.message, 'error');
            return null;
      }
};


export default uploadImage;

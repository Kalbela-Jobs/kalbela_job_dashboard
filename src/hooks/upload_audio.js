
import sweet_alert from '../utils/custom_alert';

const upload_audio = async (file) => {


      try {
            const formData = new FormData();
            formData.append("audio", file);

            const url = `http://localhost:5005/api/v1/image/upload-audio`;
            const response = await fetch(url, {
                  method: "PUT",
                  body: formData,
            });

            if (!response.ok) {
                  sweet_alert('Failed to upload audio', '', 'error');
                  throw new Error('Failed to upload audio');

            }

            const imageData = await response.json();

            return imageData.data.audio_url;
      } catch (error) {
            sweet_alert('Failed to upload image', error.message, 'error');
            return null;
      }
};


export default upload_audio;

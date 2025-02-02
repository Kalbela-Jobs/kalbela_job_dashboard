import Swal from 'sweetalert2';

const sweet_alert = (title, text = "", icon = "success", timer = 1000) => {
      Swal.fire({
            title,
            text,
            icon,
            timer,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
            toast: true,
            customClass: {
                  container: 'swal2-container-top-end'
            }
      });
};

export default sweet_alert;

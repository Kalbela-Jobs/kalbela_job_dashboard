import logo from "../../../../../../assets/logo.png";
import { Link } from "react-router-dom";
const Brand = ({ ...props }) => (
      <img
            className="w-auto h-10"
            src={logo}
            alt="Kalbela Jobs logo"
            {...props}
            priority
      />
)
export default Brand

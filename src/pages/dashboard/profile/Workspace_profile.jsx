import { useContext } from "react";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import Profile from "./Profile";

const Workspace_profile = () => {

      const { workspace } = useContext(Kalbela_AuthProvider);

      return (
            <div>
                  <div className="p-8" >
                        <Profile initialData={workspace} />
                  </div>
            </div>
      );
};

export default Workspace_profile;

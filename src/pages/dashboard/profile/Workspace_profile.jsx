import { useContext } from "react";
import Profile from "./Profile";
import { Kalbela_AuthProvider } from "../../../context/MainContext";

const Workspace_profile = () => {

      const { workspace } = useContext(Kalbela_AuthProvider);

      return (
            <div>
                  <div >
                        <Profile initialData={workspace} />
                  </div>
            </div>
      );
};

export default Workspace_profile;

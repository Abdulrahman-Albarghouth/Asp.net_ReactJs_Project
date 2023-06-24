import ProfileInformation from "../components/Users/ProfileInfo";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const PersonalInfo = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);
  return (
    <>
      {token ? (
        <div>
          <div>
            <ProfileInformation  />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PersonalInfo;

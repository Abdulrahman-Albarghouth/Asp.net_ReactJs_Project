import { useContext } from "react";
import Users from "../components/Users/Users";
import { AuthContext } from "../context/AuthContext";


const Home = () => {
  
  const { user } = useContext(AuthContext);
  return (
    <>
      {user.userType == 1 && <Users />}
    </>
  );
};

export default Home;

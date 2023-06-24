import NavBar from "../NavBar/NavBar";

const Wrapper = ({ children }) => {
  return (
    <>
      <div>
        <NavBar/>
      </div>
      <div>{children}</div>

    </>
  );
};

export default Wrapper;

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NotFound = () => {
  const navigate = useNavigate()
  const { dashboardUser } = useContext(AuthContext);
  useEffect(()=>{
    if (dashboardUser?.type === "Admin") {
      navigate("/dashboard/home")
    }
  },[])
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white bg-[url('https://tailwindui.com/img/beams-basic-transparent.png')] py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              to={"/dashboard/"}
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
export default NotFound;

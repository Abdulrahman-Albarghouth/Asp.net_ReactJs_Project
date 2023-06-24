import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { NotificationCXT } from "../context/NotiContext";


const SignIn = () => {

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  
  const {toggleOn } = useContext(NotificationCXT);
  const { signIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    EMail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInUser = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("https://localhost:7212/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      toggleOn(json?.result.errorMessage, json?.result.errorCode);
      if (json.result.status) {
        signIn(json.result.data, json.loginResponse.token);
        setLoading(false);
        setError(null);
        navigate("/");
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInUser(formData);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://tailwindui.com/img/beams-basic-transparent.png')]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="EMail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleOnChange}
                    id="EMail"
                    placeholder="Email"
                    name="EMail"
                    type="EMail"
                    autoComplete="EMail"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleOnChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NotificationCXT } from "../../context/NotiContext";

const ProfileInformation = () => {
  const { token, setUser, user } = useContext(AuthContext);
  const imgRef = useRef();
  const { toggleOn } = useContext(NotificationCXT);


  const [formData, setFormData] = useState({
    ID: user.id,
    Name: user.name,
    Surname: user.surname,
    EMail: user.eMail,
    Phone: user.phone,
    password: "",
    PasswordRepeat: "",
  });

  const updateUserProfile = async (formData) => {
    try {
      console.log(formData);
  
      const res = await fetch(`https://localhost:7212/user`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const json = await res.json();
      toggleOn(json?.errorMessage, json?.status);
  
      if (json.status) {
        // Make sure 'user' is defined and has an 'id' property
        if (user && user?.id) {
          const userRes = await fetch(`https://localhost:7212/user/${user.id}`);
          const userJson = await userRes.json();
  
          setFormData({
            ...userJson,
            password: "",
            PasswordRepeat: "",
          });
  
          setUser(userJson);
          const token = localStorage.getItem("token");
          localStorage.setItem("user", JSON.stringify(userJson));
        } else {
          // Handle the case where 'user' is undefined or does not have an 'id' property
          // You can show an error message or perform other necessary actions
        }
      }
    } catch (error) {
      // Handle the error
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
    await updateUserProfile(formData);
  };

  return (
    <>
      <div className=" max-w-6xl mx-auto py-5 mt-10 sm:mt-0 ">
        <div className=" mx-12 md:grid md:grid-cols-1 md:gap-6">
          <div className="overflow-hidden shadow sm:rounded-md mt-10 md:col-span-2 bg-white">
            <div className="bg-gray-50 px-5 py-5 sm:px-6 ">
              <h3 className="text-2xl font-small leading-6 text-gray-500">
                Profile information
              </h3>
            </div>
            <form
              onSubmit={handleSubmit}
              action="/upload"
              method="post"
              enctype="multipart/form-data"
            >
              <div>
                <div className="mx-6 mt-6 flex items-center ">
                  <label htmlFor="avatar">
                  <img
                      className="inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100"
                      src={"https://cdn.lyft.com/riderweb/_next/static/media/default-avatar.27830b47.png"}
                    />
                  </label>
                </div>
              </div>
              <div className="">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        value={formData.Name}
                        type="text"
                        name="Name"
                        id="Name"
                        autoComplete="Name"
                        onChange={handleOnChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="surname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Surname
                      </label>
                      <input
                        value={formData.Surname}
                        type="text"
                        name="Surname"
                        id="Surname"
                        autoComplete="Surname"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={handleOnChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="eMail"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        value={formData.EMail}
                        type="text"
                        name="EMail"
                        id="EMail"
                        autoComplete="EMail"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        
                    onChange={handleOnChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone number
                      </label>
                      <input
                        value={formData.Phone}
                        type="text"
                        name="Phone"
                        id="Phone"
                        autoComplete="Phone"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        
                    onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New password
                      </label>
                      <input
                        value={formData.password}
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        
                    onChange={handleOnChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="PasswordRepeat"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm new password
                      </label>
                      <input
                        value={formData.PasswordRepeat}
                        type="password"
                        name="PasswordRepeat"
                        id="PasswordRepeat"
                        autoComplete="new-password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        
                    onChange={handleOnChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileInformation;

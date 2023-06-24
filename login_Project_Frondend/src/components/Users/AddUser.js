import { useContext, useState } from "react";
import { NotificationCXT } from "../../context/NotiContext";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";

const AddUser = ({addUserOpen, setAddUserOpen }) => {
  const { toggleOn } = useContext(NotificationCXT);
  const [formData, setFormData] = useState({
    Name: "",
    Surname: "",
    Phone: "",
    EMail: "",
    Password: "",
    PasswordRepeat: "",
  });

  const createUser = async (formData) => {
    try {
      const res = await fetch("https://localhost:7212/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      console.log(json);
      toggleOn(json?.errorMessage, json?.status);
      if (json?.status) setAddUserOpen(false)
    } catch (error) {
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
    await createUser(formData);
  };
  return (
    <>
      <Transition.Root show={addUserOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setAddUserOpen()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setAddUserOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create New User
                      </h2>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                      <div className="bg-white py-8 px-4  sm:rounded-lg sm:px-10">
                        <form
                          onSubmit={handleSubmit}
                          className="space-y-6"
                          action="#"
                          method="POST"
                        >
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Name
                            </label>
                            <div className="mt-1">
                              <input
                              onChange={handleOnChange}
                                id="name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                required
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="surname"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Surname
                            </label>
                            <div className="mt-1">
                              <input
                              onChange={handleOnChange}
                                id="surname"
                                name="surname"
                                type="surname"
                                autoComplete="surname"
                                required
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="eMail"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                            </label>
                            <div className="mt-1">
                              <input
                              onChange={handleOnChange}
                                id="eMail"
                                name="eMail"
                                type="eMail"
                                autoComplete="eMail"
                                required
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="Phone"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phone
                            </label>
                            <div className="mt-1">
                              <input
                              
                    onChange={handleOnChange}
                                id="Phone"
                                name="Phone"
                                type="Phone"
                                autoComplete="Phone"
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
                            <label
                              htmlFor="passwordRepeat"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Confirm Password
                            </label>
                            <div className="mt-1">
                              <input
                              onChange={handleOnChange}
                                id="passwordRepeat"
                                name="passwordRepeat"
                                type="password"
                                autoComplete="passwordRepeat"
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
                              Create
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddUser;

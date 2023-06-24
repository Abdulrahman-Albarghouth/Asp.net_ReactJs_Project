import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import Alert from "../Notification/Alert";
import { NotificationCXT } from "../../context/NotiContext";
import NoDataAlert from "../Notification/NoDataAlert";
import AddUser from "./AddUser";

const Users = () => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(NotificationCXT);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [conformDelete, setConformDelete] = useState(false);
  const [selectUserId, setSelectUserId] = useState(0);
  const [addUserOpen, setAddUserOpen] = useState(false);

  useEffect(() => {
    const getAllCategory = async () => {
      if (!addUserOpen) {
        try {
          const response = await fetch(`https://localhost:7212/users`);
          const json = await response.json();
          if (!json?.status) {
            toggleOn(json?.messages, json?.status);
          }
          setUsers(json.userList);
        } catch (error) {}
      }
    };
    getAllCategory();
  }, [addUserOpen]);
  useEffect(() => {
    if (conformDelete) {
      const deleteUser = async () => {
        try {
          const response = await fetch(
            `https://localhost:7212/user/${selectUserId}`,
            {
              method: "DELETE"
            }
          );
          const json = await response.json();
          toggleOn(json?.messages, json?.status);
          setConformDelete(false);
          if (json?.status) {
            const getAllUser = async () => {
              try {
                const response = await fetch(`https://localhost:7212/users`);
                const json = await response.json();
                if (!json?.status) {
                  toggleOn(json?.messages, json?.status);
                }
                setUsers(json.userList);
              } catch (error) {}
            };
            getAllUser();
          }
        } catch (error) {}
      };
      deleteUser();
    }
  }, [conformDelete]);
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 m-16">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setAddUserOpen(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add User
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Full Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        E Mail
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Delate</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users?.map((user) => (
                      <tr key={user.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={"https://cdn.lyft.com/riderweb/_next/static/media/default-avatar.27830b47.png"}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {user.name} {user.surname}
                              </div>
                              <div className="text-gray-500"></div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{user.phone}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{user.eMail}</div>
                        </td>
                        <td className=" cursor-pointer relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <TrashIcon
                              onClick={() => {
                                setOpen(true);
                                setSelectUserId(user.id);
                              }}
                              className="text-red-500 hover:text-red-700 w-6"
                            />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users == 0 && <NoDataAlert/>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Alert
          setConformDelete={setConformDelete}
          open={open}
          setOpen={setOpen}
        />
      )}
      {addUserOpen && (
        <AddUser
          addUserOpen={addUserOpen}
          setAddUserOpen={setAddUserOpen}
        />
      )}
    </>
  );
};

export default Users;

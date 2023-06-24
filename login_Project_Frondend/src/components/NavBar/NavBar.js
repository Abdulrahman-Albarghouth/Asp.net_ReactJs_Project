import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const NavBar = () => {
  const { user, token } = useContext(AuthContext);


  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white  shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
            </div>
          </div>
          <div className="relative z-10 flex items-center lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open menu</span>

              {open ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {token && (
            <div
              className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center"
              onMouseLeave={() => setOpen(!open)}
            >
              <div className="relative ml-4 flex-shrink-0">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onMouseEnter={() => setOpen(!open)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={"https://cdn.lyft.com/riderweb/_next/static/media/default-avatar.27830b47.png"}
                      alt=""
                    />
                  </button>
                   
                </div>
                

                {open && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                  className="block py-2 px-4 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  to={"/"}
                >
                  Home
                </Link>
                    <Link
                      className="block py-2 px-4 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      to={"/profile"}
                    >
                      Your Profile
                    </Link>
                    <Link
                      className="block py-2 px-4 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      to={"/signout"}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <nav
          className="hidden lg:flex lg:space-x-8 lg:py-2"
          aria-label="Global"
        >
        </nav>
      </div>

      {open && (
        <nav className="lg:hidden" aria-label="Global" id="mobile-menu">
          
          {token && (
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  to={"/profile"}
                >
                  Your Profile
                </Link>
                <Link
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  to={"/signout"}
                >
                  Sign Out
                </Link>
              </div>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};
export default NavBar;

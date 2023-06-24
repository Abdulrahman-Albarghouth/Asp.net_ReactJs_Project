import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { createContext, useState } from "react";

export const NotificationCXT = createContext();

const NotiContext = ({ children }) => {
  const [data, setData] = useState({
    open: false,
    message: "",
    success: null,
    icon :null,
  });
  const toggleOn = (message, success) => {
    setData({
      open: true,
      message,
      success,
      icon: success ? (
        <CheckCircleIcon
          className="h-6 w-6 text-green-400"
          aria-hidden="true"
        />
      ) : (
        <XCircleIcon className="h-6 w-6 text-red-700" aria-hidden="true" />
      ),
    });
  };
  const toggleOff = (reason) => {
    setData({
      open: false,
      message: "",
      success: null,
      icon :null
    });
  };
  return (
    <NotificationCXT.Provider
      value={{
        open: data.open,
        message: data.message,
        success: data.success,
        icon: data.icon,
        toggleOff,
        toggleOn,
      }}
    >
      {children}
    </NotificationCXT.Provider>
  );
};

export default NotiContext;

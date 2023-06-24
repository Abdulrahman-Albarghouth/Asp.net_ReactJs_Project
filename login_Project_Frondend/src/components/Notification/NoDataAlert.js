import { InformationCircleIcon } from "@heroicons/react/20/solid";

const NoDataAlert = () => {
  return (
    <div className="rounded-md bg-blue-100 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex ">
          <p className="text-sm text-blue-700 ">
            There are no Data!!
          </p>
        </div>
      </div>
    </div>
  );
};
export default NoDataAlert;

import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <Spinner
        label="Loading..."
        color="default"
        aria-label="Loading content"
      />
      <p className="mt-4 text-sm text-neutral-500">
        Please wait, content is loading...
      </p>
    </div>
  );
};

export default Loading;

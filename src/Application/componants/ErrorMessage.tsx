import { useError } from "../../Module/Observable/Errors.observable";

export const ErrorMessage = () => {
  const error = useError();
  return (
    <>
      {error != "" && (
        <p className="absolute bottom-6 text-red-500 text-sm">{error}</p>
      )}
    </>
  );
};

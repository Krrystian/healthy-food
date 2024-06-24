import React from "react";
import Button from "./Button";
import { googleAuthenticate } from "@/app/lib/googleAuthenticate";
import { useFormState } from "react-dom";

const GoogleButton = () => {
  const [errorMsgGoogle, dispatchGoogle] = useFormState(
    googleAuthenticate,
    undefined
  );

  return (
    <form className="w-full flex justify-center" action={dispatchGoogle}>
      <Button
        label="Sign in with Google"
        type="submit"
        className="w-[60%]"
        classNameLabel="bg-red-600"
        labelSecondary="And start your journey now!"
      />
    </form>
  );
};

export default GoogleButton;

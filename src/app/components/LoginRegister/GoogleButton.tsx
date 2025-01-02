//REFORMATTED
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
        className="w-[60%] border-2 border-black text-xl"
        classNameLabel="bg-red-600"
        labelSecondary="Start your journey now!"
      />
    </form>
  );
};

export default GoogleButton;

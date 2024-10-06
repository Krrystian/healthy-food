import { useCallback } from "react";
import axios from "axios";
import { ZodError } from "zod";
import { profileSchemas } from "../lib/zod";

const useProfileForm = (formType: string) => {
  const submitData = useCallback(
    async (data: any) => {
      try {
        const schema = profileSchemas[formType as keyof typeof profileSchemas];
        
        if (!schema) {
          throw new Error("Invalid form type");
        }

        try {
          schema.parse(data); 
        } catch (e) {
          if (e instanceof ZodError) {
            console.error("Validation error:", e.errors);
            return; 
          }
          throw e;
        }

        const response = await axios.post(`/api/profile/${formType}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response;
      } catch (error) {
        console.error("Error submitting data:", error);
      }
      
    },
    [formType]
  );

  return submitData;
};

export default useProfileForm;

import { useCallback } from "react";
import axios from "axios";

const useProfileForm = (formType: string) => {
  const submitData = useCallback(
    async (data: any) => {
        console.log("Data to submit:", data);
      try {
        const response = await axios.post(`/api/profile/${formType}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Data submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    },
    [formType]
  );

  return submitData;
};

export default useProfileForm;

import axios from "axios";
import { profileSchemas } from "../lib/zod";
import { ZodError } from "zod";
import { useS3Uploader } from "./useS3Uploader";

const useProfileForm = (formType: string, userEmail?: string) => {
  const { uploadToS3 } = useS3Uploader();

  const submitData = async (data: any) => {
    try {
      if (formType === "image" && data.image) {
        const imageUrl = await uploadToS3(data.image, userEmail || "");
        data.imageUrl = imageUrl;
      }

      const schema = profileSchemas[formType as keyof typeof profileSchemas];
      if (!schema) {
        throw new Error("Invalid form type");
      }

      const validationResult = schema.safeParse(data);
      if (!validationResult.success) {
        throw new ZodError(validationResult.error.errors);
      }

      const response = await axios.post(`/api/profile/${formType}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      return response;
    } catch (error) {
      console.error("Error submitting data:", error);
      throw error;
    }
  };

  return submitData;
};

export default useProfileForm;

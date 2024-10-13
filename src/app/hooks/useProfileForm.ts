import { useCallback } from "react";
import axios from "axios";
import { ZodError } from "zod";
import { profileSchemas } from "../lib/zod";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY || "",
  },
});

const useProfileForm = (formType: string, userEmail?:string) => {
  const submitData = useCallback(
    async (data: any) => {
      try {
        if (formType === "image") {
          const { image } = data;
          console.log(process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME)
          const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Key: `profile/${userEmail}`,
            Body: image,
            ContentType: image.type,
          };
          const command = new PutObjectCommand(params);
          await s3Client.send(command);

          const imageUrl = `https://${params.Bucket}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${params.Key}`;
          data.imageUrl = imageUrl;
        }
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

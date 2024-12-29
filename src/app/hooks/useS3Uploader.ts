import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY || "",
  },
});

export const useS3Uploader = () => {
  const uploadToS3 = async (file: File, userEmail: string = "", path: string = 'profile', name: string = "") => {
    const finalPath = path || 'profile';
    const fileName = userEmail.length > 1 ? userEmail : name;
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
      Key: `${finalPath}/${fileName}`, 
      Body: file,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    return `https://${params.Bucket}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${params.Key}`;
  };

  return { uploadToS3 };
};

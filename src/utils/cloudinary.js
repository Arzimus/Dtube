import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath)
    console.log(response)
    return response;

  } catch (error) {
    fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
}


const deleteFromCloudinary = async (publicId) => {
  console.log(publicId)
  try {
    const result = await cloudinary.uploader.destroy(publicId);

  } catch (error) {
    console.error('Error deleting image:', error);
    return null
  }
}

const extractPublicId = (url) => {
  // Strip the base URL and the version part
  const parts = url?.split('/');
  const versionIndex = parts?.findIndex(part => part.startsWith('v'));
  const publicIdParts = parts?.slice(versionIndex + 1); // Get everything after the version

  const publicIdWithExtension = publicIdParts?.join('/'); // Join remaining parts
  const publicId = publicIdWithExtension?.replace(/\.[^/.]+$/, ""); // Remove file extension

  return publicId;
};

export { uploadOnCloudinary, deleteFromCloudinary, extractPublicId }
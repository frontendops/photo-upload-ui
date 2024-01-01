import axios from "axios";
import { photoUploadUrl } from "./invoke-details.js";

export const photoUpload = async (id, image, imageNumber) => {
  try {
    const response = await axios.post(photoUploadUrl, {
            image,
            imageNumber,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('apiKey')
        },
        params: {
            userId: localStorage.getItem('userId')
        },
    });

    console.log(response.data)
  } catch (error) {
    console.error(error);
  }
};

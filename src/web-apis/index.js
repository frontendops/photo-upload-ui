import axios from "axios";
import { photoUploadUrl } from "./invoke-details.js";
import { authKeyAPI } from "../../authkey.js";

export const photoUpload = async (id, image, imageNumber) => {
  try {
    const response = await axios.post(photoUploadUrl, {
            image,
            imageNumber,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authKeyAPI
        },
        params: {
            userId: id
        },
    });

    console.log(response.data)
  } catch (error) {
    console.error(error);
  }
};


import axios from "axios";
import { photoUploadUrl } from "./invoke-details.js";
import { authKeyAPI } from "../../authkey.js";

export const photoUpload = async (id, image, imageNumber) => {
    console.log(id)
    console.log(image)
    console.log(imageNumber)
    console.log("invoking api")
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


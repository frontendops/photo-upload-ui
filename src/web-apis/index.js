/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { photoUploadUrl } from "./invoke-details.js";

export const photoUpload = async (id, images) => {
    console.log("invoking api")
  try {
    const response = await axios.post(photoUploadUrl, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'ka243'
        }

    });

    console.log(response.data)
  } catch (error) {
    console.error(error);
  }
};

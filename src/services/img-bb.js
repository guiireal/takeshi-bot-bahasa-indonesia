/**
 * Layanan upload gambar ke ImgBB
 *
 * @author MRX
 */
const { errorLog } = require("../utils/logger");
const axios = require("axios");
const FormData = require("form-data");

exports.imgbbUpload = async (buffer, options = {}) => {
  try {
    const API_KEY = "06d708fecaacbfa99d3dca1b1118d4ab";

    if (!API_KEY) {
      throw new Error("Kunci API ImgBB tidak disediakan");
    }

    const formData = new FormData();

    formData.append("image", buffer.toString("base64"));

    if (options.name) {
      formData.append("name", options.name);
    }

    if (options.expiration) {
      formData.append("expiration", options.expiration);
    }

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.error?.message || "Gagal upload ke ImgBB");
    }

    return {
      url: response.data.data.url,
      thumb: response.data.data.thumb?.url,
      medium: response.data.data.medium?.url,
      viewUrl: response.data.data.display_url,
      size: response.data.data.size,
      width: response.data.data.width,
      height: response.data.data.height,
      expiration: response.data.data.expiration,
      fullInfo: response.data.data,
    };
  } catch (error) {
    errorLog(
      `Error saat upload gambar ke ImgBB: ${JSON.stringify(error, null, 2)}`
    );

    if (error.response) {
      const apiError = error.response.data?.error || {};
      throw new Error(
        `Error API ImgBB: ${
          apiError.message || "Error tidak diketahui"
        } (Kode: ${apiError.code || "tidak diketahui"})`
      );
    } else if (error.request) {
      throw new Error("Tidak dapat terhubung ke server ImgBB");
    } else {
      throw new Error(`Error konfigurasi: ${error.message}`);
    }
  }
};

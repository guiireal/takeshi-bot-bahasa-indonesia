/**
 * Layanan unggah gambar dan pembuatan tautan.
 *
 * @author Dev Gui
 */
const FormData = require("form-data");
const axios = require("axios");

exports.upload = async (imageBuffer, filename) => {
  try {
    if (!Buffer.isBuffer(imageBuffer)) {
      throw new Error("Parameter pertama harus berupa Buffer yang valid!");
    }

    if (typeof filename !== "string" || filename.trim() === "") {
      throw new Error("Parameter kedua harus berupa nama file!");
    }

    if (imageBuffer.length === 0) {
      throw new Error("Buffer gambar kosong!");
    }

    const API_KEY = "6d207e02198a847aa98d0a2a901485a5";
    const API_URL = "https://freeimage.host/api/1/upload";

    const formData = new FormData();
    formData.append("key", API_KEY);
    formData.append("action", "upload");
    formData.append("source", imageBuffer, {
      filename: filename,
      contentType: "image/jpeg",
    });
    formData.append("format", "json");

    const response = await axios.post(API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const result = response.data;

    if (result.status_code !== 200) {
      throw new Error(
        `Kesalahan API: ${result.error?.message || "Kesalahan tidak diketahui"}`
      );
    }

    return result.image.url;
  } catch (error) {
    console.error("Kesalahan dalam mengunggah gambar:", error.message);

    if (error.response) {
      return {
        success: false,
        error: `Kesalahan HTTP ${error.response.status}: ${error.response.statusText}`,
      };
    } else if (error.request) {
      return {
        success: false,
        error: "Kesalahan jaringan: Tidak dapat terhubung ke server",
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
};

// === Cloudinary Upload Helper (KARTEJI PRO MAX) ===
// Cloudinary Account: dsnyytphm
// Upload Preset: karteji
// Fitur: otomatis resize (max width 800px), upload async

const cloudName = "dsnyytphm";
const uploadPreset = "karteji";

/**
 * Resize gambar sebelum upload (max 800px width)
 * @param {File} file - file asli dari input
 * @returns {Promise<Blob>} blob hasil resize
 */
async function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 800;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          blob => resolve(blob),
          "image/jpeg",
          0.9
        );
      };
    };
    reader.onerror = err => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Upload file ke Cloudinary (otomatis resize jika gambar)
 * @param {File} file - file gambar atau dokumen
 * @returns {Promise<string|null>} URL hasil upload atau null jika gagal
 */
async function uploadToCloudinary(file) {
  if (!file) {
    alert("Pilih file terlebih dahulu.");
    return null;
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const formData = new FormData();

  // Resize hanya untuk gambar
  let uploadFile = file;
  if (file.type.startsWith("image/")) {
    try {
      const resized = await resizeImage(file);
      uploadFile = new File([resized], file.name, { type: "image/jpeg" });
    } catch (err) {
      console.warn("Gagal resize, upload file asli:", err);
    }
  }

  formData.append("file", uploadFile);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();

    if (data.secure_url) {
      console.log("✅ File diupload:", data.secure_url);
      showToast?.("Upload berhasil!");
      return data.secure_url;
    } else {
      console.error("Upload gagal:", data);
      alert("Upload gagal. Cek preset Cloudinary kamu.");
      return null;
    }
  } catch (err) {
    console.error("❌ Error Cloudinary:", err);
    alert("Gagal mengunggah file.");
    return null;
  }
}

// Jadikan global agar bisa dipanggil di modul lain
window.uploadToCloudinary = uploadToCloudinary;

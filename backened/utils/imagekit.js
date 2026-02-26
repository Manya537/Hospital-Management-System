import ImageKit from "@imagekit/nodejs";

const imagekitClient = new ImageKit({
    privateKey: "private_dFTz0ABF08FR7jvVUx6n/W1YoIM=",
});

// ✅ Upload file function
export async function uploadFile(file) {
    const result = await imagekitClient.files.upload({
        file,
        fileName: "doctor_" + Date.now(),
        folder: "hospital/doctors",
    });
    return result;
}

// ✅ Delete file function (for future use)
export async function deleteFile(fileId) {
    const result = await imagekitClient.files.deleteFile(fileId);
    return result;
}
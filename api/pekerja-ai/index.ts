export const uploadImageToServer = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/pekerja-ai/upload", {
      method: "POST",
      body: formData,
      // Don't set Content-Type header - the browser will set it automatically with the correct boundary
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.details || "Upload failed");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Upload error:", error);
    throw new Error(error.message || "Failed to upload image");
  }
};

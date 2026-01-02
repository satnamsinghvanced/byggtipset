export interface ImageUploadResponse {
  success: boolean;
  message: string;
  fileUrl: string;
}

export async function uploadImage(file: File): Promise<ImageUploadResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("https://api.byggtipset.no/api/image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorData = { message: "Network response was not ok." };
    try {
      errorData = await response.json();
    } catch (e) {
      console.log("Failed to parse error response:", e);
    }
    console.log("Failed to upload image:", errorData.message);
    throw new Error(errorData.message || response.statusText);
  }

  const data: ImageUploadResponse = await response.json();
  console.log("Success! Image uploaded:", data);
  return data;
}

export async function uploadImages(
  files: File[]
): Promise<ImageUploadResponse[]> {
  const uploadPromises = files.map((file) => uploadImage(file));
  return Promise.all(uploadPromises);
}

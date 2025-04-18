export function base64ToBlob(base64: string, mimeType: string) {
  const byteString = atob(base64.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeType });
}

export async function compressImage(
  file: Blob | File,
  targetSizeKB: number,
  maxAttempts = 5,
) {
  if (!file.type.startsWith("image/")) {
    return file; // Return original if not an image
  }
  return new Promise(async (resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = async () => {
      URL.revokeObjectURL(url); // Free memory
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;
      const maxDimension = 2000; // Max width/height
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      // Binary search for optimal quality (faster than linear)
      let minQuality = 0.1;
      let maxQuality = 1.0;
      let compressedBlob: Blob | null = null;
      let attempts = 0;

      while (attempts < maxAttempts) {
        const midQuality = (minQuality + maxQuality) / 2;
        compressedBlob = (await canvasToBlob(
          canvas,
          "image/jpeg",
          midQuality,
        )) as Blob;
        const sizeKB = compressedBlob?.size / 1024;

        if (Math.abs(sizeKB - targetSizeKB) < targetSizeKB * 0.1) {
          // Within 10% of target? Good enough!
          break;
        } else if (sizeKB > targetSizeKB) {
          maxQuality = midQuality; // Need lower quality
        } else {
          minQuality = midQuality; // Can afford higher quality
        }
        attempts++;
      }

      resolve(compressedBlob);
    };
  });
}

export const checkError = (files: File[]) => {
  const hasErrors = files.map((file) => {
    if (file.size > 1000000) {
      return true;
    }
    return false;
  });

  return hasErrors.some((hasError) => hasError);
};

// Fixed: Properly await canvas.toBlob()
async function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number,
) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}

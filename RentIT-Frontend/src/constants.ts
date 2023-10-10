export function fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        resolve(event.target.result);
      } else {
        reject("Error reading file.");
      }
    };

    reader.onerror = (event) => {
      reject("Error reading file.");
    };

    reader.readAsDataURL(file);
  });
}

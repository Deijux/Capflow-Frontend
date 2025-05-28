export const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
export const MAX_IMAGE_SIZE_MB = 5;

export function filterValidImages(files: File[]) {
  return files.filter((file) => VALID_IMAGE_TYPES.includes(file.type));
}

export function filterTooLargeImages(files: File[]) {
  return files.filter((file) => file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024);
}

export function filterDuplicatedImages(
  newImages: File[],
  existingImages: File[],
) {
  return newImages.filter(
    (image) => !existingImages.some((img) => img.name === image.name),
  );
}

export function processImagesInput(
  files: FileList | File[],
  existingImages: File[],
  onValid: (validImages: File[]) => void,
) {
  const filesArray = Array.from(files);
  const validImages = filterValidImages(filesArray);

  if (validImages.length === 0) {
    alert("Por favor, sube imágenes en formato PNG, JPEG o JPG.");
    return;
  }

  const tooLargeImages = filterTooLargeImages(validImages);
  if (tooLargeImages.length > 0) {
    alert("El tamaño máximo permitido es de 5 MB por imagen.");
    return;
  }

  const checkDuplicated = filterDuplicatedImages(validImages, existingImages);
  if (checkDuplicated.length === 0) {
    alert("No puedes repetir imágenes.");
    return;
  }

  onValid(checkDuplicated);
}

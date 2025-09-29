import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useAdminContext } from "../../../../context/Admin/Admin.context";
import { SizeStock } from "../../../../types";
import { processImagesInput } from "../../utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputForm } from "../../../../components";
import { schema, FormValues } from "../../../../models/form.models";

const initialFormData = {
  name: "",
  description: "",
  price: 0,
  brand: "",
};

function ModalEdit() {
  const {
    modalEditStatus,
    handleModalEdit,
    productToEdit,
    updateProduct,
    isSuccessUpdate,
  } = useAdminContext();

  const [sizesStocks, setSizesStocks] = useState<SizeStock[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToAdd, setImagesToAdd] = useState<File[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: initialFormData,
  });

  useEffect(() => {
    if (productToEdit) {
      reset({
        name: productToEdit.name,
        description: productToEdit.description,
        price: Number(productToEdit.price),
        brand: productToEdit.brand,
      });
      setSizesStocks(productToEdit.details);
      setExistingImages(productToEdit.imagesUrl);
    }
  }, [productToEdit, reset]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processImagesInput(e.target.files, imagesToAdd, (validImages) => {
        setImagesToAdd((prevImages) => [...prevImages, ...validImages]);
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedImages = e.dataTransfer.files;

    if (droppedImages.length > 0) {
      processImagesInput(droppedImages, imagesToAdd, (validImages) => {
        setImagesToAdd((prevImages) => [...prevImages, ...validImages]);
      });
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    setExistingImages(existingImages.filter((img) => img !== imageUrl));
    setImagesToRemove([...imagesToRemove, imageUrl]);
  };

  const addSizeStockField = () => {
    setSizesStocks([...sizesStocks, { size: "", stock: 0 }]);
  };

  const removeSizeStockField = (index: number) => {
    if (sizesStocks.length > 1) {
      const updatedSizesStocks = sizesStocks.filter((_, i) => i !== index);
      setSizesStocks(updatedSizesStocks);
    }
  };

  const handleSizeStockChange = (
    index: number,
    field: keyof SizeStock,
    value: string | number,
  ) => {
    const updatedSizesStocks = [...sizesStocks];
    updatedSizesStocks[index] = {
      ...updatedSizesStocks[index],
      [field]:
        field === "stock"
          ? typeof value === "string"
            ? parseInt(value) || 0
            : value
          : value,
    };
    setSizesStocks(updatedSizesStocks);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!productToEdit) {
      return;
    }

    if (imagesToAdd.length === 0 && existingImages.length === 0) {
      alert("Por favor, agregue al menos una imagen");
      setIsLoading(false);
      return;
    }

    updateProduct({
      id: productToEdit.id,
      product: {
        ...data,
        details: sizesStocks,
      },
      images: imagesToAdd,
      existingImages,
    });
  };

  useEffect(() => {
    if (loaded) {
      handleModalEdit(false);
      setLoaded(false);
      setIsLoading(false);
      setSizesStocks([]);
      setImagesToAdd([]);
      setImagesToRemove([]);
    }
  }, [handleModalEdit, loaded]);

  useEffect(() => {
    setLoaded(isSuccessUpdate);
  }, [isSuccessUpdate]);

  if (!modalEditStatus || !productToEdit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl">
        {/* Modal content */}
        <div className="relative overflow-hidden rounded-lg bg-white shadow">
          {/* Modal header */}
          <div className="sticky top-0 z-10 flex items-start justify-between rounded-t border-b bg-white p-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Editar producto
            </h3>
            <button
              type="button"
              onClick={() => handleModalEdit(false)}
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Cerrar modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="max-h-[calc(90vh-130px)] space-y-6 overflow-y-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputForm
                name="name"
                control={control}
                label="Nombre del producto"
                placeholder="Ej. Zapatillas deportivas"
                type="text"
                error={errors.name}
              />
              <InputForm
                name="description"
                control={control}
                label="Descripción"
                placeholder="Describe el producto en detalle..."
                type="textarea"
                error={errors.description}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InputForm
                  name="price"
                  control={control}
                  label="Precio"
                  placeholder="Ej. 59.99"
                  type="number"
                  error={errors.price}
                  step="0.001"
                  min="0"
                />

                <InputForm
                  name="brand"
                  control={control}
                  label="Marca"
                  placeholder="Ej. Nike, Adidas, etc."
                  type="text"
                  error={errors.brand}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Tallas y Stock
                  <button
                    type="button"
                    onClick={addSizeStockField}
                    className="ml-2 rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 hover:bg-blue-200"
                  >
                    + Agregar talla
                  </button>
                </label>

                <div className="space-y-3">
                  {sizesStocks.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2 items-end gap-3 md:grid-cols-3"
                    >
                      <div>
                        <label className="block text-xs font-medium text-gray-500">
                          Talla
                        </label>
                        <input
                          type="text"
                          value={item.size}
                          onChange={(e) =>
                            handleSizeStockChange(index, "size", e.target.value)
                          }
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Ej. S, M, L, XL"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">
                          Cantidad
                        </label>
                        <input
                          type="number"
                          value={item.stock}
                          onChange={(e) =>
                            handleSizeStockChange(
                              index,
                              "stock",
                              e.target.value,
                            )
                          }
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        {sizesStocks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSizeStockField(index)}
                            className="flex items-center text-sm text-red-500 hover:text-red-700"
                          >
                            <svg
                              className="mr-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                            Eliminar
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección de imágenes existentes */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Imágenes Actuales
                </label>
                <div className="flex flex-wrap gap-2">
                  {existingImages.map((imgUrl, index) => (
                    <div key={index} className="relative">
                      <img
                        src={imgUrl}
                        alt={`Imagen ${index}`}
                        className="h-20 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(imgUrl)}
                        className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sección para agregar nuevas imágenes */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900">
                  Imágenes del producto
                </label>
                <div className="flex w-full items-center justify-center">
                  <label
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                      isDragging
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-300 bg-gray-50"
                    } transition-colors duration-200 hover:bg-gray-100`}
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="-400 mb-2 text-sm text-gray-500">
                        <span className="font-semibold">
                          Haz clic para subir
                        </span>
                        o arrastra y suelta
                      </p>
                      <p className="-400 text-xs text-gray-500">
                        PNG, JPG o JPEG (MAX. 5MB por imagen)
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      multiple
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </label>
                </div>

                {imagesToAdd.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium text-gray-900">
                      Imágenes seleccionadas:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {imagesToAdd.map((image, index) => (
                        <div key={index} className="group relative">
                          <div className="-700 truncate rounded-lg bg-gray-100 p-2 text-xs">
                            {image.name}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setImagesToAdd((prev) =>
                                prev.filter((_, i) => i !== index),
                              );
                            }}
                            className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Modal footer */}
          <div className="sticky bottom-0 flex items-center space-x-2 rounded-b border-t border-gray-200 bg-white p-6">
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="mr-2 inline h-4 w-4 animate-spin text-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </button>
            <button
              type="button"
              onClick={() => handleModalEdit(false)}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

function ProductImageUpload({
  imageFiles,
  setImageFiles,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrls,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  // console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    // console.log(event.target.files, "event.target.files");
    const selectedFiles = event.target.files;
    // console.log(selectedFile);

    if (selectedFiles && selectedFiles.length > 0) {
      setImageFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(selectedFiles),
      ]);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      setImageFiles((prevFiles) => [...prevFiles, ...Array.from(droppedFiles)]);
    }
  }

  function handleRemoveImage(index) {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const uploadedUrls = [];

    for (let file of imageFiles) {
      const data = new FormData();
      data.append("my_file", file);
      const response = await axios.post(
        "https://scn-royal-server.vercel.app/api/admin/products/upload-image",
        data
      );

      if (response?.data?.success) {
        uploadedUrls.push(response.data.result.url);
      }
    }

    setUploadedImageUrls(uploadedUrls);
    setImageLoadingState(false);
  }

  useEffect(() => {
    if (imageFiles.length > 0) uploadImageToCloudinary();
  }, [imageFiles]);

  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
          multiple
        />

        {!imageFiles.length > 0 ? (
          <Label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center h-32"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload images</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div>
            {imageFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileIcon className="w-8 text-primary mr-2 h-8" />
                </div>
                <p className="text-sm font-medium">{file.name}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveImage(index)}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove File</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;

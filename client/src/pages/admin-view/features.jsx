import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

function AdminFeatures() {
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  function handleUploadFeatureImage() {
    if (uploadedImageUrls.length > 0) {
      dispatch(addFeatureImage(uploadedImageUrls)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
          setImageFiles([]);
          setUploadedImageUrls([]);
        }
      });
    }
  }

  function handleDeleteImage(id) {
    // console.log("Deleting image with ID:", id);
    dispatch(deleteFeatureImage(id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        toast({
          title: "Image deleted successfully",
        });
      }
    });
  }

  // Disable the button if no image is selected or the image hasn't fully loaded
  const isButtonDisabled = imageFiles.length === 0 || imageLoadingState;

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <ProductImageUpload
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        uploadedImageUrls={uploadedImageUrls}
        setUploadedImageUrls={setUploadedImageUrls}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button
        onClick={handleUploadFeatureImage}
        disabled={isButtonDisabled}
        className="mt-5 w-full"
      >
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList &&
          featureImageList.length > 0 &&
          featureImageList.map((featureImgItem) => (
            <div className="relative" key={featureImgItem._id}>
              <img
                src={featureImgItem.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-red-500 bg-red-200 hover:text-red-700"
                onClick={() => handleDeleteImage(featureImgItem._id)}
              >
                {" "}
                <Trash className="w-6 h-6" style={{ strokeWidth: 2.5 }} />{" "}
                <span className="sr-only">Delete Image</span>
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminFeatures;

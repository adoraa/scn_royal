import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Laptop,
  Shirt,
  SprayCan,
  CookingPot,
  Gem,
  Luggage,
} from "lucide-react";
import { FaNeuter } from "react-icons/fa6";
import { IoMan, IoWoman } from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shop-view/product-tile";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shop-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import PaginationSection from "@/components/common/pagination";
import { handleAddToCart } from "@/utils/shop/cart";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: IoMan },
  { id: "women", label: "Women", icon: IoWoman },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "neutral", label: "Neutral", icon: FaNeuter },
];

const brandsWithIcon = [
  { id: "accessories", label: "Accessories", icon: Gem },
  { id: "clothes", label: "Clothes", icon: Shirt },
  { id: "electronics", label: "Electronics", icon: Laptop },
  { id: "travel_luggage", label: "Luggages & Bags", icon: Luggage },
  { id: "perfume", label: "Perfumes", icon: SprayCan },
  { id: "housewares", label: "Housewares", icon: CookingPot },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const totalProducts = productList.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const { featureImageList } = useSelector((state) => state.commonFeature);

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const guestId = "guest";
  const currentUserId = user?.id || guestId;

  const { cartItems } = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  const addToCartHandler = (productId, totalStock) => {
    handleAddToCart(productId, totalStock, currentUserId, cartItems, productList, dispatch, toast);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-56 overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-primary">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-primary">
            Product Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold text-nowrap">
                    {brandItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-primary">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts && currentProducts.length > 0
              ? currentProducts.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={() => addToCartHandler(productItem._id, productItem.stock)}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ShoppingHome;

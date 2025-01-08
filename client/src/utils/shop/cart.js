import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";

export const handleAddToCart = (
  getCurrentProductId,
  getTotalStock,
  currentUserId,
  cartItems,
  productList,
  dispatch,
  toast
) => {
  let getCartItems = cartItems?.items || [];

  if (getCartItems.length) {
    const indexOfCurrentItem = getCartItems.findIndex(
      (item) => item.productId === getCurrentProductId
    );

    const getCurrentProductIndex = productList.findIndex(
      (product) => product._id === getCurrentProductId
    );
    getTotalStock = productList[getCurrentProductIndex]?.totalStock;

    if (indexOfCurrentItem > -1) {
      const getQuantity = getCartItems[indexOfCurrentItem].quantity;

      if (getQuantity + 1 > getTotalStock) {
        toast({
          title: `Only ${getQuantity} ${
            getTotalStock > 1 ? "items" : "item"
          } can be added for this product`,
          variant: "destructive",
        });

        return;
      }
    }
  }

  dispatch(
    addToCart({
      userId: currentUserId,
      productId: getCurrentProductId,
      quantity: 1,
    })
  )
    .then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(currentUserId));
        toast({
          title: "Product added to cart",
        });
      } else {
        toast({
          title: "Failed to add product to cart",
          variant: "destructive",
        });
      }
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
      toast({
        title: "Internal Server Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    });
};

import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { handleAddToCart } from "@/utils/shop/cart";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const guestId = localStorage.getItem("guestId") || generateGuestId();
  const currentUserId = user?.id || guestId;
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Function to generate a random guestId if not already set
  function generateGuestId() {
    const newGuestId = `guest_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem("guestId", newGuestId);
    return newGuestId;
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      handleAddToCart(
        getCartItem?.productId,
        productList[getCartItem.productId]?.totalStock, // getTotalStock
        user?.id, // currentUserId
        cartItems, // cartItems
        productList, // productList
        dispatch, // dispatch
        toast // toast
      );
    } else {
      dispatch(
        updateCartQuantity({
          userId: user?.id,
          productId: getCartItem?.productId,
          quantity:
            typeOfAction === "plus"
              ? getCartItem?.quantity + 1
              : getCartItem?.quantity - 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Cart item updated successfully",
          });
        }
      });
    }
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item deleted successfully",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="min-w-20 max-w-20 md:min-w-48 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold max-w-40">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;

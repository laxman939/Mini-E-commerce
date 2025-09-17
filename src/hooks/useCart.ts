import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, removeFromCart, clearCart,updateQuantity, setOrderInfo, emptyOrderInfo} from '@/store/slices/cartSlice';
import { Product, ShippingInfo } from '@/types/product';


export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const addItemCart = (product: Product,quantity: number = 1) => {
    dispatch(addToCart({ product, quantity }));
  };

  const removeItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const updateItemQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId: (productId), quantity: quantity }));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const addOrderInfo = (obj: ShippingInfo) => {
     dispatch(setOrderInfo(obj));
  }

  const clearOrderInfo = () => {
    dispatch(emptyOrderInfo);
  }

  return {
    cart,
    addItemCart,
    removeItem,
    updateItemQuantity,
    clearCartItems,
    getCartTotal,
    getCartItemsCount,
    addOrderInfo,
    clearOrderInfo,
  };
};

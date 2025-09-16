import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, removeFromCart, clearCart,updateQuantity} from '@/store/slices/cartSlice';
import { Product } from '@/types/product';


export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const addItem = (product: Product,quantity: number = 1) => {
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

  return {
    cart,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCartItems,
    getCartTotal,
    getCartItemsCount,
  };
};

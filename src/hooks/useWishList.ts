import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addToWishlist, clearWishlist, removeFromWishlist } from '../store/slices/wishListSlice';
import { Product } from '@/types/product';
// import { Product } from '@/components/product/ProductGrid';


// If your wishlist is nested under cart, update the selector accordingly
export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist   || []);

  const addItem = (product: Product) => {
    dispatch(addToWishlist(product));
  };

  const removeItem = (productId: string) => {
    dispatch(removeFromWishlist(Number(productId)));
  };

  const clearWishlistItems = () => {
    dispatch(clearWishlist());
  };

  const isInWishlist = (productId: string) => {
    return wishlist?.items.some((item: Product) => String(item.id) === String(productId));
  };

  return {
    wishlist,
    addItem,
    removeItem,
    clearWishlistItems,
    isInWishlist,
  };
};

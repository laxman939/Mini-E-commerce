
import { CartItem, Product } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: CartItem[];
  discount: number;
  promoCode?: string;
}

const initialState: CartState = {
  items: [],
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product:Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => 
        Number(item.id) === Number(product.id) && 
        JSON.stringify(item.selectedVariant) === JSON.stringify(product.selectedVariant)
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({
          id: (product.id).toString(),
          name: product.name ||  "",
          price: product.price,
          quantity,
          image: product.image,
          category: product.category,
          selectedVariant: product.selectedVariant,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.discount = 0;
      state.promoCode = "";
    },
    applyDiscount: (state, action: PayloadAction<{ code: string; amount: number; type: string }>) => {
      const { code, amount } = action.payload;
      state.discount = amount;
      state.promoCode = code;
    },
    removeDiscount: (state) => {
      state.discount = 0;
      state.promoCode = "";
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyDiscount,
  removeDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;
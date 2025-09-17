import { CartItemType, Product, ShippingInfo } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CartState {
  items: CartItemType[];
  discount: number;
  promoCode?: string;
  orderInfo?: ShippingInfo;
}

const initialState: CartState = {
  items: [],
  discount: 0,
  orderInfo: {
    firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
    orderId: "",
  trackingNumber: "",
  deliveryDate: ""
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product:Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
   const existingItem = state.items.find(
  (item) =>
    item.id === product.id.toString() &&
    JSON.stringify(item.selectedVariant) === JSON.stringify(product.selectedVariant)
);

if (existingItem) {
  existingItem.quantity += quantity;
} else {
  state.items.push({
    id: product.id.toString(),
    name: product.title,
    price: product.price,
    quantity,
    image: product.image,
    category: product.category,
    selectedVariant: product.selectedVariant,
    images: product.images,
    thumbnail: product.thumbnail,
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

    setOrderInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.orderInfo = action.payload;
    },

    emptyOrderInfo: (state) => {
      state.orderInfo = {
    firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  orderId: "",
  trackingNumber: "",
  deliveryDate: ""
  };
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
  setOrderInfo,emptyOrderInfo

} = cartSlice.actions;

export default cartSlice.reducer;
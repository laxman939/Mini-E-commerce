export interface CartItem {
  id: number
  title: string
  price: number
  qty: number
  image: string
 name: string
 selectedVariant: {
    name: string;
    value: string;
  };
  category: string
  discount: number
  promoCode: string
  total: number
  subtotal: number
  quantity: number
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}
const initialState: CartState = { items: [] };

const clamp = (q: number, stock: number) => Math.max(1, Math.min(q, stock));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
    const found = state.items.find((i) => i.bookId === action.payload.bookId);
    if (found) found.quantity = clamp(found.quantity + 1, found.stock);   // đã có → tăng, không vượt stock
    else state.items.push({ ...action.payload, quantity: 1 });            // chưa có → thêm mới
  },
  removeItem(state, action: PayloadAction<number>) {
    state.items = state.items.filter((i) => i.bookId !== action.payload);
  },
  setQuantity(state, action: PayloadAction<{ bookId: number; quantity: number }>) {
    const found = state.items.find((i) => i.bookId === action.payload.bookId);
    if (found) found.quantity = clamp(action.payload.quantity, found.stock);
  },
  clearCart(state) {
    state.items = [];
  },
  hydrateCart(state, action: PayloadAction<CartItem[]>) {   // giữ nguyên, có sẵn
    state.items = action.payload;
  },
},
});

export const { addItem, removeItem, setQuantity, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;

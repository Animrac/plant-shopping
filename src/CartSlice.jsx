import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        //we check if the item is already in the items array state
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ name, image, cost, quantity: 1 });
        }
        state.totalItems = 0;
        state.items.forEach(item => {
            state.totalItems += item.quantity;
        });
    },
    removeItem: (state, action) => {
        //makes a smaller array without the action item with the name
        state.items = state.items.filter(item => item.name !== action.payload.name);
        
        state.totalItems = 0;
        state.items.forEach(item => {
            state.totalItems += item.quantity;
        });
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
        }
        state.totalItems = 0;
        state.items.forEach(item => {
            state.totalItems += item.quantity;
        });
    }
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

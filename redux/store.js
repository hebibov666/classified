import { configureStore } from '@reduxjs/toolkit'
import { booksData } from './slices/categorySlices'
import { productsData } from './slices/products'
import { User } from './slices/userSlice'
export const store = configureStore({
  reducer:{
    book:booksData.reducer,
    products:productsData.reducer,
    user:User.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
}),
})

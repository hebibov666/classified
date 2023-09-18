import { configureStore } from '@reduxjs/toolkit'
import { booksData} from './slices/categorySlices'
import { models } from './slices/ModelSlices'

export const store = configureStore({
  reducer:{
    book:booksData.reducer,
    models:models.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
}),
})

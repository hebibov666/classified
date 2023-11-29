
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const products = createAsyncThunk("products", async ({category,page}) => {
  const response = await axios.get(`http://localhost:3001/products/products/${category}?page=${page}`)
  console.log(response);
  return response.data
})

export const SearchProduct=createAsyncThunk('user/SearchProduct',async(text)=>{
  const request=await axios.get(`https://listingwebsite.onrender.com/search/${text}`)
   
 return request.data

})

export const AdvancedSearchs=createAsyncThunk('user/SearchProduct',async(parameter)=>{
  const request=await axios.post(`https://listingwebsite.onrender.com/advancedsearch`,parameter)
   console.log(request.data)
 return request.data

})

export  const productsData = createSlice({
  name: 'models',
  initialState:{
   data:[],
   loading:true,
   error:null,
   searchProducts:[],
   searchLoading:false,
   searchError:false
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(products.pending, (state) => {
      state.loading=true
        state.error = null;
      })
      builder.addCase(products.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.meta.arg.page === 1 ? action.payload : [...state.data, ...action.payload];
        console.log(action.payload);
      })
      builder.addCase(products.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder.addCase(SearchProduct.pending,(state,action)=>{
       state.searchLoading=true
       state.searchError=false
      });
      builder.addCase(SearchProduct.fulfilled,(state,action)=>{
        state.searchLoading=false
        state.searchProducts=action.payload
      });
      builder.addCase(SearchProduct.rejected,(state,action)=>{
        state.searchLoading=false;
        state.searchError=true
      })
  },

});

export const {} = productsData.actions;

export default productsData.reducer;
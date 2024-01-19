
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const products = createAsyncThunk("products", async ({category,page}) => {
  const response = await axios.get(`https://weblisting.onrender.com/products/products/${category}?page=${page}`)
  console.log(response);
  return response.data
})

export const SearchProduct=createAsyncThunk('user/SearchProduct',async(text)=>{
  const request=await axios.get(`https://weblisting.onrender.com/search/${text}`)
   
 return request.data

})

export const AdvancedSearchs=createAsyncThunk('user/SearchProduct',async(parameter)=>{
  const request=await axios.post(`https://weblisting.onrender.com/advancedsearch`,parameter)
   console.log(request.data)
 return request.data

})

export  const productsData = createSlice({
  name: 'models',
  initialState:{
   data:[],
   loading:true,
   error:false,
   searchProducts:[],
   searchLoading:false,
   searchError:false,
  },
  reducers: {
  refreshData:(state)=>{
    state.data=[]
  }
  },
  extraReducers: (builder) => {
      builder.addCase(SearchProduct.pending,(state,action)=>{
       state.searchLoading=true
       state.searchError=false
      });

      builder.addCase(SearchProduct.fulfilled,(state,action)=>{
        state.searchLoading=false
        state.data=action.payload
      });
      builder.addCase(SearchProduct.rejected,(state,action)=>{
        state.searchLoading=false;
        state.searchError=true
      })
  },

});

export const {refreshData} = productsData.actions;

export default productsData.reducer;
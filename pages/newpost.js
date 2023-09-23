import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ClearIcon from '@mui/icons-material/Clear';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { writeData } from '@/redux/slices/categorySlices';
function NewPost() {
  const [category, setCategory] = useState(0)
  const options = useSelector(state => state.book.list)
  const screens = useSelector(state => state.book.screenSize)
  const [selectedCategory, setSelectedCategory] = useState()
const [images,setImages]=useState([])
const dispatch=useDispatch()


  const submit = ()=>{
  
    dispatch(writeData(formData));
  }
const [formData, setFormData] = useState({
 
});


const handleInputChange = (e) => {
  const { name, value } = e.target; 
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleImageChange = (e) => {
  const files = e.target.files; 

  const imageArray = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

  const imageUrl = URL.createObjectURL(file); 
      imageArray.push(imageUrl);
   
  }

  setImages([...images, ...imageArray]);
  console.log(images)
};



  const renderFormBasedOnCategory = () => {
    switch (selectedCategory) {
      case "Telefon":
        return (
          <select  value="" onChange={handleInputChange} className='w-[80%]  h-[30px] pl-2 outline-none border-0 text-[#a9a9a9]'>
            {options[0].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
        );
      case "Komputer":
        return (
          <select value="" onChange={handleInputChange} className='w-[80%]  h-[30px] outline-none border-0 pl-2 text-[#a9a9a9]'>
            {options[1].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
        );
      case "Televizor":
        return (
         <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
           <select onChange={handleInputChange} className='w-full h-[30px] pl-2 outline-none border-0'>
            {options[2].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
         </div>
        );
        case "Akksesuar":
        return (
         <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
           <select  onChange={handleInputChange} className='w-full h-[30px] pl-2 outline-none border-0'>
            {options[3].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
         </div>
        );
      default:
        return null;
    }
  };
const deleteImage=(ind)=>{
  const filterimg=images.filter((image,index)=>index!=ind)
  setImages(filterimg)
}
const write=()=>{
  console.log(formData);
}

  return (
    <div className='flex newpost flex-col items-center bg-[#F8F9FD]  pb-[60px] '>
      <div className='flex w-full items-center gap-[20px] justify-start'>

        <div className='flex relative h-[40px] w-full justify-center bg-[transform] items-center'>
          <Link href="/">
            <ArrowBackIcon className='absolute top-2 left-2' fontSize='medium' />
          </Link>
          <h1 className='text-xl'>Yeni elan əlavə et</h1>
        </div>
      </div>
      <div className="w-[80%] max-[600px]:w-[100%]  noscroll h-[100%]   gap-[20px] bg-[#F8F9FD] pt-[40px] grid grid-cols-1 justify-center  place-items-center">
        <select name='category' value={formData.category || ''}  onChange={(e) => { setSelectedCategory(e.currentTarget.value),handleInputChange(e)}} className='w-[80%] outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
          {options.map(category => {
            return <option  value={category.name}>{category.name}</option>
          })}
        </select>
        {renderFormBasedOnCategory()}
        <input type='text'   name="title"
        value={formData.title || ''}
      
        onChange={handleInputChange} placeholder='Elan basligi' className='w-[80%] outline-none border-0  h-[30px] pl-2'></input>
        <input type='text'  
           name="price"
           value={formData.price || ''}
        onChange={handleInputChange} placeholder='Qiymet' className='w-[80%] outline-none border-0  h-[30px] pl-2'></input>
        <textarea name="description" 
        
           value={formData.description || ''}
        onChange={handleInputChange} placeholder='description' className='w-[80%] outline-none border-0 textarea pl-2'></textarea>
        <label htmlFor='fileInput' className='w-[80%] h-[35px] gap-[10px] bg-white flex items-center justify-center text-blue-600 font-bold'>
          <InsertPhotoIcon/>
          <h1>Şəkil seç</h1>
        <input type='file'  id="fileInput" multiple className='hidden'  accept="image/*" onChange={handleImageChange} ></input>
        </label>
  
        <div className='w-[80%] flex gap-[20px]'>
          {images.map((image,index)=>{
            return <div className='photo'>
              <img src={image} className='photosrc'></img>
              <ClearIcon onClick={()=>{deleteImage(index)}} className='icon'/>
              </div>
          })}
        </div>
        <button onClick={submit} className='w-[80%] bg-red-600 h-[40px] text-white'>Paylas</button>
      </div>
    </div>
  );
};

export default NewPost;

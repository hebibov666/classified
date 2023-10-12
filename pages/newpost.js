import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ClearIcon from '@mui/icons-material/Clear';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axios from 'axios'
import { data } from 'autoprefixer';
function NewPost() {
  const [category, setCategory] = useState(0)
  const options = useSelector(state => state.book.list)
  const colors = useSelector(state => state.book.colors)
  const screens = useSelector(state => state.book.screenSize)
  const [selectedCategory, setSelectedCategory] = useState()
  const [images, setImages] = useState([])
  const dispatch = useDispatch()
  const form = useRef()

  const submit = async (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('title',e.target.title.value)
    formdata.append('price',e.target.price.value)
    const files = form.current.files;
    for (let i = 0; i < files.length; i++) {
      formdata.append(`files`, files[i]);
    }

    console.log(Object.fromEntries(formdata));

    try {
      const response = await axios.post('http://localhost:3001/products',formdata)
  
      if (!response.ok) {
        throw new Error('HTTP Hatası: ' + response.status);
      }
  
    
  console.log(formData)
      
    } catch (error) {
      console.error('Hata:', error);
  
  
    }
  };


  const handleImageChange = (e) => {
    const files = e.target.files;
    const { name } = e.target
    const newImages = [...images];
 for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Image = reader.result.toString();
        newImages.push(base64Image);
 setImages(newImages);
};
 reader.readAsDataURL(file);
    }
  };



  const renderFormBasedOnCategory = () => {
    switch (selectedCategory) {
      case "Telefon":
        return (
          <select name='model' className='w-[80%]  h-[30px] pl-2 outline-none border-0 text-[#a9a9a9]'>
            {options[0].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
        );
      case "Komputer":
        return (
          <select name='model' className='w-[80%]  h-[30px] outline-none border-0 pl-2 text-[#a9a9a9]'>
            {options[1].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
        );
      case "Televizor":
        return (
          <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
            <select name='model' className='w-full h-[30px] pl-2 outline-none border-0'>
              {options[2].models.map(item => {
                return <option>{item}</option>
              })}
            </select>
          </div>
        );
      case "Akksesuar":
        return (
          <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
            <select name='model' className='w-full h-[30px] pl-2 outline-none border-0'>
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
  const deleteImage = (ind) => {
    const filterimg = images.filter((image, index) => index != ind)
    setImages(filterimg)
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
        <form onSubmit={submit} encType='multipart/form-data' className="w-[80%] max-[600px]:w-[100%]  noscroll h-[100%]   gap-[20px] bg-[#F8F9FD] pt-[40px] grid grid-cols-1 justify-center  place-items-center">
          <select name='category' onChange={(e) => { setSelectedCategory(e.currentTarget.value) }} className='w-[80%] outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            {options.map(category => {
              return <option value={category.name}>{category.name}</option>
            })}
          </select>
          {renderFormBasedOnCategory()}
          <select name='color' className='w-[80%] outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            {colors.map(color => {
              return <option value={category.name}>{color}</option>
            })}
          </select>
          <input type='text' name="title"
            placeholder='Elan basligi' className='w-[80%] outline-none border-0  h-[30px] pl-2'></input>
          <input type='text'
            name="price"
            placeholder='Qiymet' className='w-[80%] outline-none border-0  h-[30px] pl-2'></input>
          <textarea name="description"
            placeholder='description' className='w-[80%] outline-none border-0 textarea pl-2'></textarea>
          <label htmlFor='fileInput' className='w-[80%] h-[35px] gap-[10px] bg-white flex items-center justify-center text-blue-600 font-bold'>
            <InsertPhotoIcon />
            <h1>Şəkil seç</h1>
            <input type='file' ref={form} id="fileInput" multiple className='hidden'  accept="image/*" onChange={handleImageChange} ></input>
          </label>
          <div className='w-[80%] flex gap-[20px]'>
            {images.map((image, index) => {
              return <div className='photo'>
                <img src={image} className='photosrc'></img>
                <ClearIcon onClick={() => { deleteImage(index) }} className='icon' />
              </div>
            })}
          </div>
          <button type='submit' className='w-[80%] bg-red-600 h-[40px] text-white'>Paylas</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;

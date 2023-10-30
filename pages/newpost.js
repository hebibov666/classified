import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ClearIcon from '@mui/icons-material/Clear';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as Yup from 'yup'; 
import { useFormik } from 'formik'; 
function NewPost() {
  const [category, setCategory] = useState(0);
  const options = useSelector(state => state.book.list);
  const cities = useSelector(state => state.book.city);
  const colors = useSelector(state => state.book.colors);
  const screens = useSelector(state => state.book.screenSize);
  const [selectedCategory, setSelectedCategory] = useState();
  const [images, setImages] = useState([]);
  const [photos,setPhotos]=useState([])
  const router = useRouter();
  const dispatch = useDispatch();
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const user = useSelector(state => state.user.user);

  
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Elan adı daxil edin'),
    price: Yup.number().required('Qiymət daxil edin'),
    description: Yup.string().required('Məhsul açığlaması yazın'),
    color: Yup.string().required('Rəng seçin'),
    number:Yup.string().required('Telefon nömrəsi daxil edin'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      description: '',
      color:'',
      model:'',
      city:'',
      number:'',
      whatsappNumber:'',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append('title', values.title);
      formdata.append('price', values.price);
      formdata.append('description', values.description);
      formdata.append('userid', user?._id);
formdata.append('category',selectedCategory)
formdata.append('color',values.color)
formdata.append("model",values.model)
formdata.append("number",values.number)
formdata.append("whatsappNumber",values.whatsappNumber)
console.log(values);
      const files = form.current.files;
      for (let i = 0; i < photos.length; i++) {
        formdata.append(`files`, photos[i]);
      }
console.log(Object.fromEntries(formdata));
      if (user) {
        setSuccess(true);
        try {
          const response = await axios.post('https://finalproject-etqp.onrender.com/products', formdata);

          if (!response.ok) {
            throw new Error('HTTP Xətası: ' + response.status);
          }
          setSuccess(false);
        } catch (error) {
          console.error('Xəta:', error);
        } finally {
          setSuccess(false);
        }
      }
    },
  });

  const handleImageChange = (e) => {
    const files = e.target.files;
    const { name } = e.target;
    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setPhotos([...photos,files[i]])
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
          <select name='model' value={formik.values.model}
          onChange={formik.handleChange} className='w-[80%]  h-[30px] pl-2 outline-none border-0 text-[#a9a9a9]'>
            {options[0].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
        );
      case "Komputer":
        return (
          <select name='model' value={formik.values.model}
          onChange={formik.handleChange} className='w-[80%]  h-[30px] outline-none border-0 pl-2 text-[#a9a9a9]'>
            {options[1].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
        );
      case "Televizor":
        return (
          <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
            <select name='model' value={formik.values.model}
            onChange={formik.handleChange} className='w-full h-[30px] pl-2 outline-none border-0'>
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
    const filterimg = images.filter((image, index) => index !== ind);
    setImages(filterimg);
  };

  return (
    <div className='flex newpost flex-col items-center bg-[#F8F9FD]  pb-[60px] '>
      <div className='flex w-full items-center gap-[20px] justify-start'>
        <div className='flex relative h-[40px] w-full justify-center bg-blue-600 text-white font-bold items-center'>
          <ArrowBackIcon onClick={() => router.back()} className='absolute top-2 left-2' fontSize='medium' />
          <h1 className='text-xl'>Yeni elan əlavə et</h1>
        </div>
      </div>
      <div className="w-[80%] max-[600px]:w-[100%]  noscroll h-[100%]   gap-[20px] bg-[#F8F9FD] pt-[40px] grid grid-cols-1 justify-center  place-items-center">
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className="w-[80%] max-[600px]:w-[100%]  noscroll h-[100%]   gap-[20px] bg-[#F8F9FD] pt-[40px] grid grid-cols-1 justify-center  place-items-center">
          <select name='category' value={formik.values.category} onChange={(e) =>setSelectedCategory(e.currentTarget.value)} className='w-[80%] outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            {options.map(category => {
              return <option value={category.name}>{category.name}</option>
            })}
          </select>
          {renderFormBasedOnCategory()}
          <select name='color'  value={formik.values.color}
            onChange={formik.handleChange} className='w-[80%] outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            {colors.map(color => {
              return <option value={color.name}>{color}</option>
            })}
          </select>
          <select name='color'  value={formik.values.city}
            onChange={formik.handleChange} className='w-[80%] outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            {cities.map(city => {
              return <option value={city}>{city}</option>
            })}
          </select>
          <input
            type='text'
            name="title"
            placeholder='Elan basligi'
            className='w-[80%] outline-none border-0  h-[30px] pl-2'
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && <p className='text-red-600  text-start w-[80%] pl-[2px] mt-[-15px]'>{formik.errors.title}</p>}
          <input
            type='text'
            name="price"
            placeholder='Qiymet'
            className='w-[80%] outline-none border-0  h-[30px] pl-2 mt-[-10px]'
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price && <p className='text-red-600  text-start w-[80%] pl-[2px] mt-[-15px]'>{formik.errors.price}</p>}
          <textarea
            name="description"
            placeholder='description'
            className='w-[80%] outline-none border-0 textarea pl-2 mt-[-10px]'
            value={formik.values.description}
            onChange={formik.handleChange}
          />
           <input
            type='text'
            name="number"
            placeholder='Telefon nömrəsi'
            className='w-[80%] outline-none border-0  h-[30px] pl-2'
            value={formik.values.number}
            onChange={formik.handleChange}
          />
           <input
            type='text'
            name="whatsappNumber"
            placeholder='Whatsapp nömrəsi'
            className='w-[80%] outline-none border-0  h-[30px] pl-2'
            value={formik.values.whatsappNumber}
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description && <p className='text-red-600 text-start w-[80%] mt-[-15px] pl-[2px]'>{formik.errors.description}</p>}
          <label htmlFor='fileInput' className='w-[80%] h-[35px] gap-[10px] bg-white flex items-center justify-center text-blue-600 font-bold'>
            <InsertPhotoIcon />
            <h1>Şəkil seç</h1>
            <input
              type='file'
              ref={form}
              id="fileInput"
              multiple
              className='hidden'
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <div className='w-[80%] flex gap-[20px]'>
            {images.map((image, index) => {
              return (
                <div className='photo' key={index}>
                  <img src={image} className='photosrc' alt={`Image-${index}`} />
                  <ClearIcon onClick={() => deleteImage(index)} className='icon' />
                </div>
              );
            })}
          </div>
          <button type='submit' className='w-[80%] bg-blue-600 h-[40px] text-white'>
            {success === true ? 'Paylasilir...' : 'Paylas'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
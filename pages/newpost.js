import React, { useState, useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import ClearIcon from '@mui/icons-material/Clear';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import axios from 'axios';
import { useRouter } from 'next/router';
import * as Yup from 'yup'; 
import { useFormik } from 'formik'; 
import { getUser } from '@/redux/slices/userSlice';
import Subcategory from './components/CarPost';
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
  const [user,setUser]=useState(null)
  useEffect(()=>{
  if(window.localStorage.getItem("login")){
    setUser(localStorage.getItem("login").replace(/^"(.*)"$/, '$1'));
  }else{
    setUser(null)
  }
},[])
  
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Elan adı daxil edin'),
    price: Yup.number().required('Qiymət daxil edin'),
    description: Yup.string().required('Məhsul açığlaması yazın'),
    number:Yup.string().required('Telefon nömrəsi daxil edin'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      description: '',
      model:'',
      city:'',
      color:"",
      isNew:"",
      number:'',
      gearbox:"",
      fuelType:"",
      engine:"",
      year:"",
      marka:"",
      camera:"",
      memory:"",
      walk:"",
      banType:"",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append('title', values.title);
      formdata.append('price', values.price);
      formdata.append('description', values.description);
      formdata.append('userid', user);
formdata.append('category',selectedCategory)
formdata.append("model",values.model)
formdata.append("number",values.number)
formdata.append("city",values.city)
formdata.append("color",values.color)
formdata.append("isNew",values.isNew)
formdata.append("gearbox",values.gearbox)
formdata.append("fuelType",values.fuelType)
formdata.append("engine",values.engine)
formdata.append("year",values.year)
formdata.append("marka",values.marka)
formdata.append("camera",values.camera)
formdata.append("memory",values.memory)
formdata.append("walk",values.walk)
formdata.append("banType",values.banType)
formdata.append("homeType",values.homeType)
      const files = form.current.files;
      for (let i = 0; i < photos.length; i++) {
        formdata.append(`files`, photos[i]);
      }
      if (user!=null) {
        setSuccess(true);
        try {
          const response = await axios.post('https://weblisting.onrender.com/products', formdata);

          if (!response.ok) {
            throw new Error('HTTP Xətası: ' + response.status);
          }
          console.log(response)
          setSuccess(false);
        } catch (error) {
          console.error('Xəta:', error);
        } finally {
          setSuccess(false);
router.push("/")
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
          <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
          <select name='model' value={formik.values.model}
          onChange={formik.handleChange} className='w-full  h-[30px] pl-2 outline-none border-0 text-[#a9a9a9]'>
              <option hidden>Marka</option>
            {options[1].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
          <input type='text' onChange={formik.handleChange} className='w-full outline-none border-0  h-[30px] pl-2' name='marka' value={formik.values.marka} placeholder='Model'></input>
          <input type='number' onChange={formik.handleChange} className='w-full outline-none border-0  h-[30px] pl-2' name='camera' value={formik.values.camera} placeholder='Kamera'></input>
          <input type='number' onChange={formik.handleChange} className='w-full outline-none border-0  h-[30px] pl-2' name='memory' value={formik.values.memory} placeholder='Yaddaş'></input>
          <select name='color'  value={formik.values.color}
            onChange={formik.handleChange} className='w-full outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            <option hidden>Rəng</option>
            {colors.map(color => {
              return <option value={color}>{color}</option>
            })}
          </select>
          <select name='isNew'  value={formik.values.isNew}
            onChange={formik.handleChange} className='w-full outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            <option hidden>Məhsul vəziyyəti</option>
            <option >Yeni</option>
            <option >İkinci əl
            </option>
          </select>
          </div>
        );
      case "Komputer":
        return (
          <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
          <select name='model' value={formik.values.model}
          onChange={formik.handleChange} className='w-full  h-[30px] outline-none border-0 pl-2 text-[#a9a9a9]'>
              <option hidden>Marka</option>
            {options[4].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
          <input type='text' onChange={formik.handleChange} className='w-full outline-none border-0  h-[30px] pl-2' name='marka' value={formik.values.marka} placeholder='Model'></input>
          <select name='color'  value={formik.values.color}
            onChange={formik.handleChange} className='w-full outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            <option hidden>Rəng</option>
            {colors.map(color => {
              return <option value={color}>{color}</option>
            })}
          </select>
          <select name='isNew'  value={formik.values.isNew}
            onChange={formik.handleChange} className='w-full outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            <option hidden>Məhsul vəziyyəti</option>
            <option >Yeni</option>
            <option >İkinci əl
            </option>
          </select>
          </div>
        );
      case "Televizor":
        return (
          <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
            <select name='model' value={formik.values.model}
            onChange={formik.handleChange} className='w-full h-[30px] pl-2 outline-none border-0'>
                <option hidden>Marka</option>
              {options[3].models.map(item => {
                return <option>{item}</option>
              })}
            </select>
            <select name='isNew'  value={formik.values.isNew}
            onChange={formik.handleChange} className='w-full outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            <option hidden>Məhsul vəziyyəti</option>
            <option >Yeni</option>
            <option >İkinci əl
            </option>
          </select>
          </div>
        );
        case "Nəqliyyat":
        return (
          <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
          <select name='model' value={formik.values.model}
          onChange={formik.handleChange} className='w-full h-[30px] pl-2 outline-none border-0'>
             <option hidden>Marka</option>
            {options[2].models.map(item => {
              return <option>{item}</option>
            })}
          </select>
          <input type='text' onChange={formik.handleChange} className='w-full outline-none border-0  h-[30px] pl-2' name='marka' value={formik.values.marka} placeholder='Model'></input>
          <select name='banType' value={formik.values.banType}
          onChange={formik.handleChange} className='w-full h-[30px] pl-2 outline-none border-0'>
             <option hidden>Ban növü</option>
            {options[2].banTypes.map(item => {
              return <option>{item}</option>
            })}
          </select>
          <select name='fuelType' value={formik.values.fuelType}
          onChange={formik.handleChange} className='w-full h-[30px] pl-2 outline-none border-0'>
           <option hidden>Yanacaq növü</option>
          <option>Benzin</option>
          <option>Dizel</option>
          <option>Qaz</option>
          <option>Elektrik</option>
          </select>
          <input type='text' onChange={formik.handleChange} className='w-full outline-none border-0  h-[30px] pl-2' name='engine' value={formik.values.engine} placeholder='Mühərrik sm³'></input>
          <select name='gearbox' value={formik.values.gearbox}
          onChange={formik.handleChange} className='w-full h-[30px] pl-2 outline-none border-0'>
           <option hidden>Sürətlər qutusu</option>
          <option>Mexaniki</option>
          <option>Avtomat</option>
          <option>Variator</option>
          <option>Robotlaşdırılmış</option>
          </select>
         
          <input type='number' onChange={formik.handleChange} className='w-full outline-none border-0  h-[30px] pl-2' name='year' value={formik.values.year} placeholder='Buraxılış ili'></input>
          <input type='number' onChange={formik.handleChange} className='w-full outline-none border-0  h-[30px] pl-2' name='walk' value={formik.values.walk} placeholder='Yürüş km²' ></input>
          <select name='isNew'  value={formik.values.isNew}
            onChange={formik.handleChange} className='w-full outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            <option hidden>Maşının vəziyyəti</option>
            <option >Salon</option>
            <option >Sürülmüş</option>
          </select>
          <select name='color'  value={formik.values.color}
            onChange={formik.handleChange} className='w-full outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            <option hidden>Rəng</option>
            {colors.map(color => {
              return <option value={color}>{color}</option>
            })}
          </select>
        </div>
        );
        case "Aksessuar":
          return(
            <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
            <select name='model' value={formik.values.model}
            onChange={formik.handleChange} className='w-full h-[30px] pl-2 outline-none border-0'>
                <option hidden>Məhsul tipi</option>
              {options[5].models.map(item => {
                return <option>{item}</option>
              })}
            </select>
            <select name='isNew'  value={formik.values.isNew}
            onChange={formik.handleChange} className='w-full outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            <option hidden>Məhsul vəziyyəti</option>
            <option >Yeni</option>
            <option >İkinci əl
            </option>
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
        <div className='flex relative h-[40px] w-full justify-center bg-red-600 text-white font-bold items-center'>
          <ArrowBackIcon onClick={() => router.back()} className='absolute top-2 left-2' fontSize='medium' />
          <h1 className='text-xl'>Yeni elan əlavə et</h1>
        </div>
      </div>
      <div className="w-[80%] max-[600px]:w-[100%]  noscroll h-[100%]   gap-[20px] bg-[#F8F9FD] pt-[40px] grid grid-cols-1 justify-center  place-items-center">
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className="w-[80%] max-[600px]:w-[100%]  noscroll h-[100%]   gap-[20px] bg-[#F8F9FD] pt-[40px] grid grid-cols-1 justify-center  place-items-center">
          <select name='category' value={formik.values.category} onChange={(e) =>setSelectedCategory(e.currentTarget.value)} className='w-[80%] outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
           <option hidden>Kateqoriya seçin</option>
          {options.map(category => {
              return <option value={category.name} className={category.name==="Bütün elanlar" ? "hidden" : null}>{category.name}</option>
            })}
          </select>
          {renderFormBasedOnCategory()}
          <select name='city'  value={formik.values.city}
            onChange={formik.handleChange} className='w-[80%] outline-none border-0 text-[#a9a9a9] h-[30px] pl-2'>
            <option hidden>Şəhər</option>
            {cities.map(city => {
              return <option value={city}>{city}</option>
            })}
          </select>
          <input
            type='text'
            name="title"
            placeholder='Elan başlığı'
            className='w-[80%] outline-none border-0  h-[30px] pl-2'
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && <p className='text-red-600  text-start w-[80%] pl-[2px] mt-[-15px]'>{formik.errors.title}</p>}
          <input
            type='text'
            name="price"
            placeholder='Qiymət'
            className='w-[80%] outline-none border-0  h-[30px] pl-2 mt-[-10px]'
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price && <p className='text-red-600  text-start w-[80%] pl-[2px] mt-[-15px]'>{formik.errors.price}</p>}
          <textarea
            name="description"
            placeholder='Məhsul haqqında '
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
          <button type='submit' className='w-[80%] bg-red-600 h-[40px] text-white'>
            {success === true ? 'Paylaşılır...' : 'Paylaş'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
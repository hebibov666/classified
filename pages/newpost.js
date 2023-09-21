import React, { useState, useRef } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useSelector,useDispatch } from 'react-redux';
import { selectModels } from '@/redux/slices/categorySlices';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
function NewPost() {
  const options=useSelector(state=>state.book.list)
  const models=useSelector(state=>state.book.brands)
  const city=useSelector(state=>state.book.city)
  const brands=models.map(item=>item.models)
  const components=useSelector(state=>state.book.components)
 const form=useSelector(state=>state.book.formId)
    const img = useRef()
    const photo = useRef()
const imgbox=useRef()
const dispatch=useDispatch()
console.log(components);
const selectPhoto = () => {
    const file = photo.current.files;
  
    if (file && file.length > 0) {
      const imagesHtml = Array.from(file).map((image, i) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
  
        return new Promise((resolve) => {
          reader.onload = (e) => {
            resolve(`
              <img src="${e.target.result}" class="photo" alt="${i + 1} onClick=${(e)=>{e.current.style.display="none"}}}">
            `);
          };
        });
      });
  
      Promise.all(imagesHtml).then((imageArray) => {
        imgbox.current.innerHTML += imageArray.join('');
      });
    }
  };
    return (
      <div className='flex newpost flex-col items-center bg-[#F8F9FD]  pb-[60px]'>
        <div className='flex w-full items-center gap-[20px] justify-start'>
       
<div className='flex relative h-[40px] w-full justify-center bg-[transform] items-center'>
<Link href="/">
       <ArrowBackIcon className='absolute top-2 left-2' fontSize='medium'/>
       </Link>
<h1 className='text-xl'>Yeni elan əlavə et</h1>
</div>
        </div>
            <div className="w-[100%] noscroll h-[100%]   gap-[20px] bg-[#F8F9FD] pt-[40px] grid grid-cols-1 justify-center  place-items-center">
                <select onChange={(e)=>{dispatch(selectModels({id:e.currentTarget.value}))}}  className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
                  <option hidden>Kateqoriya secin</option>
                  {options.map(item=>{
                    return <option value={item.key} >{item.name}</option>
                  })}
                </select>
                {form !== null && components[form] && (
  <div className='w-[100%] h-[auto] flex flex-col'>
    {components[form].phone}
  </div>
)}

<select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
                  <option hidden>Yeni?</option>
        <option>Bəli</option>
        <option>Xeyr</option>
       </select>
       <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
                  <option hidden>Çatdrılıma var?</option>
        <option>Bəli</option>
        <option>Xeyr</option>
       </select>
        
                <input required placeholder='Elan başlığı' type='text' className='w-[80%] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'></input>
                <input required placeholder='Qiymət' type='text' className='w-[80%] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'></input>
                <select  className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
{city.map(city=>{
  return <option>{city}</option>
})}
                </select>
                <textarea required placeholder='Məhsul haqqında məlumat' className='min-w-[80%] max-w-[80%] min-h-[150px] max-h-[150px] p-[5px] outline-none shadow-[15px] shadow-[grey]'></textarea>
    
               <label
                    for="customFileInput"
                    class="inline-block w-[80%] gap-[20px] flex items-center justify-center h-[40px] bg-white shadow-sm shadow-[15px] text-white rounded-md cursor-pointer"
                >
                    <AddPhotoAlternateIcon fontSize='large' className='text-blue-700'/>
                    <h1 className='text-blue-600'>Şəkil əlavə et</h1>
                </label>
                <input
                    type="file"
                    class="hidden"
                    id="customFileInput"
                    ref={photo}
                    onChange={selectPhoto}
                    multiple
                />
            
                <div className='w-[80%] h-auto pb-[10px] flex justify-start flex-wrap gap-[15px]' ref={imgbox}>
                   
                </div>
                 
                <button className='outline-none bg-[#FF6617] rounded-[5px] w-[80%] h-[40px] flex items-center justify-center p-[5px] text-white'>
                    Əlavə et
                </button>
            </div>
            </div>
    );
};

export default NewPost;

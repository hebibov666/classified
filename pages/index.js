
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Books from './components/Books'
import LoginBox from './LoginBox'
import { useState,useEffect } from 'react'
import SelectCategory from './components/SelectCategory'
import BottomMenu from './components/BottomMenu'
import AdvancedSearch from './AdvancedSearch'
import BannerSlider from './components/BannnerSlider'
import About from './about'
import Footer from './components/Footer'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const [login,setLogin]=useState(false)
  const [category,setCategory]=useState("Bütün elanlar")

  return (
    <main>
     <Header openLogin={setLogin}/>
    <div className='min-[845px]:hidden'>
    <BannerSlider/>
    </div>
     <div className='flex flex-col min-[900px]:flex-row'>
     <SelectCategory setCategory={setCategory}/>
     <div className='flex w-full  max-[1015px]:flex-col'>
      <Books category={category} />
     </div>
     </div>
     <Footer/>
     <BottomMenu/>
    </main>
  )
}

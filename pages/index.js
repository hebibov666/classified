
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Books from './components/Books'
import LoginBox from './LoginBox'
import { useState } from 'react'
import AdvancedSearch from './components/AdvancedSearch'
import SelectCategory from './components/SelectCategory'
import BottomMenu from './components/BottomMenu'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const [login,setLogin]=useState(false)
  const [category,setCategory]=useState("Bütün elanlar")
  return (
    <main>
     <Header openLogin={setLogin}/>
     <SelectCategory setCategory={setCategory}/>
     <AdvancedSearch/>
     <div className='flex w-full  max-[1015px]:flex-col'>
      <Books category={category}/>
     </div>
     <BottomMenu/>
    </main>
  )
}

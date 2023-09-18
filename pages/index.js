
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Books from './components/Books'
import LoginBox from './components/LoginBox'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const [login,setLogin]=useState(false)
  return (
    <main>
     <Header openLogin={setLogin}/>
     <div className='flex'>
      <Sidebar/>
      <Books/>
     </div>
     {login===true ? <LoginBox closeLogin={setLogin}></LoginBox> : null}
    </main>
  )
}

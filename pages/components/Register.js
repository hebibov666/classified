import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
function Register() {
  const [User, setUser] = useState({});
  const router=useRouter()
  const CreateUser = (e) => {
    const { name, value } = e.target; 
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }))};
  const Usercreate =async () => {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(User),
      });
  
      if (!response.ok) {
        throw new Error('HTTP Xətası: ' + response.status);
      }
  
      const responseData = await response.json();
      localStorage.setItem('user',JSON.stringify(responseData.token))
     } catch (error) {
      console.error('Xəta:', error);
  
  
    }
  };
  
  return (
    <div className='flex flex-col items-center gap-[20px] w-full'>
      <TextField
        id="outlined-password-input"
        label="Ad"
        name='name'
        value={User.value}
        type="text"
        autoComplete="current-password"
        size='small'
        required
        className='w-full'
        onChange={CreateUser}

      />
      <TextField
        id="outlined-password-input"
        label="Email"
        type="text"
        name='email'
        value={User.value}
        autoComplete="current-password"
        size='small'
        required
        className='w-full'
       onChange={CreateUser}
      />
      <TextField
        id="outlined-password-input"
        label="Şifrə"
        type="password"
        name='password'
        value={User.value}
        size='small'
        required
        className='w-full'
        onChange={CreateUser}
      />
      <button onClick={Usercreate} className='outline-none bg-[#FF6617] rounded-[5px] w-full h-[40px] flex items-center justify-center p-[5px] text-white'>
        Tamamla
      </button>
    </div>
  );
}
export default Register
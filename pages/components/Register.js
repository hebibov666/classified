import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
function Register() {
  const [User, setUser] = useState({});
  const [pending,setPending]=useState(false)
  const [error,setError]=useState(null)
  const router=useRouter()
  const CreateUser = (e) => {
    const { name, value } = e.target; 
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }))};
  const Usercreate =async () => {
setPending(true)
setError(null)
    try {
      const response = await fetch('https://project1-3q4c.onrender.com/users', {
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
      setPending(false)
      router.push("/")
     } catch (error) {
      console.error('Xəta:', error);
  setError("Qeydiyyat zamanı xəta baş verdi",error)
  
    }finally{
      setPending(false)
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
      {error!=null ? <p className='text-red-600 text-start w-full pl-[2px]'>{error}</p> : null}
      <button onClick={Usercreate} className='outline-none bg-blue-500 rounded-[5px] w-full h-[40px] flex items-center justify-center p-[5px] text-white'>
       {pending===true?"Qeydiyyat tamamlanır..." : "Tamamla"}
      </button>
    </div>
  );
}
export default Register
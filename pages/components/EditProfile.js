import TextField from '@mui/material/TextField';
function EditProfile(){
    return(
        <div className='flex p-[20px] flex-col items-center gap-[20px] w-full'>
        <TextField
          id="outlined-password-input"
          label="Ad"
          name='name'
          type="text"
          autoComplete="current-password"
          size='small'
          required
          className='w-full'
  
        />
        <TextField
          id="outlined-password-input"
          label="Email"
          type="text"
          name='email'
          autoComplete="current-password"
          size='small'
          required
          className='w-full'
    
        />
        <TextField
          id="outlined-password-input"
          label="Şifrə"
          type="password"
          name='password'
          size='small'
          required
          className='w-full'
         
        />
        <button  className='outline-none bg-red-600 rounded-[5px] w-full h-[40px] flex items-center justify-center p-[5px] text-white'>
          Yadda saxla
        </button>
      </div>
    )
}
export default EditProfile
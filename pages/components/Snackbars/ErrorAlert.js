import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
function ErrorAlert({open,setOpen,message,status}){
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
     setTimeout(()=>{
setOpen(false)
     },3000)
    return(
   <Snackbar open={open} autoHideDuration={3000} >
          <Alert severity={`${status===200 ? "success" : "error"}`} sx={{ width: '100%' }} className='snackbar  items-center  fixed top-0 left-0 z-[2]  min-[490px]:h-[70px]'>
       {message}
          </Alert>
        </Snackbar>
    )
}
export default ErrorAlert
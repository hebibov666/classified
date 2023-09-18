import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from './Login';
import Register from './Register';
import CancelIcon from '@mui/icons-material/Cancel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
function LoginBox({closeLogin}){
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
    <div className="fixed z-[10000] bg-[#00000073] flex justify-center items-center w-[100%] h-[100%] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
<div className="w-[35%] h-[55%] relative bg-[#F8F9FD] pt-[40px] flex flex-col items-center rounded-[10px] shadow-sm shadow-black">
<CancelIcon onClick={()=>{closeLogin(false)}} className='absolute right-2 top-2 ' fontSize='large'/>
<Box  sx={{ width: '100%', typography: 'body1', display:"flex",flexDirection:"column",alignItems:"CENTER" }}>
      <TabContext value={value} className="w-full flex justify-center bg-red-600">
        <Box sx={{ borderBottom: 1,width:"100%",display:"flex",justifyContent:"center", borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Giriş" value="1" />
            <Tab label="Qeydiyyat" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><Login/></TabPanel>
        <TabPanel value="2"><Register/></TabPanel>
      </TabContext>
    </Box>
</div>

    </div>
    )
}
export default LoginBox
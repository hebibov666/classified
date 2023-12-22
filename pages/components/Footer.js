import Link from "next/link"
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
function Footer(){
    return(
<div className="flex flex-col bg-[#8A2BE2] min-[900px]:mt-[40px] w-full h-[230px] pb-[10px] max-[490px]:pb-[300px] pt-[20px] gap-[30px]">
    <div className="p-[5px]">
        <h1 className="text-white text-center max-[500px]:text-[14px]  md:text-[18px] lg:text-[18px]"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</h1>
    </div>
    <div className="flex text-white pl-4 gap-[20px] items-center">
        <a href="https://www.instagram.com/axtar.az_/" target="_blank">
        <InstagramIcon/>
        </a>
        <a href="https://api.whatsapp.com/send?phone=994773184121" target="_blank">
        <WhatsAppIcon/>
        </a>
        <TelegramIcon/>
    </div>
<div className="p-[5px]">
    <h1 className="text-white max-[500px]:text-[12px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry..</h1>
</div>
</div>
    )
}
export default Footer
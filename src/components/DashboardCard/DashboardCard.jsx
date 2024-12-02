import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaClipboardUser } from "react-icons/fa6";
import { MdFolderOpen } from "react-icons/md";

const DashboardCard = ({ channel }) => {
    return (
        <div className="bg-white rounded-sm">
            <div className="h-60 rounded-t-sm bg-cover bg-center"
                style={{ backgroundImage: "url('https://i.ibb.co.com/hgf6crv/education.jpg')" }}>
                <div className="py-4 text-[#FFFFFF] text-2xl flex gap-5 justify-end pr-4">
                    <h1 className=""><FaClipboardUser /></h1>
                    <h1 className=""><MdFolderOpen /></h1>
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="" ><HiOutlineDotsVertical /></div>
                        <ul tabIndex={0} className="dropdown-content menu rounded-sm z-[1] w-20 text-lg bg-slate-300 text-[#000000] p-2 shadow">
                            <li>Edit</li>
                            <hr className="glass" />
                            <li className="my-1">Copy</li>
                            <hr className="glass" />
                            <li>Archive</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 py-3 px-2 items-center">
                <div className="">
                    <img src="https://i.ibb.co.com/VD1BYW6/ali-morshedlou-WMD64t-Mfc4k-unsplash.jpg" alt="" className="h-20 w-20 rounded-full" />
                </div>
                <div className="">
                    <h1 className="text-2xl font-semibold text-[#000000]">{channel?.channelInfo?.name}</h1>
                    <h1 className="text-[#201f1fc1]">{channel?.channelInfo?.courseID}</h1>
                    <h1 className="text-[#201f1fc1]">
                        {
                            channel?.teachers.map((teacher, index) => (<p key={index}>{teacher?.name}</p>))
                        }
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
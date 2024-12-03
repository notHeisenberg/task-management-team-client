import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaClipboardUser } from "react-icons/fa6";
import { MdFolderOpen } from "react-icons/md";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const DashboardCard = ({ channel, onEdit, onCopy, onArchive }) => {
    return (
        <div className="bg-white rounded-sm relative">
            {/* Absolute Icons */}
            <div className="absolute top-4 right-4 flex gap-3 text-white text-2xl">
                <button onClick={onEdit} className="focus:outline-none">
                    <FaClipboardUser />
                </button>
                <button onClick={onCopy} className="focus:outline-none">
                    <MdFolderOpen />
                </button>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="focus:outline-none">
                        <HiOutlineDotsVertical />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-sm z-[1] w-20 text-lg bg-slate-300 text-[#000000] p-2 shadow"
                    >
                        <li onClick={onEdit}>Edit</li>
                        <hr className="glass" />
                        <li onClick={onCopy} className="my-1">
                            Copy
                        </li>
                        <hr className="glass" />
                        <li onClick={onArchive}>Archive</li>
                    </ul>
                </div>
            </div>

            {/* Card Content with NavLink */}
            <div className="h-60 rounded-t-sm bg-cover bg-center">
                <NavLink to={`/dashboard/ch/${channel?.channelInfo?.channelCode}`}>
                    <div
                        style={{
                            backgroundImage: "url('https://i.ibb.co.com/hgf6crv/education.jpg')",
                        }}
                        className="h-60 rounded-t-sm bg-cover bg-center"
                    ></div>
                </NavLink>
            </div>
            <NavLink to={`/dashboard/ch/${channel?.channelInfo?.channelCode}`}>
                <div className="flex gap-2 py-3 px-2 items-center">
                    <div>
                        {channel?.teachers?.map((teacher, index) => (
                            <img
                                key={index}
                                src={teacher?.image}
                                alt=""
                                className="h-20 w-20 rounded-full"
                            />
                        )) || (
                                <img
                                    src="https://i.ibb.co.com/VD1BYW6/ali-morshedlou-WMD64t-Mfc4k-unsplash.jpg"
                                    alt=""
                                    className="h-20 w-20 rounded-full"
                                />
                            )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-[#000000]">
                            {channel?.channelInfo?.name}
                        </h1>
                        <h1 className="text-[#201f1fc1]">{channel?.channelInfo?.courseID}</h1>
                        <h1 className="text-[#201f1fc1]">
                            {channel?.teachers?.map((teacher, index) => (
                                <p key={index}>{teacher?.name}</p>
                            ))}
                        </h1>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};

DashboardCard.propTypes = {
    channel: PropTypes.shape({
        channelInfo: PropTypes.shape({
            name: PropTypes.string,
            courseID: PropTypes.string,
            channelCode: PropTypes.string,
        }),
        teachers: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                image: PropTypes.string,
            })
        ),
    }),
    onEdit: PropTypes.func,
    onCopy: PropTypes.func,
    onArchive: PropTypes.func,
};

export default DashboardCard;
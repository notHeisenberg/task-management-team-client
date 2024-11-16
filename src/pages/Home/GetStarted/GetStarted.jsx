import { NavLink } from "react-router-dom";

const GetStarted = () => {
    return (
        <div className="container mx-auto  lg:py-10 lg:p-0 p-10 ">
            <div className="relative p-[2px] bg-[#1d1e1f] rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-500">
                <div className="bg-[#1d1e1f] p-6 rounded-xl shadow-lg">
                    <div className="flex items-center mx-24 justify-around flex-col md:flex-row gap-2">
                        {/* Text and Button Section */}
                        <div className="flex flex-col items-start md:items-start text-start md:text-left space-y-4 w-fit">
                            <h2 className="text-3xl font-bold text-white">
                                See for yourself why successful teams use <br /> <span className="text-pink-500">Airtable</span>
                            </h2>
                            <NavLink to={'/auth'} className="elementor-button bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-md shadow-lg hover:from-purple-500 hover:to-blue-500 transition duration-300">
                                Get Started
                            </NavLink>
                        </div>

                        {/* Image Section */}
                        <div className="mt-6 md:mt-0">
                            <img
                                src="https://hive.com/wp-content/uploads/2024/04/Group-7061.svg"
                                alt="Hive Logo"
                                className="w-20 h-20 sm:w-32 sm:h-32"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;

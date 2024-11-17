
import { Input } from "@/components/ui/input";
import { DropdownMenuDemo } from "@/components/DropdownDemo/DropdownMenuDemo";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const { user } = useAuth()
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosCommon.get(`/user/${user.email}`)
        .then((res) => {
          if (res.data) {
            // console.log("User data:", res.data);
            setRole(res.data.role == "general-user" ? "User" : "Admin");
          } else {
            console.log("No user found");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [user?.email]);
  

  return (
    <div className="w-full border-b shadow-md p-4 flex items-center justify-between">{ }
      <NavLink to={'/'} className={'text-xl font-semibold'}>ArtTable</NavLink>

      {/* Search Bar */}
      <div className="w-64 mx-4 relative">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md pl-10"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* User Avatar Dropdown */}
      <div
        className="flex gap-2"
        tabIndex="0"
      >
        <DropdownMenuDemo />
        <div className="hidden md:flex flex-col flex-wrap justify-center">
          <h1 className="text-sm font-semibold">{user?.displayName}</h1>
          <p className="text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}

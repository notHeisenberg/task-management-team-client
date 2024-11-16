import { DropdownMenuDemo } from "@/components/DropdownDemo/DropdownMenuDemo";
import Button from "@/components/shared/Button";
import Container from "@/components/shared/Container";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [getMenu, setMenu] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();

  const changeBackground = () => {
    if (window.scrollY >= 32) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const navLinks = [
    { title: "Products", path: "/products" },
    { title: "User Cases", path: "/user-cases" },
    { title: "Learn", path: "/learn" },
    { title: "Pricing", path: "/pricing" },
    { title: "Enterprise", path: "/enterprise" },
    { title: "Request Demo", path: "/request-demo" },
  ];

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <nav className={navbar ? "bg-primary fixed w-full z-30" : "bg-primary shadow fixed w-full"}>
        <Container>
          <div className="">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center text-white py-6">
              <div onClick={handleClick} className="w-[12%] text-3xl font-bold cursor-pointer">
                Airtable
              </div>
              <div className="w-[54%] flex gap-6">
                {navLinks.map((item, idx) => (
                  <a href={item.path} key={idx} className="text-lg font-semibold">
                    {item.title}
                  </a>
                ))}
              </div>
              <div className="w-[32%] flex justify-end items-center gap-6">

                {user ?
                  <DropdownMenuDemo />
                  :
                  <>
                    <p className="font-semibold">Contact Sales</p>
                    {/* Login Button */}
                    <Link
                      to={"/auth"}
                      className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                    >
                      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                      <span className="relative px-6 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                        <span className="relative text-white">Login</span>
                      </span>
                    </Link>
                    {/* Get Started Button */}
                    <Link to={"/auth"}>
                      <Button text={"Get Started"} />
                    </Link>
                  </>

                }
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden text-white py-6">
              <div className="flex justify-between items-center">
                <div onClick={handleClick} className="w-[16%] text-3xl font-bold cursor-pointer">
                  Airtable
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    {/* Get Started Button */}
                    <Link to={"auth"}>
                      <Button text={"Get Started"} />
                    </Link>
                  </div>
                  {/* Animated Hamburger/Cross Icon */}
                  <div
                    className={`text-white cursor-pointer transition-transform duration-300 ease-in-out ${getMenu ? "rotate-90" : "rotate-0"
                      }`}
                    onClick={() => setMenu(!getMenu)}
                  >
                    {getMenu ? (
                      <RxCross2 className="text-4xl transform transition-transform duration-300" />
                    ) : (
                      <GiHamburgerMenu className="text-4xl transform transition-transform duration-300" />
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Menu */}
              <div
                className={`fixed top-[92px] right-0 h-full w-2/3 bg-primary text-white transform ${getMenu ? "translate-x-0" : "translate-x-full"
                  } transition-transform duration-300 ease-in-out lg:hidden z-[50]`}
              >
                <div className="flex flex-col items-start p-6">
                  {navLinks.map((item, idx) => (
                    <a
                      href={item.path}
                      key={idx}
                      className="text-lg font-semibold py-2 border-b border-gray-600 w-full"
                      onClick={() => setMenu(false)}
                    >
                      {item.title}
                    </a>
                  ))}
                  <div className="w-full mx-auto my-4">
                    <Link
                      to={"/auth"}
                      className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                    >
                      <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                      <span className="relative px-6 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                        <span className="relative text-white">Login</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default NavBar;

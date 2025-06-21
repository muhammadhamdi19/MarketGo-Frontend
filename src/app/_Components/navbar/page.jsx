'use client'
import Image from "next/image";
import logo from "../../../Images/Website Logo.png";
import Link from "next/link";
import { useContext } from "react";
import { authContext } from "../../_Context/authcontext/page";
import { usePathname, useRouter } from "next/navigation";


function Navbar() {
  const nav = useRouter()
  const { token , setToken } = useContext(authContext);

  function Logout(){
    setToken(null)
    localStorage.removeItem("tkn")
    nav.replace("/login")
  }

  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "SEO Analyzer", path: "/analyzer" },
    { name: "Feed Campaign", path: "/feed" },
    { name: "About Us", path: "/about" }, // Change '#' to actual path if needed
  ];
  
  return (
    <>
      <nav className="bg-[#d2d2d2]  fixed w-full z-20 top-0 start-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3 ">
          <Link
            href={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={logo} className="w-10" alt="MarketGo Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-white">
              MarketGo
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {token ? <button
              onClick={Logout}
              type="button"
              className="text-white bg-[#BE975B] hover:bg-[#a68654] focus:ring-4 focus:outline-none focus:ring-[#BE975B] transition-all duration-1000 font-medium rounded-lg text-sm px-7 py-3 text-center "
            >
              Logout
            </button> : <Link
              href={"/login"}
              type="button"
              className="text-white bg-[#BE975B] hover:bg-[#a68654] focus:ring-4 focus:outline-none focus:ring-[#BE975B] transition-all duration-1000 font-medium rounded-lg text-sm px-7 py-3 text-center "
            >
              Login
            </Link> }
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-semibold border  rounded-lg bg-[#d2d2d2] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
              
            {navItems.map((item) => (
        <li key={item.path}>
          <Link
            href={item.path}
            className={`block py-2 px-3 text-base rounded md:p-0 md:px-2 transition-all duration-100 
              ${
                pathname === item.path
                  ? "text-[#BE975B] border-b-2 border-[#BE975B] font-bold"
                  : "text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:border-b-2 md:hover:border-[#BE975B]"
              }`}
          >
            {item.name}
          </Link>
        </li>
      ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

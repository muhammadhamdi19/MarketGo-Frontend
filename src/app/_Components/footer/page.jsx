import Image from "next/image"
import logo from '../../../Images/Website Logo.png'
import Link from "next/link"

function Footer() {
  return (
    

<footer className=" shadow bg-gradient-to-tl from-[rgba(190,151,91,.9)] to-[rgba(0,0,0)] py-8">
  <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <Link href={"/"} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
        <Image src={logo} className="w-12" alt="MarketGo Logo" />
        <span className="self-center text-white opacity-80 text-2xl font-semibold whitespace-nowrap">MarketGo</span>
      </Link>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 ">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
          <a href="#" className="hover:underline">Contact</a>
        </li>
      </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-gray-300 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">MarketGo</a>. All Rights Reserved.</span>
  </div>
</footer>



  )
}

export default Footer
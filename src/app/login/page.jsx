"use client";
import Image from "next/image";
import signin from "../../Images/Computer login-bro.svg";
import logo from "../../Images/Website Logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { TailSpin } from "react-loader-spinner";
import { authContext } from "../_Context/authcontext/page";

function Login() {
  const navigate = useRouter()
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(authContext);

  const user = {
    email: "",
    password: ""
};

const validation = Yup.object({
  
  email: Yup.string().required('Email or Username is required').min(4,"should be at least 4 character"),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required').matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must have latters and numbers"
    ),
});

async function userLogin(value) {
  setLoading(true);
  
  
  try {
    const res = await axios.post(
      "http://localhost:8000/api/user/token/",
      value
    );
    console.log(res);
    setLoading(false);
    setToken(res.data.token);
    localStorage.setItem("tkn", res.data.token);
    toast.success('Welcome Back ',{
      duration: 4000,
      icon: '🌍',
    });
    console.log(res);
    
    navigate.replace("/analyzer")
  } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error(error.response.data.non_field_errors ,{
      duration: 4000,
      icon: '🫣',
    });
    
  }
}

const formik = useFormik({
  initialValues: user,
  onSubmit: userLogin,
  validationSchema:validation,
});
  return (
    <>
      <section>
        <div className="flex ">
          <div className="bg-white md:w-1/2 w-full h-screen flex flex-col justify-center items-center ">
            <Image
            priority
              src={logo}
              className="w-14 h-14 self-center mb-7 md:hidden"
              alt="Market Go Logo"
            />
            <h3 className="font-bold text-center text-5xl mb-20  text-[#866f4e]">
              Login
            </h3>

            <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto lg:w-[90%] md:w-[80%] w-[80%]">
              {/* Email */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                  type="text"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#BE975B] focus:outline-none focus:ring-0 focus:border-[#BE975B] peer"
                  placeholder=" "
                  required
                />
                {formik.errors.email && formik.touched.email ? <>
                  <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
                <p id="email" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-semibold">Oh, Email!</span> {formik.errors.email}</p>
                </>:<label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#BE975B] peer-focus:dark:text-[#BE975B] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>}
              </div>

              {/* Password */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#BE975B] focus:outline-none focus:ring-0 focus:border-[#BE975B] peer"
                  placeholder=" "
                  required
                />
                {formik.errors.password && formik.touched.password ? <>
                  <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                <p id="password" className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-semibold">Oh, Error!</span> {formik.errors.password}</p>
                </>:<label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#BE975B] peer-focus:dark:text-[#BE975B] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>}
              </div>

              <div className="flex justify-between">
                <Link href={"/register"} className="text-sm underline cursor-pointer hover:text-[#BE975B] transition-all duration-300">Creat an account</Link>
                {/* <Link href={""} className="text-sm underline cursor-pointer hover:text-[#BE975B] transition-all duration-300"> forget passowrd?</Link> */}
              </div>

              <button
                type="submit"
                className="text-white bg-[#866f4e] hover:bg-[#BE975B] mt-4 transition-all duration-500  focus:outline-none  font-medium rounded-lg text-sm w-full    px-5 py-2.5 text-center"
              >
                {loading == true ? (
                    <div className="flex justify-center">
                      <TailSpin
                        visible={true}
                        height="30"
                        width="30"
                        color="#fff"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    "Login"
                  )}
              </button>
            </form>
          </div>

          <div className="bg-[#866f4e] hidden w-1/2 h-screen md:flex flex-col justify-center items-center ">
            <Image
            priority
              src={logo}
              className="w-14 h-14 self-center my-9"
              alt="Market Go Logo"
            />
            <h3 className="font-semibold text-center lg:text-2xl  md:text-sm mb-12  text-white">
              Enter a world of opportunities with Market Go!
            </h3>
            <Image
            priority
              src={signin}
              className="lg:w-64 md:w-52 "
              alt="Sign Up Photo"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;

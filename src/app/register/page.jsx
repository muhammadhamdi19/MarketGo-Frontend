"use client";
import Image from "next/image";
import signup from "../../Images/Sign up-amico.png";
import logo from "../../Images/Website Logo.png";
import Link from "next/link";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function Register() {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  const user = {
    email: "",
    confirmPassword: "",
    name: "",
    password: "",
  };

  const validation = Yup.object({
    name: Yup.string()
      .required("First Name is required")
      .min(4, "Name should be at least 4 character")
      .max(15, "Maximum character for name is 15"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must have latters and numbers"
      ),

      confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  async function registerUser(value) {
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/create/",
        value
      );
      console.log(res);
      setLoading(false);

      toast.success("Account Created Successfully", {
        duration: 4000,
        icon: "📌",
      });

      navigate.replace("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.username, {
        duration: 4000,
        icon: "🫣",
      });
    }
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validationSchema: validation,
  });

  return (
    <>
      <section>
        <div className="flex ">
          <div className="bg-white md:w-1/2 w-full h-screen flex flex-col justify-center items-center mt-6">
            <Image
              priority
              src={logo}
              className="w-14 h-14 self-center mb-7 md:hidden"
              alt="Market Go Logo"
            />
            <h3 className="font-bold text-center text-5xl mb-20  text-[#866f4e]">
              Register
            </h3>

            <form
              onSubmit={formik.handleSubmit}
              className="max-w-md mx-auto lg:w-[90%] md:w-[80%] w-[80%]"
            >
              {/* Name */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#BE975B] focus:outline-none focus:ring-0 focus:border-[#BE975B] peer"
                  placeholder=" "
                  required
                />
                {formik.errors.name && formik.touched.name ? (
                  <>
                    <label
                      htmlFor="name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Name
                    </label>
                    <p
                      id="filled_error_help"
                      className="mt-2 text-xs text-red-600 dark:text-red-400"
                    >
                      <span class="font-semibold">Oh, Error!</span>{" "}
                      {formik.errors.name}
                    </p>
                  </>
                ) : (
                  <label
                    htmlFor="name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#BE975B] peer-focus:dark:text-[#BE975B] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                )}
              </div>

              {/* Email */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#BE975B] focus:outline-none focus:ring-0 focus:border-[#BE975B] peer"
                  placeholder=" "
                  required
                />
                {formik.errors.email && formik.touched.email ? (
                  <>
                    <label
                      htmlFor="email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address
                    </label>
                    <p
                      id="email"
                      class="mt-2 text-xs text-red-600 dark:text-red-400"
                    >
                      <span className="font-semibold">Oh, Email!</span>{" "}
                      {formik.errors.email}
                    </p>
                  </>
                ) : (
                  <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#BE975B] peer-focus:dark:text-[#BE975B] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                )}
              </div>

              {/* Password */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  value={formik.values.password}
                  autoComplete="on"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#BE975B] focus:outline-none focus:ring-0 focus:border-[#BE975B] peer"
                  placeholder=" "
                  required
                />
                {formik.errors.password && formik.touched.password ? (
                  <>
                    <label
                      htmlFor="password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>
                    <p
                      id="filled_error_help"
                      class="mt-2 text-xs text-red-600 dark:text-red-400"
                    >
                      <span className="font-semibold">Oh, Error!</span>{" "}
                      {formik.errors.password}
                    </p>
                  </>
                ) : (
                  <label
                    htmlFor="password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#BE975B] peer-focus:dark:text-[#BE975B] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  value={formik.values.confirmPassword}
                  autoComplete="on"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#BE975B] focus:outline-none focus:ring-0 focus:border-[#BE975B] peer"
                  placeholder=" "
                  required
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? <>
                  <label
                  htmlFor="confirmPassword"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-600 peer-focus:dark:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm password
                </label>
                <p id="filled_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-semibold">Oh, Error!</span> {formik.errors.confirmPassword}</p>
                </>:<label
                  htmlFor="confirmPassword"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#BE975B] peer-focus:dark:text-[#BE975B] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm password
                </label>}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="text-white self-center bg-[#866f4e] hover:bg-[#BE975B]  transition-all duration-500 focus:ring-4 focus:outline-none focus:ring-[#BE975B] font-medium rounded-lg text-sm lg:w-1/2 w-auto px-5 py-2.5 text-center"
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
                    "Register"
                  )}
                </button>
                <Link
                  href={"/login"}
                  className="text-sm underline self-center cursor-pointer hover:text-[#BE975B] transition-all duration-300"
                >
                  I already have an account
                </Link>
              </div>
            </form>
          </div>

          <div className="bg-[#866f4e] hidden w-1/2 h-screen md:flex flex-col justify-center items-center mt-6">
            <Image
              priority
              src={logo}
              className="w-14 h-14 self-center my-9"
              alt="Market Go Logo"
            />
            <h3 className="font-semibold text-center lg:text-2xl md:text-lg mb-12  text-white">
              Accelerate Your Growth with Market Go
            </h3>
            <Image
              priority
              src={signup}
              className="lg:w-64 md:w-52 "
              alt="Sign Up Photo"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;

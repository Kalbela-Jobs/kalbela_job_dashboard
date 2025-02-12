import { Link, useLocation, useNavigate } from "react-router-dom";

import animation from "../../../assets/animation/log_in.json";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import { message } from "antd";
import sweet_alert from "../../../utils/custom_alert";
import Lottie from "lottie-react";
import { getRedirectResult } from "firebase/auth";

export default function Registration() {
      const location = useLocation();
      const navigate = useNavigate();
      const [isPasswordVisible, setPasswordVisible] = useState(false);

      const { handleRedirectResult, googleLogin, setUser, setCookie, base_url, } = useContext(Kalbela_AuthProvider);


      const data_submit = (e) => {
            e.preventDefault();
            const from_data = e.target
            const name = from_data.full_name.value
            const email = from_data.email.value
            const password = from_data.password.value
            // console.log(name, email, password);
            const data = {
                  name,
                  email,
                  password
            }
            console.log(`${base_url}/auth/sign-up`);
            fetch(`${base_url}/auth/sign-up`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
            }).then((res) => res.json())
                  .then((data) => {
                        console.log(data, 'data');
                        if (!data.error) {
                              setUser(data.data);
                              setCookie("kal_bela_jobs_user", data.data, 365);
                              sweet_alert("Success", data.message, "success");
                              navigate("/verify_otp", { replace: true });
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  })
      };


      const handlerGoogleLogin = async () => {
            await googleLogin();
      }


      const checkRedirect = () => {
            handleRedirectResult(); // Check for redirect result after login
      };
      useEffect(() => {
            checkRedirect();
      }, []);




      return (

            <section className="py-12 bg-gray-900 sm:py-16 lg:py-20">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="grid grid-cols-1 items-center gap-y-12 lg:gap-x-20 lg:grid-cols-2 2xl:gap-x-20">

                              <div className="overflow-hidden hidden lg:block text-center bg-gray-800 rounded-2xl">
                                    <div className="flex items-center justify-center px-8 py-12 sm:px-12 sm:py-16 md:py-24 md:px-20">
                                          <div>
                                                <Lottie loop={false} animationData={animation} />
                                          </div>
                                    </div>
                              </div>

                              <div>
                                    <div className="2xl:max-w-lg">
                                          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                                                Sign up to Celebration
                                          </h2>
                                          <p className="mt-2 text-base text-gray-600">
                                                <p className="text-sm font-medium text-gray-100">
                                                      Already have an account?
                                                      <Link
                                                            to="/sign-in"
                                                            title=""
                                                            className="font-bold text-indigo-600 hover:underline"
                                                      >
                                                            {" "}   Sign in now
                                                      </Link>
                                                </p>
                                          </p>
                                          <form onSubmit={data_submit} className="mt-8">
                                                <div className="space-y-5">
                                                      <div>
                                                            <label
                                                                  htmlFor=""
                                                                  className="text-base font-medium text-gray-100"
                                                            >
                                                                  Company Name
                                                            </label>
                                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                                        <svg
                                                                              className="w-5 h-5"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                              />
                                                                        </svg>
                                                                  </div>
                                                                  <input
                                                                        type="text"
                                                                        name="full_name"
                                                                        id=""
                                                                        placeholder="Enter your company name"
                                                                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div>
                                                            <label
                                                                  htmlFor=""
                                                                  className="text-base font-medium text-gray-100"
                                                            >
                                                                  {" "}
                                                                  Email address{" "}
                                                            </label>
                                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                                        <svg
                                                                              className="w-5 h-5"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                                              />
                                                                        </svg>
                                                                  </div>
                                                                  <input
                                                                        type="email"
                                                                        name="email"
                                                                        id="email"
                                                                        placeholder="Enter email to get started"
                                                                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div>
                                                            <label
                                                                  htmlFor=""
                                                                  className="text-base font-medium text-gray-100"
                                                            >
                                                                  {" "}
                                                                  Password{" "}
                                                            </label>
                                                            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                                        <svg
                                                                              className="w-5 h-5"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                                              />
                                                                        </svg>
                                                                  </div>
                                                                  <input
                                                                        type={isPasswordVisible ? "text" : "password"}
                                                                        name="password"
                                                                        id="password"
                                                                        placeholder="Enter your password"
                                                                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                                                  />
                                                                  <button
                                                                        type="button"
                                                                        onClick={() => setPasswordVisible(!isPasswordVisible)}
                                                                        className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                                                                  >
                                                                        {isPasswordVisible ? (
                                                                              <EyeOff className="w-5 h-5" />
                                                                        ) : (
                                                                              <Eye className="w-5 h-5" />
                                                                        )}
                                                                  </button>
                                                            </div>
                                                      </div>
                                                      <div>
                                                            <button
                                                                  type="submit"
                                                                  className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                                                            >
                                                                  Sign up
                                                            </button>
                                                      </div>
                                                </div>
                                          </form>
                                          <div className="relative mt-6">
                                                <div className="absolute inset-0 flex items-center">
                                                      <div className="w-full border-t border-gray-200" />
                                                </div>
                                                <div className="relative flex justify-center">
                                                      <span className="px-2 text-sm text-gray-400 bg-gray-900"> or </span>
                                                </div>
                                          </div>
                                          <div className="mt-6">
                                                <button
                                                      onClick={handlerGoogleLogin}
                                                      type="button"
                                                      className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                >
                                                      <img
                                                            className="w-5 h-5 mr-2"
                                                            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/sign-in/1/google-logo.svg"
                                                            alt=""
                                                      />
                                                      Sign up with Google
                                                </button>
                                          </div>

                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
}

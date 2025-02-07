
import animation from "../../../../public/images/undraw_mobile_login_ikmv.png";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Kalbela_AuthProvider } from "../../../context/MainContext";
import sweet_alert from "../../../utils/custom_alert";

const Login = () => {
      const { googleLogin, base_url, setCookie, setUser, setWorkspace } = useContext(Kalbela_AuthProvider);
      const [isPasswordVisible, setPasswordVisible] = useState(false);

      const navigate = useNavigate();

      const login_handler = async (e) => {
            e.preventDefault();
            const from_data = e.target
            const email = from_data.email.value
            const password = from_data.password.value
            console.log(name, email, password);
            const data = {
                  email,
                  password
            }

            fetch(`${base_url}/auth/sign-in`, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
            }).then((res) => res.json())
                  .then((data) => {
                        console.log(data, 'data');
                        if (!data.error) {
                              setUser(data.data.user);
                              if (data.data.user.role === 'workspace_admin' && !data.data.workspace?._id) {
                                    navigate('/create-workspace', { replace: true });
                              }
                              else {
                                    navigate("/admin", { replace: true });
                              }
                              setWorkspace(data.data.workspace);
                              setCookie("kal_bela_jobs_user", data.data.user, 365);
                              setCookie('kal_bela_jobs_workspace', data.data.workspace, 365);
                              sweet_alert("Success", data.message, "success");
                        }
                        else {
                              sweet_alert("Error", data.message, "error");
                        }
                  });



      }




      return (
            // <section className="bg-gray-900 custom-screen ">
            //       <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            //             <div className="lg:relative hidden lg:flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24  sm:px-6 lg:px-8">
            //                   <div className="absolute inset-0">

            //                         <Lottie className="object-cover w-full h-full" animationData={animation} />
            //                   </div>
            //                   <div className="absolute inset-0 " />
            //                   <div className="relative">
            //                         <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
            //                               <h3 className="text-4xl font-bold text-white">
            //                                     Join 35k+ job seekers & recruiters
            //                                     find your perfect match today!
            //                               </h3>
            //                               <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
            //                                     <li className="flex items-center space-x-3">
            //                                           <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
            //                                                 <svg
            //                                                       className="w-3.5 h-3.5 text-white"
            //                                                       xmlns="http://www.w3.org/2000/svg"
            //                                                       viewBox="0 0 20 20"
            //                                                       fill="currentColor"
            //                                                 >
            //                                                       <path
            //                                                             fillRule="evenodd"
            //                                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            //                                                             clipRule="evenodd"
            //                                                       />
            //                                                 </svg>
            //                                           </div>
            //                                           <span className="text-lg font-medium text-white">
            //                                                 AI Job Matching
            //                                           </span>
            //                                     </li>
            //                                     <li className="flex items-center space-x-3">
            //                                           <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
            //                                                 <svg
            //                                                       className="w-3.5 h-3.5 text-white"
            //                                                       xmlns="http://www.w3.org/2000/svg"
            //                                                       viewBox="0 0 20 20"
            //                                                       fill="currentColor"
            //                                                 >
            //                                                       <path
            //                                                             fillRule="evenodd"
            //                                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            //                                                             clipRule="evenodd"
            //                                                       />
            //                                                 </svg>
            //                                           </div>
            //                                           <span className="text-lg font-medium text-white">
            //                                                 Resume Builder
            //                                           </span>
            //                                     </li>
            //                                     <li className="flex items-center space-x-3">
            //                                           <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
            //                                                 <svg
            //                                                       className="w-3.5 h-3.5 text-white"
            //                                                       xmlns="http://www.w3.org/2000/svg"
            //                                                       viewBox="0 0 20 20"
            //                                                       fill="currentColor"
            //                                                 >
            //                                                       <path
            //                                                             fillRule="evenodd"
            //                                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            //                                                             clipRule="evenodd"
            //                                                       />
            //                                                 </svg>
            //                                           </div>
            //                                           <span className="text-lg font-medium text-white">
            //                                                 Job Alerts
            //                                           </span>
            //                                     </li>
            //                                     <li className="flex items-center space-x-3">
            //                                           <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
            //                                                 <svg
            //                                                       className="w-3.5 h-3.5 text-white"
            //                                                       xmlns="http://www.w3.org/2000/svg"
            //                                                       viewBox="0 0 20 20"
            //                                                       fill="currentColor"
            //                                                 >
            //                                                       <path
            //                                                             fillRule="evenodd"
            //                                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            //                                                             clipRule="evenodd"
            //                                                       />
            //                                                 </svg>
            //                                           </div>
            //                                           <span className="text-lg font-medium text-white">
            //                                                 Advanced Filters
            //                                           </span>
            //                                     </li>
            //                               </ul>
            //                         </div>
            //                   </div>
            //             </div>
            //             <div className="flex items-center justify-center px-4 py-10 bg-gray-900 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            //                   <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">


            //                         <div className="mt-3 space-y-3">
            //                               <button
            //                                     onClick={() => handlerGoogleLogin()}
            //                                     type="button"
            //                                     className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
            //                               >
            //                                     <div className="absolute inset-y-0 left-0 p-4">
            //                                           <img className="w-6 h-6 text-[#2563EB]" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />
            //                                     </div>
            //                                     Sign up with Google
            //                               </button>
            //                               {/* <button
            //                                     type="button"
            //                                     className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
            //                               >
            //                                     <div className="absolute inset-y-0 left-0 p-4">
            //                                           <img className="w-6 h-6 text-[#2563EB]" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="" />
            //                                     </div>
            //                                     Sign up with Linkedin
            //                               </button> */}
            //                         </div>

            //                   </div>
            //             </div>
            //       </div>
            // </section>

            <section className="py-12 bg-gray-900 sm:py-16 lg:py-20">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="grid grid-cols-1 items-center gap-y-12 lg:gap-x-20 lg:grid-cols-2 2xl:gap-x-20">

                              <div className="overflow-hidden hidden lg:block text-center bg-gray-800 rounded-2xl">
                                    <div className="flex items-center justify-center px-8 py-12 sm:px-12 sm:py-16 md:py-24 md:px-20">
                                          <div>
                                                <img
                                                      className="w-auto mx-auto"
                                                      src={animation}
                                                      alt=""
                                                />
                                                {/* <p className="mt-4 text-2xl font-bold text-gray-900">
                                                      92+ Ready Coded Blocks
                                                </p>
                                                <p className="mt-4 text-sm font-medium text-gray-500">
                                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis
                                                      morbi pulvinar venenatis non.
                                                </p>
                                                <div className="flex items-center justify-center mt-16 space-x-1.5">
                                                      <div className="w-2.5 h-2.5 bg-gray-600 rounded-full" />
                                                      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                                                      <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                                                </div> */}
                                          </div>
                                    </div>
                              </div>

                              <div>
                                    <div className="2xl:max-w-lg">
                                          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                                                Sign in to Celebration
                                          </h2>
                                          <p className="mt-2 text-base text-gray-600">
                                                <p className="text-sm font-medium text-gray-100">
                                                      Don't have an account?{" "}
                                                      <Link
                                                            to="/sign-up"
                                                            title=""
                                                            className="font-bold text-indigo-600 hover:underline"
                                                      >
                                                            Sign up now
                                                      </Link>
                                                </p>
                                          </p>
                                          <form onSubmit={login_handler} className="mt-8">
                                                <div className="space-y-5">

                                                      <div>
                                                            <label htmlFor="" className="text-base font-medium text-gray-100">
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
                                                            <label htmlFor="" className="text-base font-medium text-gray-100">
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
                                                      <p className="text-sm text-red-200"> Forgot password? </p>
                                                      <div>
                                                            <button
                                                                  type="submit"
                                                                  className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                                                            >
                                                                  Sign In
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
                                                      onClick={googleLogin}
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
};

export default Login;



import NavLink from "../NavLink"
import MacbookAir from './Macbook-Air-localhost.png';
import Macbook_video from './hero.webm';
import LayoutEffect from "../../LayoutEffect"
import GradientWrapper from "../../GradientWrapper"
import { useRef, useState } from "react";



const Hero = () => {

      const [isPlaying, setIsPlaying] = useState(false);
      const videoRef = useRef(null);

      const handlePlayVideo = () => {
            setIsPlaying(true);
            setTimeout(() => {
                  if (videoRef.current) {
                        videoRef.current.play();
                  }
            }, 100); // Small delay to ensure smooth transition
      };
      return (

            <section>
                  <div className="custom-screen py-28">
                        <LayoutEffect className="duration-1000 delay-300"
                              isInviewState={{
                                    trueState: "opacity-1",
                                    falseState: "opacity-0"
                              }}
                        >
                              <div>
                                    <div className="space-y-5 max-w-3xl mx-auto text-center">
                                          <h1
                                                className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl"
                                                style={{
                                                      backgroundImage: "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)"
                                                }}
                                          >
                                                Connect with Top Talent for Your Business Success
                                          </h1>
                                          <p className="max-w-xl mx-auto text-gray-300">
                                                Unlock new career opportunities with expert guidance and the right connections.
                                          </p>
                                          <div className="flex justify-center font-medium text-sm">
                                                <NavLink
                                                      to="/admin"
                                                      className="flex items-center text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700 "
                                                >
                                                      Get Started
                                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                                      </svg>
                                                </NavLink>
                                          </div>
                                    </div>
                                    <GradientWrapper className="mt-16 sm:mt-28" wrapperClassName="max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]">
                                          {isPlaying ? (
                                                <video
                                                      // ref={videoRef}
                                                      src={Macbook_video}
                                                      autoPlay
                                                      loop
                                                      muted
                                                      className="shadow-lg relative rounded-2xl w-full h-full"
                                                />
                                          ) : (
                                                <img
                                                      src={MacbookAir}
                                                      className="shadow-lg relative rounded-2xl w-full h-full"
                                                      alt="Macbook Mockup"
                                                />
                                          )}

                                          {!isPlaying && (
                                                <div className="absolute inset-0 grid w-full h-full pointer-events-none place-items-center">
                                                      <button
                                                            type="button"
                                                            onClick={handlePlayVideo}
                                                            className="inline-flex items-center justify-center w-20 h-20 text-white transition-all duration-200 border-2 border-gray-900 border-opacity-20 pointer-events-auto rounded-2xl bg-purple-500 backdrop-blur-lg hover:bg-purple-400"
                                                      >
                                                            <svg
                                                                  className="w-auto h-8 -mr-1"
                                                                  viewBox="0 0 15 18"
                                                                  fill="none"
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                  <path
                                                                        d="M1 3.80425V14.1958C1 15.7666 2.7279 16.7243 4.06 15.8917L12.3732 10.696C13.6265 9.91266 13.6265 8.08734 12.3732 7.304L4.06 2.10825C2.7279 1.27569 1 2.23338 1 3.80425Z"
                                                                        stroke="currentColor"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                  />
                                                            </svg>
                                                      </button>
                                                </div>
                                          )}
                                    </GradientWrapper>
                              </div>
                        </LayoutEffect>
                  </div>
            </section>
      )
}

export default Hero


import { Bright_Meta } from 'bright_meta';

const About = () => {

      return <div>
            <Bright_Meta>
                  <title>About Page</title>
            </Bright_Meta>
            <section className='py-20 px-4 bg-black '>
                  <div class="relative overflow-hidden bg-blue-600 max-w-6xl mx-auto rounded-3xl sm:px-6 lg:px-8 " >
                        <div class="absolute top-0  left-0">
                              <img class="object-cover w-full  opacity-20 2xl:opacity-50" src="https://landingfoliocom.imgix.net/store/collection/saasui/images/how-it-works/3/ring-pattern.svg" alt="" />
                        </div>



                        <div class="relative px-4 py-12 mx-auto max-w-7xl rounded-3xl sm:px-6 lg:px-8 sm:py-16 lg:py-20 xl:py-24">
                              <div class="md:mr-auto md:w-1/2 md:pr-10">
                                    <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">How it works?</h2>
                                    <p class="mt-4 text-base font-normal leading-7 text-blue-300 lg:text-lg lg:mt-6 lg:leading-8"></p>
                              </div>
                        </div>
                  </div>

                  <div class="py-12  bg-black sm:py-16 lg:py-20 xl:py-20">
                        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-6xl">
                              <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-20 lg:gap-x-16">
                                    <div class="relative flex flex-row items-start lg:flex-col">
                                          <span class="absolute w-px h-full -ml-px border-l-2 border-gray-200 border-dashed lg:border-l-0 lg:border-t-2 top-16 left-6 sm:left-8 lg:w-full lg:h-0 lg:top-8 lg:left-0" aria-hidden="true"></span>

                                          <div class="inline-flex items-center justify-center ring-[20px] lg:ring-[36px] ring-white relative w-12 h-12 text-xl font-medium text-white bg-blue-600 rounded-full shrink-0 sm:text-3xl sm:h-16 sm:w-16">01</div>
                                          <div class="ml-[40px] mt-[-10px] lg:ml-[-40px] lg:mt-16">
                                                <h3 class="text-xl font-semibold text-white">Setup Vite Project</h3>
                                          </div>
                                    </div>

                                    <div class="relative flex flex-row items-start lg:flex-col">
                                          <span class="absolute w-px h-full -ml-px border-l-2 border-gray-200 border-dashed lg:border-l-0 lg:border-t-2 top-16 left-6 sm:left-8 lg:w-full lg:h-0 lg:top-8 lg:left-0" aria-hidden="true"></span>

                                          <div class="inline-flex items-center justify-center ring-[20px] lg:ring-[36px] ring-white relative w-12 h-12 text-xl font-medium text-white bg-blue-600 rounded-full shrink-0 sm:text-3xl sm:h-16 sm:w-16">02</div>
                                          <div class="ml-[40px] mt-[-10px] lg:ml-[-40px] lg:mt-16">
                                                <h3 class="text-xl font-semibold text-white">Setup Tailwind CSS</h3>
                                          </div>
                                    </div>

                                    <div class="relative flex flex-row items-start lg:flex-col">
                                          <span class="absolute w-px h-full -ml-px border-l-2 border-gray-200 border-dashed lg:border-l-0 lg:border-t-2 top-16 left-6 sm:left-8 lg:w-full lg:h-0 lg:top-8 lg:left-0" aria-hidden="true"></span>

                                          <div class="inline-flex items-center justify-center ring-[20px] lg:ring-[36px] ring-white relative w-12 h-12 text-xl font-medium text-white bg-blue-600 rounded-full shrink-0 sm:text-3xl sm:h-16 sm:w-16">03</div>
                                          <div class="ml-[40px] mt-[-10px] lg:ml-[-40px] lg:mt-16">
                                                <h3 class="text-xl font-semibold text-white">Setup Others Tools</h3>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>


      </div>;
};

export default About;

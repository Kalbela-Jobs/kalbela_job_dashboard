
import LayoutEffect from "../../LayoutEffect";
import SectionWrapper from "../../SectionWrapper";
import Button from "../Button";

const Pricing = () => {

      const plans = [
            {
                  name: "Basic",
                  desc: "Perfect for small businesses hiring occasionally",
                  price: 2500,
                  isMostPop: false,
                  features: [
                        "1 job post within 30 days",
                        "Unlimited CV viewing",
                        "AI integrated Algorithm",
                        "1 Job Boosting",
                        "Standard customer support",
                        "30 days validity"
                  ],
            },
            {
                  name: "Standard",
                  desc: "Perfect for small businesses hiring frequently",
                  price: 6500,
                  isMostPop: true,
                  features: [
                        "6 job posts within validity period",
                        "Unlimited CV viewing",
                        "AI integrated Algorithm",
                        "Boosting on 3 jobs added",
                        "Priority customer support",
                        "60 days validity",
                  ],
            },
            {
                  name: "Enterprise",
                  desc: "Perfect for large-scale recruitment and HR teams",
                  price: 10500,
                  isMostPop: false,
                  features: [
                        "Unlimited job posts",
                        "Unlimited CV viewing",
                        "AI integrated Algorithm",
                        "Boosting on 5 jobs added",
                        "Priority customer support",
                        "90 days validity",
                  ],
            },
      ];

      const mostPopPricingBg = "radial-gradient(130.39% 130.39% at 51.31% -0.71%, #1F2937 0%, rgba(31, 41, 55, 0) 100%)"

      return (
            <SectionWrapper id="pricing" className='custom-screen'>
                  <div className='relative max-w-xl mx-auto text-center'>
                        <h2 className='text-gray-50 text-3xl font-semibold sm:text-4xl'>
                              Find a plan to power your business
                        </h2>
                  </div>
                  <LayoutEffect
                        className="duration-1000 delay-300"
                        isInviewState={{
                              trueState: "opacity-1",
                              falseState: "opacity-0"
                        }}
                  >
                        <div className='mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                              {
                                    plans.map((item, idx) => (
                                          <div key={idx} className={`relative flex-1 flex items-stretch flex-col rounded-xl border border-gray-800 mt-6 sm:mt-0 ${item.isMostPop ? "border border-purple-500" : ""}`}
                                                style={{
                                                      backgroundImage: item.isMostPop ? mostPopPricingBg : ""
                                                }}
                                          >
                                                <div className="p-8 space-y-4 border-b border-gray-800 text-center">
                                                      <span className='text-purple-600 font-medium'>
                                                            {item.name}
                                                      </span>
                                                      <div className='text-gray-50 text-3xl font-semibold'>
                                                            <span className=' text-gray-400 kalpurush'>৳ {" "}</span> {item.price}<span className='text-sm text-gray-400'>{" "}BDT</span>
                                                      </div>
                                                      <p className="text-gray-400">
                                                            {item.desc}
                                                      </p>
                                                </div>
                                                <div className="p-8">
                                                      <ul className='space-y-3'>
                                                            {
                                                                  item.features.map((featureItem, idx) => (
                                                                        <li key={idx} className='flex items-center gap-5 text-gray-300'>
                                                                              <svg
                                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                                    className='h-5 w-5 text-indigo-600'
                                                                                    viewBox='0 0 20 20'
                                                                                    fill='currentColor'>
                                                                                    <path
                                                                                          fill-rule='evenodd'
                                                                                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                                                          clip-rule='evenodd'></path>
                                                                              </svg>
                                                                              {featureItem}
                                                                        </li>
                                                                  ))
                                                            }
                                                      </ul>
                                                      <div className="pt-8">
                                                            <Button className={`w-full rounded-full text-white ring-offset-2 focus:ring ${item.isMostPop ? "bg-purple-600 hover:bg-purple-500 focus:bg-purple-700 ring-purple-600" : "bg-gray-800 hover:bg-gray-700 ring-gray-800"}`}>
                                                                  Get Started
                                                            </Button>
                                                      </div>
                                                </div>
                                          </div>
                                    ))
                              }
                        </div>
                  </LayoutEffect>
            </SectionWrapper>
      );
};

export default Pricing

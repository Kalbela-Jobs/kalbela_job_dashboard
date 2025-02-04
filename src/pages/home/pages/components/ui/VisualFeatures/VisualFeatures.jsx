
import Feature1 from "../../../../../../../public/images/1.png"
import Feature2 from "../../../../../../../public/images/2.png"
import SectionWrapper from "../../SectionWrapper"


const VisualFeatures = () => {

      const features = [
            {
                  title: "Limitless Job Post ",
                  desc: "Post as many jobs as you want and reach out to the best candidates in the market.",
                  img: Feature1
            },
            {
                  title: "Integrate your HR dashboards",
                  desc: "Connect your HR dashboards with Kalbela Jobs to manage all your hiring activities in one place.",
                  img: Feature2
            },
      ]
      return (
            <SectionWrapper>
                  <div className="custom-screen text-gray-300">
                        <div className="max-w-xl mx-auto text-center">
                              <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                                    Elevate your hiring process with Kalbela Jobs HR Panel
                              </h2>
                              <p className="mt-3">
                                    With Kalbela Jobs' advanced HR panel, you can easily post job listings, track applications, and find the best talent to grow your business.
                              </p>

                        </div>
                        <div className="mt-12">
                              <ul className="space-y-8 gap-x-6 sm:flex sm:space-y-0">
                                    {
                                          features.map((item, idx) => (
                                                <li className="flex-1 flex flex-col justify-between border border-gray-800 rounded-2xl" key={idx}
                                                      style={{
                                                            background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"
                                                      }}
                                                >
                                                      <div className="p-8">
                                                            <h3 className="text-gray-50 text-xl font-semibold">
                                                                  {item.title}
                                                            </h3>
                                                            <p className="mt-3 sm:text-sm md:text-base">
                                                                  {item.desc}
                                                            </p>
                                                      </div>
                                                      <div className="pl-8">
                                                            <img
                                                                  src={item.img}
                                                                  className="w-full ml-auto"
                                                                  alt={item.title}
                                                            />
                                                      </div>
                                                </li>
                                          ))
                                    }
                              </ul>
                        </div>
                  </div>
            </SectionWrapper>
      )
}

export default VisualFeatures

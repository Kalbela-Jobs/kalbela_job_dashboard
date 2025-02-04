
import user1 from "../../../../../../../public/testimonial/user1.webp"
import user2 from "../../../../../../../public/testimonial/user2.webp"
import user3 from "../../../../../../../public/testimonial/user3.webp"
import user4 from "../../../../../../../public/testimonial/user4.webp"
import user5 from "../../../../../../../public/testimonial/user5.webp"
import user6 from "../../../../../../../public/testimonial/user6.webp"
import GradientWrapper from "../../GradientWrapper"
import LayoutEffect from "../../LayoutEffect"
import SectionWrapper from "../../SectionWrapper"

const Testimonial = () => {

      const testimonials = [
            {
                  avatar: user1,
                  name: "Tanvir Hasan",
                  title: "HR Manager at Grameenphone",
                  quote: "Kalbela Jobs HR Panel has streamlined our recruitment process. Posting jobs, tracking applications, and finding top talent has never been easier."
            },
            {
                  avatar: user2,
                  name: "Farzana Rahman",
                  title: "Talent Acquisition Lead at Robi Axiata",
                  quote: "We've been using Kalbela Jobs for months, and it has significantly improved our hiring efficiency. The AI-powered job recommendations are a game changer!"
            },
            {
                  avatar: user3,
                  name: "Md. Shahriar Alam",
                  title: "Founder of BD Tech Solutions",
                  quote: "Kalbela Jobs has helped us connect with highly skilled professionals. The platform is intuitive, and the HR tools make hiring seamless."
            },
            {
                  avatar: user4,
                  name: "Ayesha Siddiqua",
                  title: "Recruitment Specialist at BRAC",
                  quote: "The Kalbela Jobs HR Panel has transformed our hiring process. The ability to track applications and communicate with candidates efficiently is invaluable."
            },
            {
                  avatar: user5,
                  name: "Raihan Karim",
                  title: "CEO of SoftTech BD",
                  quote: "We needed a reliable platform to hire top talent, and Kalbela Jobs delivered. It's easy to use and provides great insights into our hiring pipeline."
            },
            {
                  avatar: user6,
                  name: "Nusrat Jahan",
                  title: "HR Director at Walton Group",
                  quote: "Kalbela Jobs has simplified recruitment for us. The detailed analytics and AI-driven recommendations ensure we find the right candidates quickly."
            },
      ];


      return (
            <SectionWrapper>
                  <div id="testimonials" className="custom-screen text-gray-300">
                        <div className="max-w-2xl text-center md:mx-auto">
                              <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                                    What our customers say
                              </h2>
                        </div>
                        <GradientWrapper wrapperClassName="max-w-sm h-40 top-12 inset-x-0" className="mt-12">
                              <LayoutEffect
                                    className="duration-1000 delay-300"
                                    isInviewState={{
                                          trueState: "opacity-1",
                                          falseState: "opacity-0 translate-y-12"
                                    }}
                              >
                                    <ul className="grid gap-6 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
                                          {
                                                testimonials.map((item, idx) => (
                                                      <li key={idx} className="p-4 rounded-xl border border-gray-800"
                                                            style={{
                                                                  backgroundImage: "radial-gradient(100% 100% at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)"
                                                            }}
                                                      >
                                                            <figure className="flex flex-col justify-between gap-y-6 h-full">
                                                                  <blockquote className="">
                                                                        <p className="">
                                                                              {item.quote}
                                                                        </p>
                                                                  </blockquote>
                                                                  <div className="flex items-center gap-x-4">
                                                                        <img
                                                                              src={item.avatar}
                                                                              alt={item.name}
                                                                              className="w-14 h-14 rounded-full object-cover"
                                                                        />
                                                                        <div>
                                                                              <span className="block text-gray-50 font-semibold">{item.name}</span>
                                                                              <span className="block text-sm mt-0.5">{item.title}</span>
                                                                        </div>
                                                                  </div>
                                                            </figure>
                                                      </li>
                                                ))
                                          }
                                    </ul>
                              </LayoutEffect>
                        </GradientWrapper>
                  </div>
            </SectionWrapper>
      )
}

export default Testimonial

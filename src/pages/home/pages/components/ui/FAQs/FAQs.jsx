import LayoutEffect from "../../LayoutEffect"
import SectionWrapper from "../../SectionWrapper"


const faqsList = [
      {
            q: "What is Kalbela Jobs?",
            a: "Kalbela Jobs is a job portal that connects job seekers with employers, providing a platform to find the best career opportunities and hire top talent.",
      },
      {
            q: "How can I find jobs on Kalbela Jobs?",
            a: "You can search for jobs using keywords, categories, and locations. Simply create an account, upload your CV, and apply for job postings that match your skills.",
      },
      {
            q: "How do I post a job on Kalbela Jobs?",
            a: "Employers can post job listings by signing up for an account, selecting a suitable job posting plan, and filling out the job details.",
      },
      {
            q: "Does Kalbela Jobs offer AI-powered job recommendations?",
            a: "Yes, Kalbela Jobs uses AI to analyze your profile and job preferences, providing personalized job recommendations to help you find the best opportunities.",
      },
      {
            q: "What are the benefits of using Kalbela Jobs?",
            a: "Kalbela Jobs offers a user-friendly platform, AI-powered job matching, real-time job alerts, and a wide range of job opportunities from top employers.",
      },
      {
            q: "Can I apply for jobs directly through Kalbela Jobs?",
            a: "Yes, you can apply for jobs directly on Kalbela Jobs by submitting your application and CV through the platform.",
      }
];


const FAQs = () => (
      <SectionWrapper id="faqs">
            <div className="custom-screen text-gray-300">
                  <div className="max-w-xl text-center xl:mx-auto">
                        <h2 className="text-gray-50 text-3xl font-extrabold sm:text-4xl">
                              Everything you need to know
                        </h2>
                        <p className="mt-3">
                              Here are the most questions people always ask about.
                        </p>
                  </div>
                  <div className='mt-12'>
                        <LayoutEffect
                              className="duration-1000 delay-300"
                              isInviewState={{
                                    trueState: "opacity-1",
                                    falseState: "opacity-0 translate-y-12"
                              }}
                        >
                              <ul className='space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3'>
                                    {faqsList.map((item, idx) => (
                                          <li
                                                key={idx}
                                                className="space-y-3"
                                          >
                                                <summary
                                                      className="flex items-center justify-between font-semibold text-gray-100">
                                                      {item.q}
                                                </summary>
                                                <p
                                                      dangerouslySetInnerHTML={{ __html: item.a }}
                                                      className='leading-relaxed'>
                                                </p>
                                          </li>
                                    ))}
                              </ul>
                        </LayoutEffect>
                  </div>
            </div>
      </SectionWrapper>
)

export default FAQs

import { CheckIcon } from "lucide-react"

const Pricing = () => {
      const data = {
            "packages": [
                  {
                        "name": "SME Package",
                        "price": 500,
                        "vat": 5,
                        "duration": "10 days",
                        "job_post_limit": 1,
                        "max_candidates": 100,
                        "features": [
                              "Access to online test",
                              "Video interview",
                              "Available on publishing platform"
                        ]
                  },
                  {
                        "name": "Standard Listing",
                        "price": 2850,
                        "vat": 5,
                        "duration": "30 days",
                        "job_post_limit": 3,
                        "max_candidates": "Unlimited",
                        "features": [
                              "Access to online test",
                              "Video interview",
                              "Talent searching assistant by expert",
                              "Available on publishing platform"
                        ]
                  },
                  {
                        "name": "Premium Listing",
                        "price": 3900,
                        "vat": 5,
                        "duration": "30 days",
                        "job_post_limit": 5,
                        "max_candidates": "Unlimited",
                        "features": [
                              "Access to online test",
                              "Video interview",
                              "Talent searching assistant by expert",
                              "Display company logo",
                              "Available on publishing platform"
                        ]
                  },
                  {
                        "name": "Premium Plus Listing",
                        "price": 5900,
                        "vat": 5,
                        "duration": "30 days",
                        "job_post_limit": 10,
                        "max_candidates": "Unlimited",
                        "features": [
                              "Access to online test",
                              "Video interview",
                              "Talent searching assistant by expert",
                              "Customize cover photo",
                              "Add attachment",
                              "Add email apply",
                              "Display company logo",
                              "Free promotion (Facebook, LinkedIn, etc.)",
                              "Available on publishing platform"
                        ]
                  },
                  {
                        "name": "Feature Jobs",
                        "price": 13900,
                        "vat": 5,
                        "job_post_limit": 10,
                        "duration": {
                              "home_page": "15 days",
                              "premium_listing": "15 days"
                        },
                        "max_candidates": "Unlimited",
                        "features": [
                              "Access to online test",
                              "Video interview",
                              "Talent searching assistant by expert",
                              "Customize cover photo",
                              "Add attachment",
                              "Add email apply",
                              "Display company logo",
                              "Free promotion (Facebook, LinkedIn, etc.)",
                              "Available on publishing platform",
                              "Customize webpage"
                        ]
                  }
            ]

      }

      // All possible features across all packages
      const allFeatures = Array.from(new Set(data.packages.flatMap((pkg) => pkg.features)))

      const formatDuration = (duration) => {
            if (typeof duration === "string") {
                  return duration
            } else if (typeof duration === "object") {
                  return Object.entries(duration)
                        .map(([key, value]) => `${value} on ${key.replace("_", " ")}`)
                        .join(", ")
            }
            return ""
      }

      return (
            <div className="py-16 px-4 md:px-8">
                  <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                              <p className="text-sm font-medium text-blue-600 mb-2">Compare plans with each other</p>
                              <h2 className="text-3xl font-bold text-gray-100 mb-4">Select what you need</h2>
                              <p className="text-gray-200 max-w-2xl mx-auto">
                                    Choose the perfect plan for your recruitment needs with our comprehensive packages.
                              </p>
                        </div>

                        <div className="mt-12 overflow-x-auto">
                              <table className="w-full">
                                    <thead>
                                          <tr className="border-t border-gray-200">
                                                <th className="py-5 px-4 text-left text-sm font-medium text-gray-500 w-1/4">Features</th>
                                                {data.packages.map((pkg, index) => (
                                                      <th key={index} className="px-4 text-center">
                                                            <div className="min-w-[140px]">
                                                                  <p className="text-sm font-medium text-gray-100">{pkg.name}</p>
                                                                  <p className="mt-2 text-2xl font-bold text-gray-100">৳{pkg.price}</p>
                                                                  <p className="mt-1 text-sm text-gray-300">{formatDuration(pkg.duration)}</p>
                                                            </div>
                                                      </th>
                                                ))}
                                          </tr>
                                    </thead>
                                    <tbody className="border-t border-gray-200 divide-y divide-gray-200">
                                          {/* <tr>
                                                <th className="py-5 px-4 text-left text-sm font-medium text-gray-500">Job Post Limit</th>
                                                {data.packages.map((pkg, index) => (
                                                      <td key={index} className="px-4 py-5 text-center">
                                                            <span className="text-sm text-gray-900">{pkg.job_post_limit || "-"}</span>
                                                      </td>
                                                ))}
                                          </tr> */}
                                          <tr>
                                                <th className="py-5 px-4 text-left text-sm font-medium text-gray-500">Max Candidates</th>
                                                {data.packages.map((pkg, index) => (
                                                      <td key={index} className="px-4 py-5 text-center">
                                                            <span className="text-sm text-gray-900">{pkg.max_candidates || "-"}</span>
                                                      </td>
                                                ))}
                                          </tr>
                                          {allFeatures.map((feature, featureIndex) => (
                                                <tr key={featureIndex}>
                                                      <th className="py-5 px-4 text-left text-sm font-medium text-gray-500">{feature}</th>
                                                      {data.packages.map((pkg, pkgIndex) => (
                                                            <td key={pkgIndex} className="px-4 py-5 text-center">
                                                                  {pkg.features.includes(feature) ? (
                                                                        <CheckIcon className="w-5 h-5 text-blue-600 mx-auto" />
                                                                  ) : (
                                                                        <span className="text-gray-300">-</span>
                                                                  )}
                                                            </td>
                                                      ))}
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>

                        <div className="mt-8 text-center">
                              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Get Started
                              </button>
                        </div>
                  </div>
            </div>
      )
}

export default Pricing

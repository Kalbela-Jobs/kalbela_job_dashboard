import { useState } from "react";



const Dashboard = () => {

      const [salesData] = useState({
            todaySale: 12426,
            totalSales: 238485,
            totalOrders: 84382,
            totalCustomers: 33493,
      });

      const [transactions] = useState([
            {
                  id: 1,
                  status: "Completed",
                  cardType: "Visa",
                  cardNumber: "4831",
                  amount: 182.94,
                  date: "Jan 17, 2022",
                  vendor: "Amazon",
            },
            {
                  id: 2,
                  status: "Completed",
                  cardType: "Mastercard",
                  cardNumber: "6442",
                  amount: 99.0,
                  date: "Jan 17, 2022",
                  vendor: "Facebook",
            },
            // Add more transactions here
      ]);

      const [recentCustomers] = useState([
            {
                  id: 1,
                  name: "Jenny Wilson",
                  email: "w.lawson@example.com",
                  spent: 11234,
                  location: "Austin",
                  avatar:
                        "https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male.png",
            },
            {
                  id: 2,
                  name: "Devon Lane",
                  email: "dat.roberts@example.com",
                  spent: 11159,
                  location: "New York",
                  avatar:
                        "https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male-2.png",
            },
            // Add more recent customers here
      ]);


      const [openDropdown, setOpenDropdown] = useState(null);



      return (
            <div className="flex flex-col flex-1 overflow-x-hidden">
                  <main>
                        <div className="py-6">
                              <div className="px-4 mx-auto sm:px-6 md:px-8">

                              </div>
                              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                                    <div className="space-y-5 sm:space-y-6">
                                          {/* Sales Statistics */}
                                          <div className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                                {/* Today's Sale */}
                                                <div className="bg-white border border-gray-200 rounded-xl">
                                                      <div className="px-5 py-4">
                                                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                                  Today's Sale
                                                            </p>
                                                            <div className="flex items-center justify-between mt-3">
                                                                  <p className="text-xl font-bold text-gray-900">
                                                                        ${salesData.todaySale}
                                                                  </p>
                                                                  <span className="inline-flex items-center text-sm font-semibold text-green-500">
                                                                        + 36%
                                                                        <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              className="w-3 h-3 ml-0.5"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                              strokeWidth={3}
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                                                                              />
                                                                        </svg>
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>
                                                {/* Total Sales */}
                                                <div className="bg-white border border-gray-200 rounded-xl">
                                                      <div className="px-5 py-4">
                                                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                                  Total Sales
                                                            </p>
                                                            <div className="flex items-center justify-between mt-3">
                                                                  <p className="text-xl font-bold text-gray-900">
                                                                        ${salesData.totalSales}
                                                                  </p>
                                                                  <span className="inline-flex items-center text-sm font-semibold text-red-500">
                                                                        - 14%
                                                                        <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              className="w-3 h-3 ml-0.5"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                              strokeWidth={3}
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                                                                              />
                                                                        </svg>
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>
                                                {/* Total Orders */}
                                                <div className="bg-white border border-gray-200 rounded-xl">
                                                      <div className="px-5 py-4">
                                                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                                  Total Orders
                                                            </p>
                                                            <div className="flex items-center justify-between mt-3">
                                                                  <p className="text-xl font-bold text-gray-900">
                                                                        {salesData.totalOrders}
                                                                  </p>
                                                                  <span className="inline-flex items-center text-sm font-semibold text-green-500">
                                                                        + 36%
                                                                        <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              className="w-3 h-3 ml-0.5"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                              strokeWidth={3}
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                                                                              />
                                                                        </svg>
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>
                                                {/* Total Customers */}
                                                <div className="bg-white border border-gray-200 rounded-xl">
                                                      <div className="px-5 py-4">
                                                            <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                                  Total Customers
                                                            </p>
                                                            <div className="flex items-center justify-between mt-3">
                                                                  <p className="text-xl font-bold text-gray-900">
                                                                        {salesData.totalCustomers}
                                                                  </p>
                                                                  <span className="inline-flex items-center text-sm font-semibold text-green-500">
                                                                        + 36%
                                                                        <svg
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              className="w-3 h-3 ml-0.5"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                              strokeWidth={3}
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                                                                              />
                                                                        </svg>
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Transactions */}
                                          <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
                                                <div className="px-4 py-5 sm:p-6">
                                                      <div className="sm:flex sm:items-center sm:justify-between">
                                                            <div>
                                                                  <p className="text-base font-bold text-gray-900">
                                                                        Transactions
                                                                  </p>
                                                                  <p className="mt-1 text-sm font-medium text-gray-500">
                                                                        Lorem ipsum dolor sit amet, consectetur adipis.
                                                                  </p>
                                                            </div>
                                                            <div className="mt-4 sm:mt-0">
                                                                  <a
                                                                        href="#"
                                                                        className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-900"
                                                                  >
                                                                        See all Transactions
                                                                        <svg
                                                                              className="w-4 h-4 ml-2"
                                                                              xmlns="http://www.w3.org/2000/svg"
                                                                              fill="none"
                                                                              viewBox="0 0 24 24"
                                                                              stroke="currentColor"
                                                                              strokeWidth={2}
                                                                        >
                                                                              <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M9 5l7 7-7 7"
                                                                              />
                                                                        </svg>
                                                                  </a>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="divide-y divide-gray-200">
                                                      {transactions.map((transaction) => (
                                                            <div
                                                                  key={transaction.id}
                                                                  className="grid grid-cols-3 py-4 gap-y-4 lg:gap-0 lg:grid-cols-6"
                                                            >
                                                                  <div className="col-span-2 px-4 lg:py-4 sm:px-6 lg:col-span-1">
                                                                        <span
                                                                              className={`text-xs font-medium rounded-full inline-flex items-center px-2.5 py-1 ${transaction.status === "Completed"
                                                                                    ? "text-green-900 bg-green-100"
                                                                                    : transaction.status === "Pending"
                                                                                          ? "text-yellow-900 bg-yellow-100"
                                                                                          : "text-red-900 bg-red-100"
                                                                                    }`}
                                                                        >
                                                                              <svg
                                                                                    className={`-ml-1 mr-1.5 h-2.5 w-2.5 ${transaction.status === "Completed"
                                                                                          ? "text-green-500"
                                                                                          : transaction.status === "Pending"
                                                                                                ? "text-yellow-400"
                                                                                                : "text-red-500"
                                                                                          }`}
                                                                                    fill="currentColor"
                                                                                    viewBox="0 0 8 8"
                                                                              >
                                                                                    <circle cx={4} cy={4} r={3} />
                                                                              </svg>
                                                                              {transaction.status}
                                                                        </span>
                                                                  </div>
                                                                  <div className="px-4 lg:py-4 sm:px-6 lg:col-span-2">
                                                                        <p className="text-sm font-bold text-gray-900">
                                                                              {transaction.cardType} card ****{" "}
                                                                              {transaction.cardNumber}
                                                                        </p>
                                                                        <p className="mt-1 text-sm font-medium text-gray-500">
                                                                              Card payment
                                                                        </p>
                                                                  </div>
                                                                  <div className="px-4 lg:py-4 sm:px-6">
                                                                        <p className="text-sm font-bold text-gray-900">
                                                                              ${transaction.amount}
                                                                        </p>
                                                                        <p className="mt-1 text-sm font-medium text-gray-500">
                                                                              {transaction.date}
                                                                        </p>
                                                                  </div>
                                                                  <div className="px-4 text-right lg:py-4 sm:px-6 lg:order-last">
                                                                        <div className="relative">
                                                                              <button
                                                                                    type="button"
                                                                                    className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                                                                    onClick={() =>
                                                                                          setOpenDropdown(
                                                                                                openDropdown === transaction.id
                                                                                                      ? null
                                                                                                      : transaction.id
                                                                                          )
                                                                                    }
                                                                              >
                                                                                    <svg
                                                                                          className="w-6 h-6"
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          fill="none"
                                                                                          viewBox="0 0 24 24"
                                                                                          stroke="currentColor"
                                                                                          strokeWidth={2}
                                                                                    >
                                                                                          <path
                                                                                                strokeLinecap="round"
                                                                                                strokeLinejoin="round"
                                                                                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                                                                          />
                                                                                    </svg>
                                                                              </button>
                                                                              {openDropdown === transaction.id && (
                                                                                    <div className="absolute right-0 z-10 w-48 py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                                                                          <a
                                                                                                href="#"
                                                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                                                onClick={(e) => {
                                                                                                      e.preventDefault();
                                                                                                      console.log(
                                                                                                            "View details for transaction",
                                                                                                            transaction.id
                                                                                                      );
                                                                                                      setOpenDropdown(null);
                                                                                                }}
                                                                                          >
                                                                                                View details
                                                                                          </a>
                                                                                          <a
                                                                                                href="#"
                                                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                                                onClick={(e) => {
                                                                                                      e.preventDefault();
                                                                                                      console.log(
                                                                                                            "Edit transaction",
                                                                                                            transaction.id
                                                                                                      );
                                                                                                      setOpenDropdown(null);
                                                                                                }}
                                                                                          >
                                                                                                Edit
                                                                                          </a>
                                                                                          <a
                                                                                                href="#"
                                                                                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                                                                onClick={(e) => {
                                                                                                      e.preventDefault();
                                                                                                      console.log(
                                                                                                            "Delete transaction",
                                                                                                            transaction.id
                                                                                                      );
                                                                                                      setOpenDropdown(null);
                                                                                                }}
                                                                                          >
                                                                                                Delete
                                                                                          </a>
                                                                                    </div>
                                                                              )}
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      ))}
                                                </div>
                                          </div>

                                          {/* Recent Customers */}
                                          <div className="overflow-hidden bg-white border border-gray-200 rounded-xl">
                                                <div className="px-4 py-5 sm:p-6">
                                                      <div>
                                                            <p className="text-base font-bold text-gray-900">
                                                                  Recent Customers
                                                            </p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">
                                                                  Lorem ipsum dolor sit ametis.
                                                            </p>
                                                      </div>
                                                      <div className="mt-8 space-y-6">
                                                            {recentCustomers.map((customer) => (
                                                                  <div
                                                                        key={customer.id}
                                                                        className="flex items-center justify-between space-x-5"
                                                                  >
                                                                        <div className="flex items-center flex-1 min-w-0">
                                                                              <img
                                                                                    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                                                                                    src={customer.avatar}
                                                                                    alt={customer.name}
                                                                              />
                                                                              <div className="flex-1 min-w-0 ml-4">
                                                                                    <p className="text-sm font-bold text-gray-900">
                                                                                          {customer.name}
                                                                                    </p>
                                                                                    <p className="mt-1 text-sm font-medium text-gray-500">
                                                                                          {customer.email}
                                                                                    </p>
                                                                              </div>
                                                                        </div>
                                                                        <div className="text-right">
                                                                              <p className="text-sm font-medium text-gray-900">
                                                                                    ${customer.spent}
                                                                              </p>
                                                                              <p className="mt-1 text-sm font-medium text-gray-500 truncate">
                                                                                    {customer.location}
                                                                              </p>
                                                                        </div>
                                                                  </div>
                                                            ))}
                                                      </div>
                                                      <div className="mt-8">
                                                            <a
                                                                  href="#"
                                                                  className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-500 uppercase hover:text-gray-900"
                                                            >
                                                                  See all Customers
                                                                  <svg
                                                                        className="w-4 h-4 ml-2"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                        strokeWidth={2}
                                                                  >
                                                                        <path
                                                                              strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              d="M9 5l7 7-7 7"
                                                                        />
                                                                  </svg>
                                                            </a>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </main>
            </div>
      );
};

export default Dashboard;

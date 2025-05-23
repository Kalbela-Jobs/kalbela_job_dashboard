
import { useContext, useEffect, useRef, useState } from 'react'
import NavHeader from '../NavHeader'
import NavLink from '../NavLink'
import { Link } from 'react-router-dom'
import { Kalbela_AuthProvider } from '../../../../../../context/MainContext'
import { Avatar, Dropdown, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import UserMenu from './UserMenu'

const Navbar = () => {

      const [state, setState] = useState(false)
      const { user, loginOut } = useContext(Kalbela_AuthProvider);
      const menuBtnEl = useRef()

      const navigation = [
            { name: "Features", href: "/features" },
            { name: "Pricing", href: "/pricing" },
            { name: "Testimonials", href: "/testimonials" },
            { name: "FAQs", href: "/faqs" },
      ]

      // useEffect(() => {
      //       document.onclick = (e) => {
      //             const target = e.target;
      //             if (!menuBtnEl.current?.contains(target)) setState(false);
      //       };
      // }, [])

      return (
            <header className='sticky -top-1 z-50 bg-gray-900'>
                  <div className="custom-screen md:hidden">
                        <NavHeader menuBtnEl={menuBtnEl} state={state} onClick={() => setState(!state)} />
                  </div>
                  <nav className={`pb-2 md:text-sm md:static md:block ${state ? "bg-gray-900  border-b border-opacity-35 absolute z-20 top-0 inset-x-0 rounded-b-2xl shadow-xl md:bg-gray-900" : "hidden"}`}>
                        <div className="custom-screen items-center md:flex">
                              <NavHeader state={state} onClick={() => setState(!state)} />

                              <div className={`flex-1 items-center mt-8 text-gray-300 md:font-medium md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                                    <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                                          {
                                                navigation.map((item, idx) => {
                                                      return (
                                                            <li key={idx} className="hover:text-gray-50">
                                                                  <Link to={item.href} className="block">
                                                                        {item.name}
                                                                  </Link>
                                                            </li>
                                                      )
                                                })
                                          }
                                    </ul>
                                    {!user ? <div className="gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                                          <Link to="/sign-in" className="block hover:text-gray-50">
                                                Sign in
                                          </Link>
                                          <NavLink to="/sign-up" className="flex items-center justify-center gap-x-1 text-sm text-white font-medium custom-btn-bg border border-gray-500 active:bg-gray-900 md:inline-flex">
                                                Start now
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                                </svg>
                                          </NavLink>
                                    </div>
                                          : <div className='hidden lg:block'>
                                                <UserMenu loginOut={loginOut} user={user} />
                                          </div>
                                    }
                              </div>
                        </div>
                  </nav>
            </header>
      )
}

export default Navbar

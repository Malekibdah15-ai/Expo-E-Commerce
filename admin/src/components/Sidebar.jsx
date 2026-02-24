import React from 'react'
import { useUser } from '@clerk/clerk-react'
import {Link, useLocation} from "react-router"
import {NAVIGATION } from "./Navbar"
import { ShoppingBagIcon } from 'lucide-react'
function Sidebar() {
    const location = useLocation()
    const user = useUser()
  return (
    <div className='drawer-side not-is-drawer-close: overflow-visible'>
        <label htmlFor='my-check' aria-label='close sidebar' className='drawer-overlay'></label>
      <div className='p-4 w-full'>
        <div className='flex items-center gap-4'>
            <div className='size-10 bg-primary rounded-xl flex items-center justify-center shrink-0'>
                <ShoppingBagIcon className='w-6 h-6 text-primary-content'/>
            </div>
            <span className='text-xl font-bold is-drawer-close:hidden'>Admin</span>
        </div>
      </div>
      <ul className='menu w-full flex flex-col gap-2'>
        {NAVIGATION.map((item)=>{
            const isActive = location.pathname === item.path
            return(
                <li key={item.path}>
                    <Link to={item.path} className='is-drawer-close:tooltip is-drawer-close:tooltip-right'>
                    {item.icon}
                    <span className='is-drawer-close:hidden'>{item.name}</span>
                    </Link>

                </li>
            )
        })}

      </ul>
      {/* <div className='p-4 w-full'>
        <div className='flex items-center gap-4'>
            <div className='avatar shrink-0'>
                <img src={user?.imageUrl} alt={user?.name} className='size-10 rounded-full' />
            </div>
        </div>
      </div> */}
    </div>
  )
}

export default Sidebar


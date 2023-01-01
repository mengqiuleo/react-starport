/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 03:19:37
 * @LastEditTime: 2023-01-01 17:28:22
 */
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const None = memo(() => {
  return (
    <>
      <div className='w-full flex flex-col items-center'>
        <div className='py-50px'>Current:None</div>
        <nav flex='~' gap='2'>
          <Link
            to='/'
            className='px-10px py-5px rounded-md text-white no-underline'
            bg='[#4074ba]'
          >
            Go:home
          </Link>
        </nav>
      </div>
    </>
  )
})

export default None

/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 14:37:51
 * @LastEditTime: 2023-01-01 16:53:35
 */
import React, { memo, useState } from 'react'

// 图片组件：我们要保存某个组件的状态，该组件就是要保存状态的组件
const TheImage = memo((props: any) => {
  const [state, setState] = useState(0)
  return (
    <div className='w-full h-full relative'>
      <img className='object-cover w-full h-full' src={props.src} />
      <span
        className='absolute bottom-0 left-1/2 text-white'
        onClick={e => {
          e.stopPropagation()
          setState(state + 1)
        }}
      >
        <div className='font28' cursor='pointer'>
          {state}
        </div>
      </span>
    </div>
  )
})

export default TheImage

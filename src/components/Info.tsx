/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 17:00:31
 * @LastEditTime: 2023-01-01 17:40:30
 */
import React, { memo } from 'react'

const Info = memo(() => {
  return (
    <div flex='~ col' items='center' w='full' h='full' className='font-mono'>
      <div>router</div>
      <div>component</div>
      <div>transition</div>
    </div>
  )
})

export default Info

/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 15:22:37
 * @LastEditTime: 2023-02-04 04:27:35
 */
import React, { useRef, useEffect } from 'react'

import { useAliveScope } from './AliveScope'
//用在FloatContainer中，将用户的缓存组件使用div包裹渲染，渲染在根组件下
//keepAlive组件是对children进行了缓存，如何缓存：因为之前我们保存了状态(useContext)，那么从它中拿出渲染
const KeepAlive = (props: any) => {
  const { id, children } = props
  const getPortalElement = useAliveScope()
  const keepAliveRef = useRef<HTMLDivElement>(null)
  const appendPortalElement = () => {
    // 根据id获取到缓存的element，通过appendChild添加到div中
    const portalElement = getPortalElement(id, children)
    //在这里通过getPortalElement函数设置nodes
    keepAliveRef.current!.appendChild(portalElement)
  }
  useEffect(() => {
    appendPortalElement()
  }, [])

  return <div w='full' h='full' ref={keepAliveRef} />
}

export default KeepAlive

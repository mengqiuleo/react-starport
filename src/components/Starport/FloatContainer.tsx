/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 15:31:43
 * @LastEditTime: 2023-01-01 15:31:46
 */
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import KeepAlive from '../KeepAlive/KeepAlive'
import { StarportContext } from './Starport'

// 用于持有浮动的组件（用插槽显示）
// 将全局的metadata(样式）传递给slot外面的div
// div的m-!0是因为margin在offset计算中已经算进去了，如果有的话也不需要添加
const defaultStyle = {
  opacity: '0',
  transform: 'translateY(-20px)',
}
let timer = {} as any
const FloatContainer = memo((props: { slot: () => JSX.Element; port: string }) => {
  const location = useLocation()

  const { metadata, proxyElArr, setLandedMap } = useContext(StarportContext)
  // 起飞落地的状态
  const [landed, setLanded] = useState(true)
  const divRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // 注册setLanded函数
    setLandedMap((pre: any) => ({ ...pre, [props.port]: setLanded }))
  }, [])

  const update = async () => {
    // 等待一个tick，不然的话会出现抖动
    await Promise.resolve().then(() => {})
    setLanded(false)
    if (divRef.current) {
      const style = divRef.current.style
      const rect = proxyElArr[props.port]?.current?.getBoundingClientRect?.()
      if (rect) {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        const scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft
        style.top = rect?.top + scrollTop + 'px'
        style.left = rect?.left + scrollLeft + 'px'
        style.opacity = '1'
        style.transform = 'none'
      } else {
        style.opacity = '0'
        style.transform = 'translateY(-20px) scale(0)'
        style.pointerEvents = 'none'
      }
    }
    clearTimeout(timer[props.port])
    timer[props.port] = setTimeout(() => {
      setLanded(true)
    }, 900)
  }

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
    }
  }, [location.pathname, metadata])
  return (
    <div
      {...metadata[props.port]}
      m='!0'
      absolute='~'
      transition='all'
      duration='900'
      ref={divRef}
      style={{
        ...defaultStyle,
        ...metadata[props.port]?.style,
      }}
    >
      {
        //如果有metadata才显示插槽，防止抖动
        metadata[props.port] &&
          (landed && proxyElArr[props.port]?.current ? (
            createPortal(
              <KeepAlive id={props.port}>
                <props.slot />
              </KeepAlive>,
              proxyElArr[props.port]?.current
            )
          ) : (
            <KeepAlive id={props.port}>
              <props.slot />
            </KeepAlive>
          ))
      }
      {/* <props.slot /> */}
    </div>
  )
})

export default FloatContainer
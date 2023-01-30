/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 15:12:14
 * @LastEditTime: 2023-01-30 23:59:29
 */
import React, { memo } from 'react'
import { AliveScope } from '../KeepAlive/AliveScope'
export const StarportContext = React.createContext<{
  metadata?: any
  setMetadata?: any
  proxyElArr?: any
  setProxyElArr?: any
  landedMap?: any
  setLandedMap?: any
}>({})
const Starport = memo((props: { children: any }) => {
  const { children } = props
  //console.log('children: ', children) //这里的children就是我们在starport组件中传入的元素，比如多个div
  
  // metadata是一个对象，里面每一项是每一个缓存组件，有port属性
  const [metadata, setMetadata] = React.useState<any>({})
  // 用来保存每个port对应的proxyElement：存的是每一个缓存组件在对应页面的位置
  const [proxyElArr, setProxyElArr] = React.useState<any>({})
  // 用来判断每个container是否落地: key是每一个组件，value是false或true
  const [landedMap, setLandedMap] = React.useState<any>({})

  return (
    <StarportContext.Provider
      value={{
        metadata,
        setMetadata,
        proxyElArr,
        setProxyElArr,
        setLandedMap,
        landedMap,
      }}
    >
      {/* 这里注入后,是可以在AliveScope中拿到的 */}
      {/* 我们将实际的元素放入AliveScope中 */}
      {/* FloatContainer组件是放在AliveScope中的 */}
      <AliveScope>{children} </AliveScope>
    </StarportContext.Provider>
  )
})

export default Starport

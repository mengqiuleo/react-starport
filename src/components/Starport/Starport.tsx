/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 15:12:14
 * @LastEditTime: 2023-01-01 15:16:19
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
  // 用来保存传递的props
  const [metadata, setMetadata] = React.useState<any>({})
  // 用来保存每个port对应的proxyElement
  const [proxyElArr, setProxyElArr] = React.useState<any>({})
  // 用来判断每个container是否落地
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
      <AliveScope>{children} </AliveScope>
    </StarportContext.Provider>
  )
})

export default Starport

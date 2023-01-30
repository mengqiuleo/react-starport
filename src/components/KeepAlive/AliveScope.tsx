/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 15:13:02
 * @LastEditTime: 2023-01-30 21:15:34
 */
import React, { useContext, createContext, useState, ReactElement } from 'react'
import ReactDOM from 'react-dom'

const AliveScopeContext = createContext<any>({})

// 用于渲染用户的原本元素,如果存在用户的需要缓存的组件,那么将缓存组件进行渲染
export const AliveScope = (props: any) => {
  const [nodes, setNodes] = useState<any>({})
  const { children } = props
  const getPortalElement = (id: any, children: ReactElement) => {
    if (!nodes[id]) {
      // 传送children到element
      const element = document.createElement('div')
      element.style.width = '100%'
      element.style.height = '100%'

      setNodes((prevNodes: any) => ({
        ...prevNodes,
        [id]: { children, element },
      }))
      return element
    }
    return nodes[id].element
  }

  return (
    <AliveScopeContext.Provider value={getPortalElement}>
      {/* 先将用户编写的元素进行渲染,然后将用户自定义的需要保存的组件进行渲染 */}
      {children}
      {Object.entries<any>(nodes).map(([id, { children, element }]) => (
        <React.Fragment key={id}>
          {ReactDOM.createPortal(children, element)}
        </React.Fragment>
      ))}
    </AliveScopeContext.Provider>
  )
}

export const useAliveScope = () => useContext(AliveScopeContext)

/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 15:13:02
 * @LastEditTime: 2023-01-31 01:41:50
 */
import React, { useContext, createContext, useState, ReactElement } from 'react'
import ReactDOM from 'react-dom'

const AliveScopeContext = createContext<any>({})

// 用于渲染用户的原本元素,如果存在用户的需要缓存的组件,那么将缓存组件进行渲染
export const AliveScope = (props: any) => {
  const [nodes, setNodes] = useState<any>({})
  const { children } = props
  /**
   * 刚开始nodes为{}，可以在控制台打印查看，并且在这里并没有调用该函数，
   * 当我们调用该函数时就会设置setNodes，这样就把元素添加到nodes中了
   * 该函数会在 KeepAlive.tsx 中调用，具体逻辑异步 KeepAlive.tsx
   */
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

   //console.log('nodes: ', nodes) //nodes存储了所有需要缓存的组件
   //console.log('根缓存组件')
  
  // 会不断重复执行，因为组件的状态(存储信息)可能会发生变化

  return (
    <AliveScopeContext.Provider value={getPortalElement}>
      {Object.entries<any>(nodes).map(([id, { children, element }]) => (
        <React.Fragment key={id}>
          {ReactDOM.createPortal(children, element)}
        </React.Fragment>
      ))}
      {children}
    </AliveScopeContext.Provider>
  )
}

export const useAliveScope = () => useContext(AliveScopeContext)

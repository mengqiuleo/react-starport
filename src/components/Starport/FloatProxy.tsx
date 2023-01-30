/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 15:39:01
 * @LastEditTime: 2023-01-30 23:58:58
 */
import React, { memo, useContext, useEffect } from 'react'
import { StarportContext } from './Starport'
const resolvedPromise = Promise.resolve()
//* 代理组件，用于接收一些位置信息和一些props，用于某个页面
// 这个组件相当于一个空壳，只是获取组件的位置，然后用一个div来占据该组件的位置，并且将拿到的组件位置信息放在metadata上
// 代理组件，用于修改全局的metaData
// 并且将proxyEl这个ref绑定到div上，以便于获取FloatContainer真实位置
const FloatProxy = memo((props: any) => {
  const { setMetadata, setProxyElArr, landedMap } = useContext(StarportContext)

  const ref = React.useRef<HTMLDivElement>(null)
  const update = () => { //拿到当前组件的位置信息
    const { width, height } = ref.current?.getBoundingClientRect() as any //获取元素真实位置
    const style = {
      height,
      width,
    }
    setMetadata((pre: any) => ({ //并对metadata中存储的信息进行更新
      ...pre,
      [props.port]: {
        ...props,
        style,
      },
    }))
  }
  useEffect(() => {
    // 每次props发生变化时，重新起飞
    landedMap[props.port] && landedMap[props.port](false)
    update()
    window.addEventListener('resize', update)
    setProxyElArr((pre: any) => ({ ...pre, [props.port]: ref })) //记录每一个缓存组件在某个页面对应的位置
    return () => { // 需要在 componentWillUnmount 执行的内容
      // 在设置Metadata前把组件运回container中，防止Proxy重新渲染完成后Container重新获取slot导致跳变
      // 放在微任务中，解决在同一个页面中跳变的问题
      resolvedPromise.then(() => landedMap[props.port] && landedMap[props.port](false))
      setProxyElArr((pre: any) => ({ ...pre, [props.port]: null })) //在组件卸载前(即页面跳转前)，将缓存组件设置不占据div位置
      window.removeEventListener('resize', update)
    }
  }, [props]) //监听当位置(metadata)发生变化时

  // 将metadata传递给这个div，占据原本内容应该占据的面积
  return <div ref={ref} {...props} />
})

export default FloatProxy

<img src="E:\react\react-startport\项目总结\图片\logo.png" style="zoom:25%;" />

<p align="center">
  🛰 跨路由组件共享动画
</p>

倘若你希望你的组件在不同的地方使用，在切换的时候保存组件的状态并且拥有平滑的过渡动画。


# 实现思路

在传统的wen应用中，切换页面，意味着组件的卸载和重新挂载，组件的生命周期会执行，内部的状态也会丢失

<p align="center">
  <br/>
  <img src="https://img.jzsp66.xyz/github/1231232134.png" width="400" />
  <br/>
</p>

但是用FLIP的思路的话，我们页面中的组件，**只是一个代理组件**，用于**接收一些位置信息和一些props**。而真正要渲染的组件，其实是用**绝对定位悬浮在整个App下的**，根据代理组件接收到的位置和样式信息，将悬浮的真正组件通过补间动画的形式移动到对应的位置。

<p align="center">
  <br/>
  <img src="https://img.jzsp66.xyz/github/asdasd7.png" width="400" />
  <br/>
</p>

而这不就和FLIP没有区别了吗？不不不，等到补间动画结束之后，我们可以通过createPortal（vue中是teleport）将**组件传送到对应的代理组件中**

<p align="center">
  <br/>
  <img src="https://img.jzsp66.xyz/github/asda1503.png" width="400" />
  <br/>
</p>

# 使用方法



```js
npm i pjy-starport
```
在入口文件引入css
```js
import 'pjy-starport/main.css'
```
用Starport组件包裹整个App
```jsx
 ReactDOM.createRoot(document.getElementById('root')!).render(
   <Starport>
     <App />
   </Starport>
)
```
准备工作完成，详细使用看下面的demo
# demo

倘若我们有些图片数据需要共享



那么我们需要先用`Starport`组件包裹整个`App`（一是为了让`FloatContainer`悬浮在整个`App`下，二是让`Starport`包裹住`Router`），并且渲染`FloatContainer`组件，用slot指定要渲染的内容。这里我们要渲染的是一个图片组件`TheImage`

> 注意：一定要给`Container`唯一的port字符串

```tsx
function App() {
  return (
    <div className='bg-black w-full text-white'>
      <Starport>
        <Router />
        {imgs.map((img, index) => {
          return (
            <FloatContainer
              key={index}
              slot={() => <TheImage src={img} />}
              port={index + 1 + ''}
            />
          )
        })}
        <FloatContainer slot={() => <Info />} port='13' />
      </Starport>
    </div>
  )
}
```

接着，我们就可以在页面中使用`FloatProxy`组件来渲染`FloatContainer`组件的`slot`指定的内容了（渲染的时候`slot`外面会多一层`div`），如下。我们可以给`FloatProxy`传入一些`props`，他们会被挂载到`slot`外的`div`上（一般来说可以传入一些样式）。

```tsx
const Foo = memo(() => {
  const [mode, setMode] = useState(false)
  return (
    <>
      <div className='w-full flex flex-col items-center'>
        <div className='py-50px'>current:Foo</div>
        <FloatProxy port='13' w='96px' h='72px' />
        <nav>
		  ...
        </nav>
      </div>
      <div flex='~ wrap' justify='center'>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(
          item => (
            <FloatProxy
              key={item}
              port={item}
              className={mode ? 'w-60 h-50' : 'w-60 h-30'}
              m='5'
              rounded='xl'
              overflow='hidden'
            />
          )
        )}
      </div>
    </>
  )
})
```



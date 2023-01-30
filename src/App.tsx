/*
 * @Author: Pan Jingyi
 * @Date: 2022-12-31 01:44:19
 * @LastEditTime: 2023-01-30 22:55:25
 */
import TheImage from './components/TheImage'
import FloatContainer from './components/StarPort/FloatContainer'
import Router from './router'
import Starport from './components/StarPort/Starport'
import Info from './components/Info'
import TheNav from './components/TheNav'
import imgs from './data/index'

function App() {
  return (
    <Starport>
      <div className='bg-white w-full text-[#374751] h-full'>
        <TheNav />
        <div h='full'>
          <Router />
        </div>
      </div>
      {/* FloatContainer组件用来包裹所有想要不被销毁的组件 */}
      <FloatContainer slot={() => <Info />} port='13' />
      {imgs.map((img, index) => {
        return (
          <FloatContainer
            key={index}
            slot={() => <TheImage src={img} />}
            port={index + 1 + ''}
          />
        )
      })}
    </Starport>
  )
}

export default App

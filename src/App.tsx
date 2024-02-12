import Info from './pages/Info'
import MyImages from './pages/MyImages'
import Result from './pages/Result'
import {Div, Title} from './components'

export default function App() {
  return (
    <main
      style={{
        backgroundColor: '#F8E4E1'
      }}>
      {/* 상단바 태그 */}
      <Div
        height="7vh"
        style={{borderBottom: '1px solid gray'}}
        className="flex items-center">
        <p className="ml-4 text-lg font-bold">[코디 추천해드립니당]</p>
      </Div>
      {/* 세 개 구역 감싸는 태그 */}
      <div
        className="flex"
        style={{
          height: '93vh',
          alignItems: 'center',
          overflowY: 'auto'
        }}>
        {/* 1번 구역 태그 */}
        <Div
          width="280px"
          minWidth="280px"
          height="95%"
          style={{borderRight: '1px solid gray'}}>
          <Info />
        </Div>
        {/* 2번 구역 태그 */}
        <Div
          width="500px"
          minWidth="500px"
          height="95%"
          style={{borderRight: '1px solid gray'}}>
          <MyImages />
        </Div>
        {/* 3번 구역 태그 */}
        <Div
          width="500px"
          minWidth="500px"
          height="95%"
          //style={{borderRight: '1px solid gray'}}
        >
          <Result />
        </Div>
      </div>
    </main>
  )
}

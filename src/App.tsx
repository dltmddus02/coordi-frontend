import { useMemo, useState } from 'react'
import Info from './pages/Info'
import MyImages from './pages/MyImages'
import Result from './pages/Result'
import {Div} from './components'

export default function App() {

  const [color, setColor] = useState<string>("모름");
  const [files, setFiles] = useState<File[]>([]);
  const [gender, setGender] = useState<string>("");

  const colorMapping: {[key: string]: string} = {
    '모름': '',
    '봄 웜 라이트': 'WSL',
    '봄 웜 브라이트': 'WSB',
    '여름 쿨 라이트': 'CSL',
    '여름 쿨 뮤트': 'CSM',
    '가을 웜 뮤트': 'WAM',
    '가을 웜 딥': 'WAD',
    '겨울 쿨 딥': 'CWD',
    '겨울 쿨 브라이트': 'CWB',
  };
  const genderMapping : {[key: string]: string} = {
    '남자': 'M',
    '여자': 'F',
  };

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
          <Info 
            color={color} 
            setColor={setColor}
            gender={gender}
            setGender={setGender}/>
        </Div>
        {/* 2번 구역 태그 */}
        <Div
          width="500px"
          minWidth="500px"
          height="95%"
          style={{borderRight: '1px solid gray'}}>
          <MyImages 
            files={files} 
            setFiles={setFiles}/>
        </Div>
        {/* 3번 구역 태그 */}
        <Div
          width="500px"
          minWidth="500px"
          height="95%"
          //style={{borderRight: '1px solid gray'}}
        >
          <Result 
            gender={gender}
            color={color}
            files={files}/>
        </Div>
      </div>
    </main>
  )
}

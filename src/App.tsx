import {useState} from 'react'
import Gender from './pages/Gender'
import PColor from './pages/PColor'
import MyImages from './pages/MyImages'
import Result from './pages/Result'
import {Div} from './components'

export default function App() {
  const [color, setColor] = useState<string>('모름')
  const [files, setFiles] = useState<File[]>([])
  const [gender, setGender] = useState<string>('')

  return (
    <main>
      {/* 배너 태그 (figure) */}
      <figure
        style={{
          width: '1903px',
          height: '35vh',
          position: 'relative'
          //display: 'flex',
          //alignItems: 'center',
          //borderBottom: '1px solid gray'
        }}>
        {/* 배경 이미지 태그 
        <img
          style={{
            backgroundImage: 'url("/figure1.jpg")',
            backgroundSize: 'cover',
            //backgroundPosition: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.2
          }}
        />
        */}
        {/* 배경 비디오 태그 (video) */}
        <video
          autoPlay
          loop
          muted
          src="/figure3.mp4"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            opacity: 0.3,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1
          }}></video>
        {/* 제목 태그 (p) */}
        <p
          style={{
            zIndex: 1,
            color: '#fff',
            fontFamily: 'Arial',
            fontSize: '80px',
            fontWeight: 600,
            position: 'relative',
            textAlign: 'center',
            top: '110px',
            right: '440px',
            opacity: 0.9
          }}>
          코디 추천해드립니당
        </p>
      </figure>

      {/* 메인 태그 (main) */}
      <main
        className="flex"
        style={{
          backgroundColor: 'rgba(248, 228, 225, 0.6)',
          width: '1903px',
          height: '65vh',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'auto'
        }}>
        {/* 1번 구역 태그 (Div) */}
        <Div
          width="15%"
          height="90%"
          className="bg-white border rounded-md mr-11 border-rose-100">
          <Gender gender={gender} setGender={setGender} />
        </Div>
        {/* 2번 구역 태그 (Div) */}
        <Div
          width="20%"
          height="90%"
          className="bg-white border rounded-md mr-11 border-rose-100">
          <PColor color={color} setColor={setColor} />
        </Div>
        {/* 3번 구역 태그 (Div) */}
        <Div
          width="50%"
          height="90%"
          className="bg-white border rounded-md border-rose-100">
          <MyImages files={files} setFiles={setFiles} />
        </Div>
      </main>

      {/* 결과 부분 태그 (section) */}
      <section
        className="flex"
        style={{
          backgroundColor: 'rgba(248, 228, 225, 0.6)',
          width: '1903px',
          height: '63vh',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'auto'
        }}>
        <Div
          width="90%"
          height="90%"
          className="bg-white border rounded-md border-rose-100">
          <Result gender={gender} color={color} files={files} />
        </Div>
      </section>
    </main>
  )
}

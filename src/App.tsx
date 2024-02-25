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

  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleHover = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <main //일단 놔두자,,
      style={
        {
          //backgroundColor: '#F8E4E1'
        }
      }>
      {/* 상단바 태그 */}
      <figure
        style={{
          width: '1903px',
          height: '44vh',
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
        {/* 배경 비디오 태그 */}
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
        {/* 제목 태그 */}
        <p
          style={{
            zIndex: 1,
            color: '#fff',
            fontFamily: 'Arial',
            fontSize: '100px',
            //fontWeight: 'bold',
            position: 'relative',
            textAlign: 'center',
            top: '140px',
            right: '280px',
            opacity: 0.9
          }}>
          코디 추천해드립니당
        </p>
      </figure>

      {/* 메인 태그 */}
      <main
        className="flex"
        style={{
          backgroundColor: 'rgba(248, 228, 225, 0.6)',
          width: '1903px',
          height: '56vh',
          justifyContent: 'center',
          alignItems: 'center',
          overflowY: 'auto'
        }}>
        {/* 1번 구역 태그 */}
        <Div
          //width="280px"
          //minWidth="280px"
          width="15%"
          height="95%"
          className="ml-2 bg-white border rounded-md border-rose-100"
          style={
            {
              //opacity: 0.7,
            }
          }
          onMouseEnter={handleHover}
          onMouseLeave={handleMouseLeave}
          //style={{borderRight: '1px solid gray'}}
        >
          <Gender gender={gender} setGender={setGender} />
        </Div>
        {/* 2번 구역 태그 */}
        <Div
          //width="280px"
          //minWidth="280px"
          width="20%"
          height="95%"
          className="ml-5 bg-white border rounded-md border-rose-100"
          //style={{borderRight: '1px solid gray'}}
        >
          <PColor color={color} setColor={setColor} />
        </Div>
        {/* 3번 구역 태그 */}
        <Div
          //width="500px"
          //minWidth="500px"
          width="50%"
          height="95%"
          className="ml-5 bg-white border rounded-md border-rose-100"
          //style={{borderRight: '1px solid gray'}}
        >
          <MyImages files={files} setFiles={setFiles} />
        </Div>
      </main>

      {/* 결과 부분 태그 */}
      <section
        className="flex"
        style={{
          backgroundColor: 'rgba(248, 228, 225, 0.6)',
          width: '1903px',
          height: '53vh',
          alignItems: 'center',
          overflowY: 'auto'
        }}>
        <Div
          width="500px"
          minWidth="500px"
          height="95%"
          //style={{borderRight: '1px solid gray'}}
        >
          <Result gender={gender} color={color} files={files} />
        </Div>
      </section>
    </main>
  )
}

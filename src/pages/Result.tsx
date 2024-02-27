import {useState} from 'react'
import {Title, Div} from '../components'
import axios from 'axios'
import '../style.css'
import '../navigate.css'

type props = {gender: string; color: string; files: File[]}

export default function Result({gender, color, files}: props) {
  const [resultData, setResultData] = useState({
    k: 0, // 상위 k개
    upper: [], // 상의 이미지 주소
    lower: [], // 하의 이미지 주소
    upper_shopping: [],
    lower_shopping: [],
    upper_title: [], // 경진 추가!!
    lower_title: [] // 경진 추가!!
  })

  const [activeTab, setActiveTab] = useState('upper')
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const colorMapping: {[key: string]: string} = {
    모름: '모름',
    '봄 웜 라이트': 'WSL',
    '봄 웜 브라이트': 'WSB',
    '여름 쿨 라이트': 'CSL',
    '여름 쿨 뮤트': 'CSM',
    '가을 웜 뮤트': 'WAM',
    '가을 웜 딥': 'WAD',
    '겨울 쿨 딥': 'CWD',
    '겨울 쿨 브라이트': 'CWB'
  }
  const genderMapping: {[key: string]: string} = {
    남자: 'male',
    여자: 'female'
  }

  const encodeFileToBase64 = (image: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (event: any) => resolve(event.target.result)
      reader.onerror = error => reject(error)
    })
  }

  const getRecommend = async () => {
    if (gender === '') {
      alert('성별을 선택해주세요.')
      return
    }

    if (files.length === 0) {
      alert('파일을 선택해해주세요.')
      return
    }

    try {
      const images = await Promise.all(files.map(encodeFileToBase64))

      const response = await axios.post('http://127.0.0.1:8000/api/result/', {
        gender: genderMapping[gender],
        color: colorMapping[color],
        images: images
      })

      setResultData({
        k: response.data.k,
        upper: response.data.topk_upper,
        lower: response.data.topk_lower,
        upper_shopping: response.data.topk_shopping_upper,
        lower_shopping: response.data.topk_shopping_lower,
        upper_title: response.data.topk_title_upper, // 경진 추가!!
        lower_title: response.data.topk_title_lower // 경진 추가!!
      })
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <main className="flex flex-row mt-8 ml-6">
      {/* 제목과 버튼 태그 */}
      <div className="mt-2 ml-2 mr-10">
        <Title>추천 코디</Title>
        <button
          type="submit"
          onClick={getRecommend}
          className="mt-8 ml-3 btn btn-outline"
          style={{width: '16rem', height: '2rem'}}>
          <p className="text-base font-extrabold">결과를 보려면 클릭해주세요!</p>
        </button>
      </div>

      {/* 나머지 태그 */}
      {resultData.upper.length > 0 && ( // 결과 버튼 누르면 네비게이션 탭 표시
        <div className="flex flex-col ml-7">
          {/* 네비게이션 탭 생성 */}
          <ul role="tablist" className="flex flex-row">
            <li
              role="presentation"
              className={`tab-button-li ${activeTab === 'upper' ? 'active' : ''}`}
              style={{
                width: '90px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <a
                role="tab"
                className={`tab-button-a ${activeTab === 'upper' ? 'active' : ''}`}
                onClick={() => handleTabChange('upper')}
                href="#upper"
                style={{fontSize: '1.4em', fontWeight: 'bold'}}>
                상의
              </a>
            </li>
            <li
              role="presentation"
              className={`tab-button-li ${activeTab === 'lower' ? 'active' : ''}`}
              style={{
                width: '90px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <a
                role="tab"
                className={`tab-button-a ${activeTab === 'lower' ? 'active' : ''}`}
                onClick={() => handleTabChange('lower')}
                href="#lower"
                style={{fontSize: '1.4em', fontWeight: 'bold'}}>
                하의
              </a>
            </li>
          </ul>

          {/* 상의 탭 컨텐츠 생성 */}
          <div
            //className="border border-red-700"
            className={`tab-pane-1 ${activeTab === 'upper' ? 'active' : ''} `}
            style={{
              width: '1280px',
              height: '35vh',
              display: activeTab === 'upper' ? 'flex' : 'none',
              flexDirection: 'row',
              //alignItems: 'center',
              justifyContent: 'center'
            }}>
            <div
              className={`tab-pane-2 ${activeTab === 'upper' ? 'active' : ''} `}
              role="tabpanel"
              id="upper"
              style={{display: 'flex', flexDirection: 'row'}}>
              {resultData.upper.map((upper_path, index) => (
                <div
                  //className="border border-blue-700"
                  key={index}
                  style={{
                    width: '214px',
                    height: '214px',
                    marginLeft: '17px',
                    marginRight: '17px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                    //justifyContent: 'center'
                  }}>
                  <p // 이미지 태그
                    className="flex mt-5"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      //alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <img // 이미지 가져오기
                      key={index}
                      src={upper_path}
                      alt={`Upper ${index + 1}`}
                    />
                  </p>
                  <Div // 순위와 제품명 태그
                    minHeight="150px"
                    className="flex flex-col justify-center mt-2 font-bold"
                    style={{alignItems: 'center'}}>
                    <p className="text-xl">{index + 1}위</p>
                    <Div // 제품명 가져오기
                      minHeight="110px"
                      className="flex mt-1 text-center">
                      {resultData.upper_title[index]}
                    </Div>
                  </Div>
                  <button // 구매링크 태그
                    className="border "
                    style={{
                      borderColor: 'lightblue',
                      borderRadius: '15px',
                      boxShadow: '3px 4px 10px rgba(128, 128, 128, 0.4)',
                      backgroundColor: 'lightblue',
                      width: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <a // 구매링크 가져오기
                      key={index}
                      href={resultData.upper_shopping[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#fff',
                        //fontSize: '1.2em'
                        fontSize: '1.05em'
                      }}>
                      구매 링크
                    </a>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 하의 탭 컨텐츠 생성 */}
          <div
            //className="border border-red-700"
            className={`tab-pane-1 ${activeTab === 'lower' ? 'active' : ''}`}
            style={{
              width: '1280px',
              height: '35vh',
              display: activeTab === 'lower' ? 'flex' : 'none',
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
            <div
              className={`tab-pane-2 ${activeTab === 'lower' ? 'active' : ''}`}
              role="tabpanel"
              id="lower"
              style={{display: 'flex', flexDirection: 'row'}}>
              {resultData.lower.map((lower_path, index) => (
                <div
                  style={{
                    width: '214px',
                    height: '214px',
                    marginLeft: '17px',
                    marginRight: '17px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                    //justifyContent: 'center'
                  }}>
                  <p // 이미지 태그
                    className="flex mt-5"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      justifyContent: 'center'
                    }}>
                    <img // 이미지 가져오기
                      key={index}
                      src={lower_path}
                      alt={`Lower ${index + 1}`}
                    />
                  </p>
                  <Div // 순위와 제품명 태그
                    minHeight="150px"
                    className="flex flex-col justify-center mt-2 font-bold"
                    style={{alignItems: 'center'}}>
                    <p className="text-xl">{index + 1}위</p>
                    <Div // 제품명 가져오기
                      minHeight="110px"
                      className="flex mt-1 text-center">
                      {resultData.lower_title[index]}
                    </Div>
                  </Div>
                  <button // 구매링크 태그
                    className="border"
                    style={{
                      borderColor: 'lightblue',
                      borderRadius: '15px',
                      boxShadow: '3px 4px 10px rgba(128, 128, 128, 0.4)',
                      backgroundColor: 'lightblue',
                      width: '140px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <a // 구매링크 가져오기
                      key={index}
                      href={resultData.lower_shopping[index]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#fff',
                        //fontSize: '1.2em'
                        fontSize: '1.05em'
                        //fontWeight: 'bold'
                      }}>
                      구매 링크
                    </a>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

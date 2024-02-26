import {useState} from 'react'
import {Title, Subtitle} from '../components'
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
    lower_shopping: []
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
        lower_shopping: response.data.topk_shopping_lower
      })
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <main className="flex flex-row mt-8 ml-5">
      {/* 제목과 버튼 태그 */}
      <div className="mr-10">
        <Title>추천 코디</Title>
        <button
          type="submit"
          onClick={getRecommend}
          //className="w-full mt-4 ml-4 bg-gray-300 border border-gray-500 rounded-md hover:bg-gray-400"
          className="mt-8 ml-4 btn btn-outline"
          style={{width: '16rem', height: '2rem'}}>
          <p className="text-base font-extrabold">결과를 보려면 클릭해주세요!</p>
        </button>
      </div>

      {/* 나머지 태그 */}
      {resultData.upper.length > 0 && ( // 결과 버튼 누르면 네비게이션 탭 표시
        <div className="flex flex-col mt-8 ml-10">
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
              flexDirection: 'row'
            }}>
            <div
              className={`tab-pane-2 ${activeTab === 'upper' ? 'active' : ''} `}
              role="tabpanel"
              id="upper"
              style={{display: 'flex', flexDirection: 'row'}}>
              {resultData.upper.map((upper_path, index) => (
                <div
                  //className="border border-blue-700"
                  style={{width: '200px', height: '200px', marginRight: '40px'}}>
                  <p
                    className="flex flex-row mt-4 ml-4 "
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}>
                    <img // 이미지 가져오기
                      key={index}
                      src={upper_path}
                      alt={`Upper ${index + 1}`}
                    />
                  </p>
                  <p className="mt-4 ml-4">
                    <a // 구매링크 가져오기
                      key={index}
                      href={resultData.upper_shopping[index]}
                      target="_blank"
                      rel="noopener noreferrer">
                      구매링크
                    </a>
                  </p>
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
              flexDirection: 'row'
            }}>
            <div
              className={`tab-pane-2 ${activeTab === 'lower' ? 'active' : ''}`}
              role="tabpanel"
              id="lower"
              style={{display: 'flex', flexDirection: 'row'}}>
              {resultData.lower.map((lower_path, index) => (
                <div style={{width: '200px', height: '200px', marginRight: '40px'}}>
                  <p
                    className="flex flex-row mt-4 ml-4"
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}>
                    <img // 이미지 가져오기
                      key={index}
                      src={lower_path}
                      alt={`Lower ${index + 1}`}
                    />
                  </p>
                  <p className="mt-4 ml-4">
                    <a // 구매링크 가져오기
                      key={index}
                      href={resultData.lower_shopping[index]}
                      target="_blank"
                      rel="noopener noreferrer">
                      구매링크
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 상하의 전체 태그 
      <div className="flex flex-row">
        {/* 상의 태그 
        <span className="flex flex-row">
          {/* 상의 3벌 데이터 가져오기 
          {resultData.upper.map((upper_path, index) => (
            <section key={index} className="mt-6 mr-4">
              <div>
                <Subtitle>상의 Top.{index + 1}</Subtitle>
                <p className="mt-4 ml-4">
                  <a // 구매링크 가져오기
                    key={index}
                    href={resultData.upper_shopping[index]}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img // 이미지 가져오기
                      src={upper_path}
                      width={150}
                      height={150}
                      alt={`Upper ${index + 1}`}
                    />
                  </a>
                </p>
              </div>
            </section>
          ))}
        </span>
        

        {/* 하의 태그
        <span className="flex flex-row">
          {/* 하의 3벌 데이터 가져오기 
          {resultData.lower.map((lower_path, index) => (
            <section key={index} className="flex flex-row mt-6 mr-4">
              <div>
                <Subtitle>하의 Top.{index + 1}</Subtitle>
                <p className="mt-4 ml-4">
                  <a // 구매링크 가져오기
                    key={index}
                    href={resultData.lower_shopping[index]}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img // 이미지 url 가져오기
                      src={lower_path}
                      width={170}
                      height={170}
                      alt={`Lower ${index + 1}`}
                    />
                  </a>
                </p>
              </div>
            </section>
          ))}
        </span>
      
      </div>*/}
    </main>
  )
}

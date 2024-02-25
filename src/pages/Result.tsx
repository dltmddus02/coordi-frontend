import {useState} from 'react'
import {Title, Subtitle} from '../components'
import axios from 'axios'

type props = {gender: string; color: string; files: File[]}

export default function Result({gender, color, files}: props) {
  const [resultData, setResultData] = useState({
    k: 0, // 상위 k개
    upper: [], // 상의 이미지 주소
    lower: [], // 하의 이미지 주소
    upper_shopping: [],
    lower_shopping: []
  })

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
    <main className="mt-4 ml-4">
      <Title>추천 코디</Title>
      <button
        type="submit"
        onClick={getRecommend}
        className="w-full mt-4 ml-4 bg-gray-300 border border-gray-500 rounded-md hover:bg-gray-400"
        style={{width: '13rem', height: '2rem'}}>
        <p className="text-sm">결과를 보려면 클릭해주세요!</p>
      </button>
      <div className="flex flex-col">
        {/* 상하의 전체 태그 */}
        <span className="flex flex-row">
          {/* 상의 태그 */}
          {/* 상의 3벌 데이터 가져오기 */}
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

        <span className="flex flex-row">
          {/* 하의 태그 */}
          {/* 하의 3벌 데이터 가져오기 */}
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
      </div>
    </main>
  )
}

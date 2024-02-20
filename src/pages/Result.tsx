import {useState, useEffect} from 'react'
import {Title, Subtitle} from '../components'
import * as D from '../data'
import axios from 'axios'

export default function Result() {
  const [resultData, setResultData] = useState({
    k: 0, // 상위 k개
    upper: [], // 상의 이미지 주소
    lower: [], // 하의 이미지 주소
    upper_shopping: [],
    lower_shopping: []
  })

  const encodeFileToBase64 = (image: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event: any) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadTop3Image = () => {
    axios
      .get('http://127.0.0.1:8000/api/result/')
      .then(response => {
        console.log('여기왔음')
        setResultData({
          k: response.data.k,
          upper: response.data.topk_upper,
          lower: response.data.topk_lower,
          upper_shopping: response.data.topk_shopping_upper,
          lower_shopping: response.data.topk_shopping_lower
        })
        console.log(response.data)
        // 데이터 화면에 표시
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }

  return (
    <main className="mt-4 ml-4">
      <Title>추천 코디</Title>
      <button
        type="submit"
        onClick={async () => {
          await uploadTop3Image()
        }}
        className="w-full mt-4 ml-4 bg-gray-300 border border-gray-500 rounded-md"
        style={{width: '13rem', height: '2rem'}}>
        <p className="text-sm">결과를 보려면 클릭해주세요!</p>
      </button>
      <div className="flex flex-row">
        {/* 상의 3벌 데이터 가져오기 */}
        {resultData.upper.map((upper_path, index) => (
          <section key={index} className="mt-6 mr-4">
            <div>
              <Subtitle>상의 {index + 1}</Subtitle>
              <p className="mt-4 ml-4">
                {/* 이미지 url 가져오기 */}
                <img
                  src={upper_path}
                  width={100}
                  height={100}
                  alt={`Upper ${index + 1}`}
                />
                {/* 구매링크 가져오기 */}
                <div className="mt-3 text-sm font-bold">
                  <a
                    key={index}
                    href={resultData.upper_shopping[index]}
                    target="_blank"
                    rel="noopener noreferrer">
                    상의 링크
                  </a>
                </div>
              </p>
            </div>
          </section>
        ))}

        {/* 하의 3벌 데이터 가져오기 */}
        {resultData.lower.map((lower_path, index) => (
          <section key={index} className="mt-6 mr-4">
            <div>
              <Subtitle>하의 {index + 1}</Subtitle>
              <p className="mt-4 ml-4">
                {/* 이미지 url 가져오기 */}
                <img
                  src={lower_path}
                  width={100}
                  height={100}
                  alt={`Lower ${index + 1}`}
                />
                {/* 구매링크 가져오기 */}
                <div className="mt-3 text-sm font-bold">
                  <a
                    key={index}
                    href={resultData.lower_shopping[index]}
                    target="_blank"
                    rel="noopener noreferrer">
                    하의 링크
                  </a>
                </div>
              </p>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

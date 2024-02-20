import {useMemo, useCallback} from 'react'
import type {ChangeEvent} from 'react'
import {Title, Subtitle} from '../components'
// import axios, {formToJSON} from 'axios'
import axios from 'axios'

type colorState = {selectedColor: string, setSelectedColor: any}
export default function Info({selectedColor, setSelectedColor} : colorState) {
  /* 퍼스널컬러 배열 설정 */
  const pColors = useMemo(
    () => [
      '봄 웜 라이트',
      '봄 웜 브라이트',
      '여름 쿨 라이트',
      '여름 쿨 뮤트',
      '가을 웜 뮤트',
      '가을 웜 딥',
      '겨울 쿨 딥',
      '겨울 쿨 브라이트',
      '모름'
    ],
    []
  )

  const colorMapping: {[key: string]: string} = {
    '봄 웜 라이트': 'WSL',
    '봄 웜 브라이트': 'WSB',
    '여름 쿨 라이트': 'CSL',
    '여름 쿨 뮤트': 'CSM',
    '가을 웜 뮤트': 'WAM',
    '가을 웜 딥': 'WAD',
    '겨울 쿨 딥': 'CWD',
    '겨울 쿨 브라이트': 'CWB'
  }

  /* 사용자가 선택한 버튼을 확인하기 위한 변수들 */
  // const [selectedColor, setSelectedColor] = useState<string>(pColors[0])

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value)
  }, [])

  const sendRowIndexToBackend = async (row: string) => {
    console.log(row)
    const colorIdentifier = colorMapping[row]
    console.log(colorIdentifier)
    try {
      const formData = new FormData()
      formData.append('personal_color', colorIdentifier)
      console.log(formData)
      const response = await axios.post('/api/upload/', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      console.log('성공', response.data)
    } catch (e) {
      console.error('백엔드로 퍼컬 정보 전송 오류!', e)
    }
  }

  /* 라디오 버튼 생성 */
  const radioInputs = useMemo(
    () =>
      pColors.map((value, index) => (
        <label key={index} className="flex justify-start cursor-pointer label">
          <input
            type="radio"
            name="colors"
            className="mr-2 radio radio-primary"
            style={{width: '1rem', height: '1rem'}}
            checked={value === selectedColor}
            defaultValue={value}
            onChange={onChange}
          />
          <span className="text-xs label-text">{value}</span>
        </label>
      )),
    [pColors, selectedColor, onChange]
  )

  /* 결과 반환 */
  return (
    <section className="mt-4 ml-4">
      <Title>퍼스널컬러 정보</Title>
      <div className="flex flex-col mt-4">
        <Subtitle>Selected: {selectedColor}</Subtitle>
      </div>
      <div className="flex flex-col p-4 mt-4">
        {radioInputs.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="font-semibold">
            {row}
          </div>
        ))}
      </div>
    </section>
  )
}

import {useMemo, useCallback} from 'react'
import type {ChangeEvent} from 'react'
import {Title} from '../components'
import RadioInput from '../components/RadioInput'

type props = {color: string; setColor: React.Dispatch<React.SetStateAction<string>>}
export default function PColor({color, setColor}: props) {
  /* 퍼스널컬러 배열 설정 */
  const pColors = useMemo(
    () => [
      '모름',
      '봄 웜 라이트',
      '봄 웜 브라이트',
      '여름 쿨 라이트',
      '여름 쿨 뮤트',
      '가을 웜 뮤트',
      '가을 웜 딥',
      '겨울 쿨 딥',
      '겨울 쿨 브라이트'
    ],
    []
  )

  const onColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setColor(e.target.value)
    },
    [setColor]
  )

  /* 퍼스널컬러 버튼 생성 */
  const colorRadioInputs = useMemo(
    () =>
      pColors.map((label, index) => (
        <RadioInput
          key={index}
          group="color"
          label={label}
          value={color}
          onChange={onColorChange}
        />
      )),
    [pColors, color, onColorChange]
  )

  /* 결과 반환 */
  return (
    <section className="mt-5 ml-4">
      <Title>Step 2. 퍼스널컬러</Title>
      {/* <div className="flex flex-col mt-4">
        <Subtitle>Selected: {selectedColor}</Subtitle>
      </div> */}
      <div className="flex flex-col p-4 mt-3">{colorRadioInputs}</div>
    </section>
  )
}

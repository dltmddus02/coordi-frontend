import {useMemo, useCallback} from 'react'
import type {ChangeEvent} from 'react'
import {Title, Subtitle} from '../components'
import RadioInput from '../components/RadioInput'

type props = {color: string, setColor: React.Dispatch<React.SetStateAction<string>>, gender: string, setGender: React.Dispatch<React.SetStateAction<string>>}
export default function Info({color, setColor, gender, setGender} : props) {
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
      '겨울 쿨 브라이트',
    ],
    []
  );
  const genders = useMemo(
    () => [
      '남자',
      '여자',
    ],
    []
  );

  const onGenderChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  }, [setGender]);

  const onColorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  }, [setColor])

  const genderRadioInputs = useMemo(
    () => genders.map((label, index) => <RadioInput key={index} group="gender" label={label} value={gender} onChange={onGenderChange}/>),
    [gender, genders, onGenderChange]
  );

  const colorRadioInputs = useMemo(
    () => pColors.map((label, index) => <RadioInput key={index} group="color" label={label} value={color} onChange={onColorChange}/>),
    [pColors, color, onColorChange]
  );

  /* 결과 반환 */
  return (
    <section className="mt-4 ml-4">
      <Title>성별</Title>
      <div className="flex flex-col p-4">
        {genderRadioInputs}
      </div>

      <Title>퍼스널컬러 정보</Title>
      {/* <div className="flex flex-col mt-4">
        <Subtitle>Selected: {selectedColor}</Subtitle>
      </div> */}
      <div className="flex flex-col p-4">
        {colorRadioInputs}
      </div>
    </section>
  )
}

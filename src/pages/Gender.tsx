import {useMemo, useCallback} from 'react'
import type {ChangeEvent} from 'react'
import {Title} from '../components'
import RadioInput from '../components/RadioInput'

type props = {gender: string; setGender: React.Dispatch<React.SetStateAction<string>>}
export default function Gender({gender, setGender}: props) {
  /* 성별 배열 설정 */
  const genders = useMemo(() => ['남자', '여자'], [])

  const onGenderChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setGender(e.target.value)
    },
    [setGender]
  )

  /* 성별 버튼 생성 */
  const genderRadioInputs = useMemo(
    () =>
      genders.map((label, index) => (
        <RadioInput
          key={index}
          group="gender"
          label={label}
          value={gender}
          onChange={onGenderChange}
        />
      )),
    [gender, genders, onGenderChange]
  )

  /* 결과 반환 */
  return (
    <section className="mt-8 ml-5">
      <Title>Step 1. 성별</Title>
      <div className="flex flex-col p-4 mt-3">{genderRadioInputs}</div>
    </section>
  )
}

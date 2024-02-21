import type {ChangeEvent, DragEvent} from 'react'
import {useState, useRef, useCallback, useMemo} from 'react'
import {useToggle} from '../hooks'
import {Title, Div, Subtitle} from '../components'
import {imageFileReaderP} from '../utils'
import axios from 'axios'

type filesState = {files: File[]; setFiles: React.Dispatch<React.SetStateAction<File[]>>}

export default function MyImages({files, setFiles}: filesState) {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const onDivClick = useCallback(() => inputRef.current?.click(), [])

  // 이미지를 업로드할 때 호출
  const uploadImage = async (imageFile: File) => {
    const formData = new FormData()
    formData.append('image', imageFile)
    // console.log(imageFile)
    try {
      const response = await axios.post('/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // 멀티파트 폼 데이터로 전송
        }
      })

      // 서버로부터의 응답 처리
      console.log(response.data.message)
      console.log('완ㅋ')
      console.log(response.data)
      // makeImageUrls([imageFile])
    } catch (error) {
      // 오류 처리
      console.error(error)
    }
  }

  // 이미지를 업로드할 때 호출하는 함수
  const onImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const input_files = Array.from(e.target.files!)

    if (input_files.length + files.length > 9) {
      setError(new Error('이미지는 최대 9개까지만 추가할 수 있습니다!'))
    } else {
      setError(null)

      // add urls
      const promises = input_files.map(imageFileReaderP)
      setLoading(true)
      Promise.all(promises)
        .then(urls => {
          setImageUrls(prevImageUrls => [...prevImageUrls, ...urls])
          setFiles(prevFiles => [...prevFiles, ...input_files])
          setLoading(false)
        })
        .catch(setError)
        .finally(() => setLoading(false))
    }
    e.target.value = ''
  }

  /* 이미지 업로드 취소 기능 추가하기 */
  const onCacelClick = useCallback(
    (url: string) => {
      for (let i = 0; i < imageUrls.length; i++) {
        if (url === imageUrls[i]) {
          setImageUrls(prevImageUrls => [
            ...prevImageUrls.slice(0, i),
            ...prevImageUrls.slice(i + 1)
          ])
          setFiles(prevFiles => [...prevFiles.slice(0, i), ...prevFiles.slice(i + 1)])
        }
      }
      setError(null)
    },
    [imageUrls]
  )

  /* 이미지 파일 화면에 나타내기 (취소 버튼 있는 ver.) */
  const images = useMemo(
    () =>
      imageUrls.map((url, index) => (
        <div key={index} className="relative m-2 mt-6">
          {/* 이미지 파일 태그 */}
          <Div
            src={url}
            className="bg-transparent bg-center bg-no-repeat bg-contain"
            width="9rem"
            height="9rem"
          />
          {/* 취소 버튼 태그 */}
          <button
            className="absolute top-0 right-0 text-white bg-red-500 rounded-full"
            style={{width: '1.0rem', height: '1.0rem', fontSize: '0.65rem'}}
            onClick={() => onCacelClick(url)}>
            X
          </button>
        </div>
      )),
    [imageUrls, onCacelClick]
  )

  return (
    <section className="mt-4">
      <div className="ml-4">
        <Title>당신의 사진</Title>
        <Subtitle>(최대 9개까지 넣을 수 있어용)</Subtitle>
        {error && (
          <div className="flex items-center justify-center p-4 mt-4 mr-4 bg-red-200">
            <p className="text-base text-red-500 text-bold">{error.message}</p>
          </div>
        )}

        <div
          onClick={onDivClick}
          className="w-full mt-6 ml-4 bg-gray-300 border border-gray-500 rounded-md"
          style={{width: '10rem', height: '2rem'}}>
          {loading && (
            <div className="flex items-center justify-center">
              <button className="btn btn-circle loading"></button>
            </div>
          )}

          <div className="flex flex-col items-center h-40 mt-1 cursor-pointer">
            <p className="text-sm">이미지 파일 가져오기</p>
          </div>
          <input
            ref={inputRef}
            onChange={onImageUpload}
            multiple
            className="hidden"
            type="file"
            accept="image/*"
            name="image"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-6 mr-4">{images}</div>
    </section>
  )
}

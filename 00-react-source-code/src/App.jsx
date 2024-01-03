import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import generator from 'generate-password-browser'

function App() {
  const passwordLengthInputId = useId()
  const numberInputId = useId()
  const specialCharInputId = useId()
  // const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(8)
  const [includeNumber, setIncludeNumber] = useState(false)
  const [includeSpecialChar, setIncludeSpecialChar] = useState(false)

  // const newPassword = useMemo(() => {
  const password = useMemo(() => {
    return generator.generate({
      length: passwordLength,
      numbers: includeNumber,
      symbols: includeSpecialChar,
      strict: true,
      excludeSimilarCharacters: true,
    })
    // }, [passwordLength, includeNumber, includeSpecialChar, setPassword])
  }, [passwordLength, includeNumber, includeSpecialChar])

  const handleCopyPassword = useCallback(async () => {
    await navigator.clipboard.writeText(password)
  }, [password])

  // useEffect(() => {
  //   setPassword(() => newPassword())
  // }, [newPassword])

  return (
    <main className="min-h-screen bg-black flex justify-center">
      <div className="bg-slate-800 h-fit mt-32 p-5 flex flex-col gap-4 rounded-lg font-serif text-white">
        <section className="relative">
          <input
            type="text"
            className="w-full py-1 ps-2 rounded-md text-black select-none"
            value={password}
            readOnly
          />
          <button
            className="bg-blue-600 px-2 py-1 absolute right-0 rounded-e-md hover:bg-blue-800"
            type="button"
            onClick={handleCopyPassword}
          >
            copy
          </button>
        </section>
        <section className="flex gap-3 items-center text-red-400 flex-wrap">
          <div className="flex gap-2">
            <label htmlFor={passwordLengthInputId}>
              Length: {passwordLength}
            </label>
            <input
              className="cursor-grab"
              type="range"
              min={8}
              max={50}
              defaultValue={8}
              id={passwordLengthInputId}
              onInput={e => setPasswordLength(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <input
              className="cursor-pointer"
              type="checkbox"
              id={numberInputId}
              onInput={() => {
                setIncludeNumber(prev => !prev)
              }}
            />
            <label htmlFor={numberInputId}>Number</label>
          </div>
          <div className="flex gap-1">
            <input
              className="cursor-pointer"
              type="checkbox"
              id={specialCharInputId}
              onInput={() => {
                setIncludeSpecialChar(prev => !prev)
              }}
            />
            <label htmlFor={specialCharInputId}>Special Characters</label>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App

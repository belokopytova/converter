import { type ChangeEvent, useState } from 'react'

function ColorConverter() {
  const [hex, setHex] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('#9921ff')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const HEX_REGEX = /^#[0-9a-f]{6}$/i

  const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setHex(value)

    if (value === '') {
      setError(false)
      setErrorMessage('')
      return
    }

    if (!value.startsWith('#')) {
      setError(true)
      setErrorMessage('Должен начинаться с #')
      return
    }

    if (value.length < 7) {
      setError(true)
      setErrorMessage('Не хватает символов')
      return
    }

    if (!HEX_REGEX.test(value)) {
      setError(true)
      setErrorMessage('Неправильные символы')
      return
    }

    setBackgroundColor(value)
    setError(false)
    setErrorMessage('')
  }

  const displayText = error ? errorMessage : hex.length > 0 ? hexToRgb(hex) : hexToRgb(backgroundColor)

  return (
    <div className="app" style={{ backgroundColor }}>
      <label className="container">
        <input
          type="text"
          className="input-field"
          value={hex}
          onChange={handleChange}
          maxLength={7}
          placeholder="Введите HEX-код"
        />
        <span className={`result ${error ? 'error' : ''}`}>{displayText}</span>
      </label>
    </div>
  )
}

export default ColorConverter
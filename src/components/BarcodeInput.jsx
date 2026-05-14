import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

const BarcodeInput = forwardRef(function BarcodeInput({ onScan }, ref) {
  const inputRef = useRef()
  const [mode, setMode] = useState('out')

  useImperativeHandle(ref, () => ({ focusInput: () => inputRef.current?.focus() }))

  function submit(e) {
    e.preventDefault()
    const sku = inputRef.current.value.trim()
    if (!sku) return
    const delta = mode === 'in' ? 1 : -1
    onScan(sku, delta)
    inputRef.current.value = ''
  }

  return (
    <form className="barcode" onSubmit={submit} style={{display:'flex',alignItems:'center',gap:8}}>
      <select value={mode} onChange={e=>setMode(e.target.value)} title="Mode">
        <option value="out">Out</option>
        <option value="in">In</option>
      </select>
      <input ref={inputRef} placeholder="Scan SKU (press b)" className="barcode-input" />
      <button type="submit">Apply</button>
    </form>
  )
})

export default BarcodeInput

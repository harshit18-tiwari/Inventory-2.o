import React from 'react'

export default function Confirm({ title='Confirm', message='', onConfirm, onCancel }) {
  return (
    <div className="modal">
      <div className="confirm">
        <h3>{title}</h3>
        <p>{message}</p>
        <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm} style={{background:'#e53e3e',color:'#fff'}}>Delete</button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export default function ProductDetail({ product, onClose, onAdjust, onEdit }) {
  if (!product) return null
  return (
    <div className="drawer">
      <div className="drawer-inner">
        <button className="close" onClick={onClose}>×</button>
        <h3>{product.name}</h3>
        <p><strong>SKU:</strong> {product.sku}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ${product.price?.toFixed(2)}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button onClick={()=>onAdjust(1)}>+1</button>
          <button onClick={()=>onAdjust(-1)}>-1</button>
          <button onClick={onEdit}>Edit</button>
        </div>
      </div>
    </div>
  )
}

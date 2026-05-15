export function formatINR(amount = 0, { compact = true, decimals = 1 } = {}){
  if (typeof amount !== 'number') amount = Number(amount) || 0
  try{
    if(compact){
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', notation: 'compact', maximumFractionDigits: decimals }).format(amount)
    }
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
  }catch(e){
    // fallback
    const rounded = compact ? (amount/1000).toFixed(decimals) + 'k' : Math.round(amount).toString()
    return `₹${rounded}`
  }
}

export default formatINR

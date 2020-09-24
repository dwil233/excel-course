export function capitalize(strToCap) {
  if (typeof strToCap !== 'string') {
    throw new Error(`String to capitalize has to be string but it's $(typeof strToCap)`)
  }
  return strToCap[0].toUpperCase() + strToCap.substr(1)
}

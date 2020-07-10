const add0 = (m) => {
  return m < 10 ? '0' + m : m
}
const format = (timestamps) => {
  const time = new Date(parseInt(timestamps) * 1000)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  return [ `${y}`, add0(m) + '-' + add0(d) ]
}
export default format

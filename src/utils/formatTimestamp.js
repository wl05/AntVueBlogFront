const add0 = (m) => {
  return m < 10 ? '0' + m : m
}
const format = (timestamps, short = true) => {
  const time = new Date(parseInt(timestamps) * 1000)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  const h = time.getHours()
  const mm = time.getMinutes()
  const s = time.getSeconds()
  if (short) {
    return `${y}-${add0(m)}-${add0(d)}`
  } else {
    return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`
  }
}
export default format

const getImgUrl = (url) => {
  const img = require(`@/assets/${url}`)
  return img
}

export default getImgUrl

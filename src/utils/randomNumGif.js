//生成从minNum到maxNum的随机数
export function randomGifNum(minNum = 1, maxNum = 17) {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}
// const num = randomNum(1, 24)
export function randomGifNumImg(num) {
    const img = require(`@/assets/active/${num}.gif`)
    return img
}
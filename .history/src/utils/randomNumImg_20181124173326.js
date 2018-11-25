//生成从minNum到maxNum的随机数
export function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}


const num = randomNum(1, 24)

export function randomNumImg() {

}
const img = require(`@/assets/${num}.jpg`)
const background = {
    background: `url(${img}) no-repeat`,
    backgroundSize: '100vw 100vh',
    backgroundAttachment: 'fixed'
}
export default background
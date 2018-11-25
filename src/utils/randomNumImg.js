//生成从minNum到maxNum的随机数
export function randomNum(minNum = 1, maxNum = 28) {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}


// const num = randomNum(1, 24)

export function randomNumImg(num) {
    const img = require(`@/assets/${num}.jpg`)
    const background = {
        background: `url(${img}) no-repeat`,
        backgroundSize: '100vw 100vh',
        backgroundAttachment: 'fixed'
    }
    return background
}

// export default background
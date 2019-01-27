//生成从minNum到maxNum的随机数
export function randomNum (minNum = 1, maxNum = 50) {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

// const num = randomNum(1, 24)

export function randomNumImg (num) {
    const img = require(`@/assets/bgs/${num}.jpg`)
    const background = {
        background : `url(${img}) no-repeat`,
        backgroundSize : 'cover',
        backgroundAttachment : 'fixed',
        backgroundColor : '#fff'
    }
    return background
}

// export default background

export function host(url) {
    const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    const parts = host.split('.').slice(-3)
    if (parts[0] === 'www') parts.shift()
    return parts.join('.')
}

export function timeAgo(time) {
    const add0 = m => {
        return m < 10 ? '0' + m : m
    }
    const format = timestamps => {
        const time = new Date(parseInt(timestamps / 1000))
        const y = time.getFullYear()
        const m = time.getMonth() + 1
        const d = time.getDate()
        let week = time.getDay()
        switch (week) {
            case 0:
                week = '日'
                break
            case 1:
                week = '一'
                break
            case 2:
                week = '二'
                break
            case 3:
                week = '三'
                break
            case 4:
                week = '四'
                break
            case 5:
                week = '五'
                break
            case 6:
                week = '六'
                break
        }
        return `${y}年 ${add0(m)}月 ${add0(d)}日, 星期${week}`
    }
    const between = Date.now() / 1000 - Number(time / 1000)
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute') + 'ago'
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour') + 'ago'
    } else {
        return format(time * 1000)
        // return pluralize(~~(between / 86400), ' day')
    }
}

function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}

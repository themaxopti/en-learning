export const delay = (time: number) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(true)
        }, time)
    })
}
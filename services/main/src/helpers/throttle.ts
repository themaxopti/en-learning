// export function throttle(func: any, delay: number) {
//   let lastCall = 0
//   return function (...args: any[]) {
//     const now = new Date().getTime()
//     setTimeout(() => {
//       if (now - lastCall >= delay) {
//         lastCall = now
//         func.apply(this, args)
//       }
//     }, delay)
//   }
// }

export function throttle(func: any, delay: number) {
  let timeout: any
  return function (...args: any[]) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), delay)
  }
}

function testInput(str: string) {
  if (str.search(/[А-яЁё]/) != -1) {
    // console.log(true)
    return true
  } else {
    // console.log(false)
    return false
  }
}

export function convertStrToArray(
  str: string
): { word: string; translate: string }[] | false {
  function checkIsRowSpace(gap: string) {
    const gapStr = gap.split('\n').filter(item => item)
    if (gapStr.length > 1) {
      return true
    }
    return false
  }

  const isRowSpace = checkIsRowSpace(str)

  const rusWords: string[] = []
  const enWords: string[] = []
  const wordTranslate: [{ word: string; translate: string }] = [] as any
  let isError = false

  if (isRowSpace) {
    const splittedStr = str.split('\n').filter(elem => elem)
    splittedStr.forEach(el => {
      if (testInput(el)) {
        rusWords.push(el.trim())
      } else {
        enWords.push(el.trim())
      }
    })

    enWords.forEach((el, i) => {
      wordTranslate.push({ word: el, translate: rusWords[i] })
    })
  } else {
    const splittedStr = str.split(' ').filter(elem => elem)
    let isDashMode = false

    splittedStr.forEach((el, i) => {
      if (i === 0) {
        if (el.includes('-')) {
          isDashMode = true
        }
      }

      if (isDashMode) {
        if (!el.includes('-')) {
          isError = true
          return
        }
        const [word, translate] = el.split('-')
        enWords.push(word)
        rusWords.push(translate)
      } else {
        if (el.includes('-')) {
          isError = true
        }

        if (i % 2 === 0) {
          enWords.push(el.trim())
        } else {
          rusWords.push(el.trim())
        }
      }

      //   console.log(enWords, rusWords)
    })

    enWords.forEach((el, i) => {
      if (rusWords[i] === undefined) {
        isError = true
      }
    //   debugger
      wordTranslate.push({ word: el, translate: rusWords[i] })
    })
  }

  if (isError) {
    return false
  }

  return wordTranslate
}

import { WordType } from "../state/dictionary.reducer";
import { v4 as uuidv4 } from 'uuid';

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
): { title: string; translate: string }[] | false {
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
  const wordTranslate: [{ title: string; translate: string }] = [] as any
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
      wordTranslate.push({ title: el, translate: rusWords[i] })
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
      wordTranslate.push({ title: el, translate: rusWords[i] })
    })
  }

  if (isError) {
    return false
  }

  return wordTranslate
}


export function handleUuidWord(word: string) {
  const wordParts = word.split(' ')
  const newWordParts = []
  for (let i = 0; i < wordParts.length; i++) {
    const element = wordParts[i];
    if (i !== wordParts.length - 1) {
      newWordParts.push(element)
    }
  }
  return newWordParts.join(' ')
}

export function changedIndexesHelper(arr: WordType[]) {
  const changedIndexes: any[] = []

  const arrayWithChangedIndexes = [...arr].map((el, i) => {
    // console.log(el);
    
    if (i === 0) {
      if (el.index !== 1) {
        changedIndexes.push({ title: el.title, id: el.id, indexWillBe: 1 })
      }
      el.index = 1
      return el
    }
    const previousWord = arr[i - 1]

    if (el.index - previousWord.index !== 1) {
      console.log(el.index,previousWord.index);
      
      changedIndexes.push({ title: el.title, id: el.id, indexWillBe: previousWord.index + 1 })
      // console.log(changedIndexes, 'changedIndexes');
    }

    el.index = previousWord.index + 1

    return el
  })

  return { arrayWithChangedIndexes, changedIndexes }
}

export function sortWordsByIndex (words: WordType[]){
  return words.sort((a,b) => {
    return a.index - b.index
  })
}

export function makeUuidWords (words: WordType[]){
  return words.map((word) => {
    return {...word,title:`${word.title} ${uuidv4()}`}
  })
}
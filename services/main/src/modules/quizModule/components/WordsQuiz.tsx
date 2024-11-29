import React, { useCallback, useRef, useState, useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
import s from '../quiz.module.scss'
import { useSelector } from 'react-redux'
import {
  quizCurrentWordIndexSelector,
  quizFinishedSelector,
  quizIsCorrectAnswerSelector,
  quizIsErrorInWordSelector,
  quizModeSelector,
  quizWordsSelector,
  randomModeSelector,
} from '../state/quiz.selectors'
import {
  changeRandomMode,
  checkWord,
  countWordIndex,
  QuizModes,
  QuizWord,
  resetCurrentQuiz,
} from '../state/quiz.reducer'
import { useDispatch } from 'react-redux'
import { checInputkWordSaga_A_C, checkWordSaga_A_C } from '../state/quiz.sagas'
import { throttle } from '@/helpers/throttle'
import { useNavigate } from 'react-router-dom'

interface WordsQuizProps {
  words: QuizWord[]
  currentWordIndex: number
  isErrorInWord: boolean
  quizIsCorrectAnswer: boolean
  quizFinished: boolean
  quizMode: QuizModes[]
  handleInput: any
  inputValue: string
  setInputValue: any
  randomMode: number
}
// interface WordsQuizContainerProps {}

export const WordsQuizContainer: React.FC = () => {
  const quizWords = useSelector(quizWordsSelector)
  const currentWordIndex = useSelector(quizCurrentWordIndexSelector)
  const isErrorInWord = useSelector(quizIsErrorInWordSelector)
  const quizIsCorrectAnswer = useSelector(quizIsCorrectAnswerSelector)
  const quizFinished = useSelector(quizFinishedSelector)
  const quizMode = useSelector(quizModeSelector)
  const randomMode = useSelector(randomModeSelector)

  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState<string>('')

  const throttledHandler = useRef(null)

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(checInputkWordSaga_A_C(e.target.value))
  }

  const memoHandleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleInput(e)
    },
    []
  )

  if (!throttledHandler.current) {
    throttledHandler.current = throttle(memoHandleInput, 500)
  }

  useEffect(() => {
    if (quizIsCorrectAnswer) {
      setTimeout(() => {
        setInputValue('')
      }, 1000)
    }
  }, [quizIsCorrectAnswer])

  useEffect(() => {
    dispatch(changeRandomMode({}))
  }, [currentWordIndex])

  useEffect(() => {
    console.log(randomMode)
  }, [randomMode])

  return (
    <>
      {quizWords?.length === 0 && (
        <Box>Add words in quiz in some dictionary</Box>
      )}
      {quizWords?.length > 0 && (
        <WordsQuiz
          randomMode={randomMode}
          handleInput={throttledHandler.current}
          quizFinished={quizFinished}
          quizIsCorrectAnswer={quizIsCorrectAnswer}
          isErrorInWord={isErrorInWord}
          currentWordIndex={currentWordIndex}
          words={quizWords}
          quizMode={quizMode}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}
    </>
  )
}

export const WordsQuiz: React.FC<WordsQuizProps> = ({
  words,
  currentWordIndex,
  isErrorInWord,
  quizIsCorrectAnswer,
  quizFinished,
  quizMode,
  handleInput,
  inputValue,
  setInputValue,
  randomMode,
}) => {
  console.log('render')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <Box className={s['quiz-control__slider']}>
        <Box
          sx={{
            display: !quizFinished ? 'none' : 'flex',
            rowGap: '20px',
          }}
          className={s['quiz-control__slider__container']}
        >
          <Box>Your quiz is finished</Box>
          <Button onClick={() => dispatch(resetCurrentQuiz({}))}>replay</Button>
          <Button onClick={() => navigate('/quizzes')}>Back to quizzes</Button>
        </Box>
        <Box
          sx={{
            borderColor: isErrorInWord
              ? 'red'
              : quizIsCorrectAnswer
                ? '#00BFD5'
                : '#CED0DB',
            display: quizFinished ? 'none' : 'flex',
          }}
          className={s['quiz-control__slider__container']}
        >
          <Box className={s['quiz-control__word']}>
            <Box>{words[currentWordIndex].word}</Box>
            <Box>
              {quizIsCorrectAnswer ? (
                words[currentWordIndex].translate
              ) : (
                <Skeleton variant="text" width={100} height={30} />
              )}
            </Box>
          </Box>

          {quizMode.includes('choose') && !quizMode.includes('write') && (
            <QuizCheckVariant
              currentWordIndex={currentWordIndex}
              words={words}
            />
          )}

          {!quizMode.includes('choose') && quizMode.includes('write') && (
            <QuizWriteVariant
              handleInput={handleInput}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          )}

          {quizMode.includes('choose') &&
            quizMode.includes('write') &&
            (randomMode === 1 ? (
              <QuizWriteVariant
                handleInput={handleInput}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            ) : randomMode === 0 ? (
              <QuizCheckVariant
                currentWordIndex={currentWordIndex}
                words={words}
              />
            ) : (
              ''
            ))}
        </Box>
      </Box>
    </>
  )
}

const QuizCheckVariant = ({
  words,
  currentWordIndex,
}: {
  words: QuizWord[]
  currentWordIndex: number
}) => {
  const dispatch = useDispatch()

  return (
    <Box className={s['quiz-control__variants']}>
      {words[currentWordIndex].variants.map((el, i) => {
        return (
          <Box
            key={i}
            onClick={() => {
              dispatch(checkWordSaga_A_C(el))
            }}
          >
            <Typography variant="body1" className={s['quiz__sliced__text']}>
              {el}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

const QuizWriteVariant = ({
  handleInput,
  setInputValue,
  inputValue,
}: {
  setInputValue: any
  handleInput: any
  inputValue: string
}) => {
  const dispatch = useDispatch()
  return (
    <Box className={s['quiz-field-input']} sx={{}}>
      <TextField
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value)
          handleInput(e)
        }}
        placeholder="write your variant"
        sx={{ maxWidth: '250px', width: '100%' }}
        size="small"
        variant="standard"
      />
      <Button onClick={() => dispatch(countWordIndex({}))}>
        I do not know
      </Button>
    </Box>
  )
}

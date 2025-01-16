import { useContext, useEffect, useState } from 'react'
import QuizContext from '../QuizContext'

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5)
}

const Question = ({ question, setIsAnswered, isAnswered }) => {
  const [selectedOption, setSelectedOption] = useState('')

  const [score, scoreDispatch, options, optionsDispatch] = useContext(QuizContext)

  useEffect(() => {
    const shuffledOptions = shuffle([
      question.correct_answer,
      ...question.incorrect_answers,
    ])
    optionsDispatch({
      type: 'SET_OPTIONS',
      payload: shuffledOptions,
    })
  }, [question])

  const selectOption = (opt) => {
    setSelectedOption(opt)
    if (opt === question.correct_answer) {
      scoreDispatch({
        type: 'SET_SCORE',
        payload: score + 1,
      })
    }
    setIsAnswered(true)
  }

  const displayedOptions = options
  return (
    <div>
      <div>
        <div className="fs-4 fw-bold lead">
          <div dangerouslySetInnerHTML={{ __html: question.question }} />
        </div>
        <div className="list-group my-3">
          {isAnswered
            ? displayedOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                className={`quiz-button-after list-group-item-action my-3 rounded-pill disabled ${
                  opt === question.correct_answer && 'border border-success  border-4 text-black'
                } ${
                  opt === selectedOption &&
                    opt !== question.correct_answer &&
                    'border border-danger border-4 text-black'
                }`}
                disabled
                onClick={() => selectOption(opt)}
              >
                <div dangerouslySetInnerHTML={{ __html: opt }} />
              </button>
            ))
            : displayedOptions.map((opt, i) => (
              <button
                key={i}
                type="button"
                className="quiz-button list-group-item-action my-3 rounded-pill"
                onClick={() => selectOption(opt)}
              >
                <div dangerouslySetInnerHTML={{ __html: opt }} />
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Question
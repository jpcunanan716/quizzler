import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { categories, difficulty } from '../requests'

const Menu = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    category: '',
    difficulty: '',
  })

  const selectCategory = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const selectDifficulty = (value) => {
    setFormData((prev) => ({
      ...prev,
      difficulty: value,
    }))
  }

  const startQuiz = (event) => {
    event.preventDefault()
    // Navigate to the quiz page with the selected category and difficulty
    navigate(`/quiz/${formData.category}/${formData.difficulty}/`)
  }

  return (
    <div className="menu-container d-flex flex-column align-items-center justify-content-center">
      <Form
        className="form-content my-2 d-flex flex-column align-items-center justify-content-center p-3"
        onSubmit={startQuiz}
      >
        <div className="overlay p-3 w-50">
          <div>
            <div className="h3 my-3">Select Category</div>
            {categories.map((cat) => (
              <div
                key={cat.value}
                onClick={() => selectCategory(cat.value)}
                className={`category-option p-2 my-2 text-center ${
                  formData.category === cat.value ? 'bg-success text-white' : ''
                }`}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              >
                {cat.label}
              </div>
            ))}
          </div>

          <div>
            <div className="h3 my-3">Select Difficulty</div>
            {difficulty.map((option) => (
              <div
                key={option}
                onClick={() => selectDifficulty(option)}
                className={`difficulty-option p-2 my-2 text-center ${
                  formData.difficulty === option ? 'bg-success text-white' : ''
                }`}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              >
                {option}
              </div>
            ))}
          </div>

          <button
            className={`btn btn-primary w-100 my-3 ${
              formData.category === '' || formData.difficulty === '' ? 'disabled' : ''
            }`}
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  )
}

export default Menu

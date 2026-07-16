import { questions } from './questions'
import { questionBank2 } from './questionBank2'
import { questionBank3 } from './questionBank3'
import { questionBank4 } from './questionBank4'
import { questionBank5 } from './questionBank5'
import { questionBank6 } from './questionBank6'
import { questionBank7 } from './questionBank7'
import { questionBank8 } from './questionBank8'

export const allQuestions = [
  ...questions,
  ...questionBank2,
  ...questionBank3,
  ...questionBank4,
  ...questionBank5,
  ...questionBank6,
  ...questionBank7,
  ...questionBank8,
]

export function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generateExam(examNumber = 0) {
  const shuffled = shuffleArray(allQuestions)
  return shuffled.slice(0, 65)
}

export const totalQuestionCount = allQuestions.length
export const possibleExams = Math.floor(allQuestions.length / 65)

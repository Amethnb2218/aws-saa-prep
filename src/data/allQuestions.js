import { questions } from './questions'
import { questionBank2 } from './questionBank2'
import { questionBank3 } from './questionBank3'
import { questionBank4 } from './questionBank4'
import { questionBank5 } from './questionBank5'
import { questionBank6 } from './questionBank6'
import { questionBank7 } from './questionBank7'
import { questionBank8 } from './questionBank8'
import { questionBank9 } from './questionBank9'
import { questionBank10 } from './questionBank10'
import { questionBank11 } from './questionBank11'
import { questionBank12 } from './questionBank12'
import { questionBank13 } from './questionBank13'
import { questionBank14 } from './questionBank14'
import { questionBank15 } from './questionBank15'
import { questionBank16 } from './questionBank16'
import { questionBank17 } from './questionBank17'
import { questionBank18 } from './questionBank18'
import { questionBank19 } from './questionBank19'
import { questionBank20 } from './questionBank20'
import { questionBank21 } from './questionBank21'
import { questionBank22 } from './questionBank22'
import { questionBank23 } from './questionBank23'
import { questionBank24 } from './questionBank24'

export const allQuestions = [
  ...questions,
  ...questionBank2,
  ...questionBank3,
  ...questionBank4,
  ...questionBank5,
  ...questionBank6,
  ...questionBank7,
  ...questionBank8,
  ...questionBank9,
  ...questionBank10,
  ...questionBank11,
  ...questionBank12,
  ...questionBank13,
  ...questionBank14,
  ...questionBank15,
  ...questionBank16,
  ...questionBank17,
  ...questionBank18,
  ...questionBank19,
  ...questionBank20,
  ...questionBank21,
  ...questionBank22,
  ...questionBank23,
  ...questionBank24,
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

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store/RootStore';
import { QuizQuestion } from './QuizApi';
import { shuffleArray } from '../../utils/shuffleArray';
import { AnswerOption } from './QuizQuestion';

export type QuizState = 'answering' | 'answered' | 'submitted';

export interface ActiveQuizQuestion {
    id: number;
    question: string;
    answerOptions: AnswerOption[];
    correctAnswer: string;
}

interface ActiveQuizSliceState {
    state: QuizState;
    questions: ActiveQuizQuestion[];
}

const initialState = {
    state: 'answering',
    questions: [],
} as ActiveQuizSliceState satisfies ActiveQuizSliceState;

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        createQuiz: (state, action: PayloadAction<QuizQuestion[]>) => {
            state.state = 'answering';
            state.questions = action.payload.map((question) => ({
                id: question.id,
                question: question.questionSentence,
                correctAnswer: question.correctAnswer,
                answerOptions: shuffleArray(
                    [question.correctAnswer, ...question.incorrectAnswers].map(
                        (a) => ({ value: a, isSelected: false } satisfies AnswerOption)
                    )
                ),
                selectedAnswer: undefined,
            }));
        },
        answerQuestion: (state, action: PayloadAction<{ id: number; answer: string }>) => {
            const questionAnswer = action.payload;
            const found = state.questions.find((question) => question.id === questionAnswer.id);
            if (found) {
                found.answerOptions = found.answerOptions.map((answerOption) =>
                    answerOption.value === questionAnswer.answer
                        ? { ...answerOption, isSelected: true }
                        : { ...answerOption, isSelected: false }
                );
            } else {
                console.warn(`Tried to answer question ${questionAnswer} that does not exist`);
            }
            const allQuestionsAnswered = state.questions.every((question) =>
                question.answerOptions.some((answerOption) => answerOption.isSelected)
            );
            if (allQuestionsAnswered) {
                state.state = 'answered';
            }
        },
        removeQuiz: (state) => {
            state.state = 'answering';
            state.questions = [];
        },
        submitQuiz: (state) => {
            state.state = 'submitted';
        },
    },
});

export const { createQuiz, answerQuestion, removeQuiz, submitQuiz } = quizSlice.actions;
export const { reducer: quizReducer } = quizSlice;

export const selectQuiz = (state: RootState) => state.quiz;

import { useState } from 'react';
import { Stack } from '@mui/material';

import QuizHeader from './QuizHeader';
import { mapApiQuizResponseBodyToQuiz, useQuizQuestions } from './QuizApi';
import { useAppDispatch, useAppSelector } from '../../store/RootStore';
import { createQuiz, selectQuiz } from './QuizStore';
import ActiveQuiz from './ActiveQuiz';

export type QuizDifficulty = 'easy' | 'medium' | 'hard';

const Quiz = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
    const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | undefined>(undefined);

    const { fetchQuizQuestions, isQuizLoading, quizFetchingError } = useQuizQuestions(
        selectedCategoryId,
        selectedDifficulty
    );

    const quiz = useAppSelector(selectQuiz);
    const dispatch = useAppDispatch();

    return (
        <Stack>
            <QuizHeader
                selectedCategoryId={selectedCategoryId}
                selectedDifficulty={selectedDifficulty}
                onSelectedCategoryId={setSelectedCategoryId}
                onSelectedDifficulty={setSelectedDifficulty}
                onCreate={async () => {
                    const apiQuizQuestionResponsBody = await fetchQuizQuestions();
                    const newQuiz = mapApiQuizResponseBodyToQuiz(apiQuizQuestionResponsBody);
                    dispatch(createQuiz(newQuiz));
                }}
            />
            {isQuizLoading ? (
                <h3>Loading..</h3>
            ) : quizFetchingError ? (
                <h3>Please wait a few seconds before you create a new question</h3>
            ) : quiz.questions.length > 0 ? (
                <ActiveQuiz />
            ) : (
                <h3>No quiz created yet..</h3>
            )}
        </Stack>
    );
};

export default Quiz;

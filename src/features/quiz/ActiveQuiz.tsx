import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';

import QuizQuestion from './QuizQuestion';
import { useAppDispatch, useAppSelector } from '../../store/RootStore';
import { submitQuiz, selectQuiz } from './QuizStore';

const ActiveQuiz = () => {
    const { questions, state } = useAppSelector(selectQuiz);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            <Stack>
                <Box>
                    {questions.map((q) => (
                        <QuizQuestion key={q.id} question={q} showResults={false} />
                    ))}
                </Box>
            </Stack>
            <Button
                sx={{
                    marginTop: '10px',
                    visibility: state === 'submitted' || state !== 'answered' ? 'hidden' : 'initial',
                }}
                variant={'outlined'}
                onClick={() => {
                    dispatch(submitQuiz());
                    navigate('/quiz/results');
                }}
            >
                Submit
            </Button>
        </>
    );
};

export default ActiveQuiz;

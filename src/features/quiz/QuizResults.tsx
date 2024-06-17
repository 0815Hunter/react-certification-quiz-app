import { Button, Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/RootStore';
import { removeQuiz, selectQuiz } from './QuizStore';
import QuizQuestion from './QuizQuestion';

const QuizResults = () => {
    const { questions } = useAppSelector(selectQuiz);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const score = questions.filter((q) =>
        q.answerOptions.some((a) => a.value === q.correctAnswer && a.isSelected)
    ).length;

    return (
        <>
            <Typography variant={'h3'}>Quiz Results</Typography>
            <Divider />
            {questions.map((q) => (
                <QuizQuestion key={q.id} question={q} showResults={true} />
            ))}
            <Stack marginTop={'30px'} spacing="20px">
                <Typography
                    sx={{
                        backgroundColor: score <= 1 ? 'red' : score <= 2 ? 'yellow' : 'green',
                    }}
                >
                    You scored {score} out of {questions.length}
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => {
                        dispatch(removeQuiz());
                        navigate('/quiz');
                    }}
                >
                    Create a new Quiz
                </Button>
            </Stack>
        </>
    );
};

export default QuizResults;

import Typography from '@mui/material/Typography';
import { Button, Grid, Stack, SxProps, Theme } from '@mui/material';

import { useAppDispatch } from '../../store/RootStore';
import { ActiveQuizQuestion, answerQuestion } from './QuizStore.ts';

export interface QuizQuestionProps {
    question: ActiveQuizQuestion;
    showResults: boolean;
}

export interface AnswerOption {
    value: string;
    isSelected: boolean;
}

const QuizQuestion = ({ question: { id, question, answerOptions, correctAnswer }, showResults }: QuizQuestionProps) => {
    const dispatch = useAppDispatch();

    return (
        <Stack>
            <Typography variant="h4">{question}</Typography>
            <Grid container spacing={0.5} justifyContent={'center'} alignItems={'center'}>
                {answerOptions.map((answerOption) => {
                    const isCorrectAnswer = answerOption.value === correctAnswer;
                    return (
                        <Grid item key={answerOption.value}>
                            <Button
                                disabled={showResults || answerOption.isSelected}
                                variant={'outlined'}
                                color={answerOption.isSelected ? 'success' : 'primary'}
                                sx={createQuizAnswerButtonStyle(showResults, answerOption.isSelected, isCorrectAnswer)}
                                onClick={() => {
                                    dispatch(answerQuestion({ id, answer: answerOption.value }));
                                }}
                            >
                                {answerOption.value}
                            </Button>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};

function createQuizAnswerButtonStyle(
    showResults: boolean,
    isSelected: boolean,
    isCorrectAnswer: boolean
): SxProps<Theme> | undefined {
    return showResults && isSelected && !isCorrectAnswer
        ? {
              '&.Mui-disabled': {
                  backgroundColor: 'red',
                  color: 'white',
              },
          }
        : showResults && isCorrectAnswer
        ? {
              '&.Mui-disabled': {
                  backgroundColor: 'green',
                  color: 'white',
              },
          }
        : !showResults && isSelected
        ? {
              '&.Mui-disabled': {
                  backgroundColor: 'green',
                  color: 'white',
              },
          }
        : !showResults && !isSelected
        ? {
              '&:hover': {
                  backgroundColor: 'green',
                  color: 'white',
              },
          }
        : undefined;
}

export default QuizQuestion;

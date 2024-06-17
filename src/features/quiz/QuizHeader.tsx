import { Button, Grid, Stack, Typography } from '@mui/material';

import { useQuizCategories } from './QuizApi';
import { QuizDifficulty } from './Quiz';
import DropdownSelection from '../../lib/DropdownSelection';

export interface QuizHeaderProps {
    selectedCategoryId: number | undefined;
    selectedDifficulty: string | undefined;
    onSelectedCategoryId: (categoriy: number | undefined) => void;
    onSelectedDifficulty: (difficulty: QuizDifficulty | undefined) => void;
    onCreate: () => void;
}

const QuizHeader = ({
    selectedCategoryId,
    selectedDifficulty,
    onSelectedCategoryId,
    onSelectedDifficulty,
    onCreate,
}: QuizHeaderProps) => {
    const { quizCategories, fetchQuizCategoriesError } = useQuizCategories();

    return (
        <Stack>
            <Typography variant="h3" gutterBottom>
                Quiz Maker
            </Typography>
            <Grid container alignItems={'center'}>
                {quizCategories !== undefined ? (
                    <Grid item xs={12} md={5}>
                        <DropdownSelection
                            id="categorySelect"
                            options={quizCategories.map((qc) => {
                                return { label: qc.name, value: qc.id };
                            })}
                            label={'Category'}
                            onSelected={onSelectedCategoryId}
                        />
                    </Grid>
                ) : fetchQuizCategoriesError ? (
                    <Grid item xs={12} md={5}>
                        <Typography>Error</Typography>
                    </Grid>
                ) : (
                    <Grid item xs={12} md={5}>
                        <Typography>Loading..</Typography>
                    </Grid>
                )}
                <Grid item xs={12} md={5}>
                    <DropdownSelection
                        id="difficultySelect"
                        options={[
                            { label: 'Easy', value: 'easy' },
                            { label: 'Medium', value: 'medium' },
                            { label: 'Hard', value: 'hard' },
                        ]}
                        label={'Difficulty'}
                        onSelected={onSelectedDifficulty}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        id="createBtn"
                        variant="contained"
                        disabled={!selectedCategoryId || !selectedDifficulty}
                        onClick={onCreate}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default QuizHeader;

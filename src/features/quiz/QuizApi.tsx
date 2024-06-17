import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { fetcher, mutateFetcher } from '../../api/fetcher.ts';
import QuizQuestion from './QuizQuestion.tsx';
import { decodeHtmlEntitiesByBrowser } from '../../utils/decodeHtml.ts';
import { QuizDifficulty } from './Quiz.tsx';

interface TriviaCategories {
    trivia_categories: TriviaCategory[];
}

interface TriviaCategory {
    id: number;
    name: string;
}

type QuizCategory = TriviaCategory;

const quizApiBase = 'https://opentdb.com/';

const questionApiEndpoint = quizApiBase + '/api.php';
const questionCategoryEndpoint = quizApiBase + '/api_category.php';

export const useQuizCategories = () => {
    const { data, error, isLoading } = useSWR<TriviaCategories>(questionCategoryEndpoint, fetcher);

    const quizCategories: QuizCategory[] | undefined = data ? [...data.trivia_categories] : undefined;

    return {
        quizCategories,
        fetchQuizCategoriesError: error,
        isQuizCategoriesLoading: isLoading,
    };
};

interface ApiQuizQuestionResponseBody {
    response_code: number;
    results: ApiQuizQuestion[];
}

interface ApiQuizQuestion {
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface QuizQuestion {
    id: number;
    questionSentence: string;
    correctAnswer: string;
    incorrectAnswers: string[];
}

export const useQuizQuestions = (categoryId: number | undefined, difficulty: QuizDifficulty | undefined) => {
    const {
        data: apiQuizQuestionResponsBody,
        trigger: fetchQuizQuestions,
        isMutating: isQuizLoading,
        error: quizFetchingError,
    } = useSWRMutation<ApiQuizQuestionResponseBody>(
        categoryId && difficulty ? createQuestionRequest(categoryId, difficulty) : null,
        mutateFetcher
    );

    const responseAwailable = apiQuizQuestionResponsBody?.response_code === 0;

    return {
        quizQuestions: responseAwailable ? mapApiQuizResponseBodyToQuiz(apiQuizQuestionResponsBody) : undefined,
        fetchQuizQuestions,
        isQuizLoading,
        quizFetchingError,
    };
};

const createQuestionRequest = (categoryId: number, difficulty: QuizDifficulty) =>
    `${questionApiEndpoint}?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

export const mapApiQuizResponseBodyToQuiz = (apiQuizQuestionResponsBody: ApiQuizQuestionResponseBody) => {
    let questionId = 0;

    const quizQuestions: QuizQuestion[] = apiQuizQuestionResponsBody.results.map(
        (aq) =>
            ({
                id: questionId++,
                questionSentence: decodeHtmlEntitiesByBrowser(aq.question),
                correctAnswer: decodeHtmlEntitiesByBrowser(aq.correct_answer),
                incorrectAnswers: aq.incorrect_answers.map((ia) => decodeHtmlEntitiesByBrowser(ia)),
            } satisfies QuizQuestion)
    );

    return quizQuestions;
};

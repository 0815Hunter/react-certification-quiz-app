import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';
import App from './App.tsx';
import { rootStore } from './store/RootStore.ts';
import Quiz from './features/quiz/Quiz.tsx';
import QuizResults from './features/quiz/QuizResults.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'quiz',
                element: <Quiz />,
            },
            {
                path: 'quiz/results',
                element: <QuizResults />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={rootStore}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

import { useRoutes } from 'react-router-dom';
import HomePage from "../component/HomePage.tsx";
import NewspaperDetailPage from "../pages/NewspaperDetailLPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import MultimediaPage from "../pages/MultimediaPage.tsx";
import CategoryPage from "../pages/CategoryPage.tsx";
import SearchPage from "../pages/SearchPage.tsx";
import PredictPage from "../pages/PredictPage.tsx";
import SavedArticlesPage from '@/pages/SavedArticlesPage.tsx';

function AppRouter() {
     return useRoutes([
        {
            path: '/',
            element: <HomePage />,
        },
        {
            path: '/newspaperDetail/:id',
            element: <NewspaperDetailPage />,
        },
         {
             path: "/login",
             element: <LoginPage/>
         },
         {
             path:"/register",
             element:<RegisterPage/>
         },
        {
            path: '/multimedia',
            element: <MultimediaPage />,
        },
        {
            path: '/search',
            element: <SearchPage />,
        },
        {
            path: '/:slug', 
            element: <CategoryPage />,
        },
         {
             path: 'match/predict/:matchId',
             element: <PredictPage />,
         } ,
         {
            path:"/saved-articles",
            element:<SavedArticlesPage/>
         },
        {
            path: '*',
            element: <div style={{ padding: "20px" }}>Trang không tồn tại (404)</div>,
        }
    ]);
}

export default AppRouter;
import { useRoutes } from 'react-router-dom';
import HomePage from "../component/HomePage.tsx";
import NewspaperDetailPage from "../pages/NewspaperDetailLPage.tsx";

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
            path: '*',
            element: <div style={{ padding: "20px" }}>Trang không tồn tại (404)</div>,
        }
    ]);
}

export default AppRouter;
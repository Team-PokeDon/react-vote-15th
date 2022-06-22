import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import RequireAuth from './components/auth/RequireAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VotePage from './pages/VotePage';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import Main from './pages/Main';
import ResultPage from './pages/ResultPage';
import Test from './pages/Test';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="test" element={<Test />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/result/:part" element={<ResultPage />} />
        {/* private */}
        <Route element={<RequireAuth />}>
          <Route path="/vote/:part" element={<VotePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;

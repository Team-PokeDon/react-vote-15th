import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import RequireAuth from './components/auth/RequireAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VotePage from './pages/VotePage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import Main from './pages/Main';
import ResultPage from './pages/ResultPage';
import PersistLogin from './components/auth/PersistLogin';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PersistLogin />}>
          <Route index element={<Main />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/result/:partParam" element={<ResultPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/vote/:partParam" element={<VotePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

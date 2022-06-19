import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import RequireAuth from './components/auth/RequireAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FEVotePage from './pages/FEVotePage';
import BEVotePage from './pages/BEVotePage';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        {/* private */}
        <Route element={<RequireAuth allowedPart={'FE'} />}>
          <Route path="/vote/frontend" element={<FEVotePage />} />
        </Route>
        <Route element={<RequireAuth allowedPart={'BE'} />}>
          <Route path="/vote/backend" element={<BEVotePage />} />
        </Route>
      </Route>
      {/* catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import MainPage from './pages/Main';
// import Home from './pages/Home';
// import My from './pages/My';
// import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

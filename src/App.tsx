import './styles/App.scss';
import { FC } from 'react';
import CameraPage from './pages/CameraPage';
import { Route, Routes } from 'react-router-dom';

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<CameraPage />} />
        </Routes>
    );
};

export default App;

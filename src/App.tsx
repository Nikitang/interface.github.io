import './styles/App.scss';
import { FC } from 'react';
import CameraPage from './pages/CameraPage';
import { Route, Routes } from 'react-router-dom';
import LoadMenu from './pages/LoadMenu';

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<CameraPage />} />
            <Route path="/success" element={<LoadMenu />} />
        </Routes>
    );
};

export default App;

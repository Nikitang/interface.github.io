import logo from './logo.svg';
import './styles/App.scss';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChoozePage from './pages/ChoozePage';
import CameraPage from './pages/CameraPage';

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<CameraPage />} />
            {/* <Route path="/camera" element={<CameraPage />} /> */}
        </Routes>
    );
};

export default App;

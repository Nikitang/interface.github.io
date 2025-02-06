import logo from './logo.svg';
import './styles/App.scss';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import CameraPage from './pages/CameraPage';

const App: FC = () => {
    return <CameraPage />;
};

export default App;

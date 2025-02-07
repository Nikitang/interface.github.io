import { FC } from 'react';

import Camera from '../../components/Camera';
import styles from './CameraPage.module.css';
import arrowBack from '../../assets/images/goBack.png';
import rightHand from '../../assets/images/hand-r.png';
import { Link } from 'react-router-dom';
const CameraPage: FC = () => {
    return (
        <div className={styles.root}>
            {/* <Link to={'/'} className={styles.back}>
                <img className={styles.arrowBack} src={arrowBack} alt="" />
                <span>Вернуться к выбору</span>
                <img className={styles.rightHand} src={rightHand} alt="" />
            </Link> */}
            <Camera />
        </div>
    );
};

export default CameraPage;

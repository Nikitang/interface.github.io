import React from 'react';
import styles from './LoadMenu.module.css';
import { Link } from 'react-router-dom';

import back from '../../assets/svg/ArrowBack.svg';

const LoadMenu = () => {
    return (
        <div className={styles.menu}>
            <div className={styles.txt}>
                <span>Запрос в обработке...</span>
            </div>
            <div className={styles.img}>
                <span>Вернуться на главную</span>
                <Link className={styles.link} to={'/'}>
                    <img src={back} alt="" />
                </Link>
            </div>
        </div>
    );
};

export default LoadMenu;

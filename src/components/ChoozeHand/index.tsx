import { FC } from 'react';

import styles from './ChoozeHand.module.scss';
import Camera from '../Camera';

import rightH from '../../assets/images/hand-r.png';
import { Link } from 'react-router-dom';

const ChoozeHand: FC = () => {
    return (
        <div className={styles.choozer}>
            <Link to={'/camera'} className={styles.leftHand}>
                <img src={rightH} alt="" />
                <span>Левая рука</span>
            </Link>

            {/* <Camera changeState={setOpen} /> */}

            <Link to={'/camera'} className={styles.rightHand}>
                <img src={rightH} alt="" />
                <span>Правая рука</span>
            </Link>
        </div>
    );
};

export default ChoozeHand;

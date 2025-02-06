import React, { useRef, useEffect, useState, FC } from 'react';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import { AnnotatedPrediction, HandPose } from '@tensorflow-models/handpose';
import { Link } from 'react-router-dom';

import styles from './Camera.module.scss';
import hand from '../../assets/images/left-hand.png';
import arrowBack from '../../assets/svg/ArrowBack.svg';
import { checkMove } from '../../utils/checkMove';

const Camera: FC = () => {
    const webcamRef = useRef<Webcam>(null);
    const [isHandDetected, setIsHandDetected] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [showButton, setShowButton] = useState(false);
    // const detectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const previousKeypointsRef = useRef<{ x: number; y: number }[] | null>(null);

    useEffect(() => {
        const runHandpose = async () => {
            await tf.setBackend('webgl');
            const net = await handpose.load();
            setInterval(() => {
                detect(net);
            }, 100);
        };

        runHandpose();
    }, []);

    const detect = async (net: HandPose) => {
        if (
            webcamRef.current &&
            webcamRef.current.video &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            video.width = videoWidth;
            video.height = videoHeight;

            const hands = await net.estimateHands(video);
            if (hands.length > 0) {
                setIsHandDetected(true);

                const currentKeypoints = hands[0].landmarks.map((kp) => ({ x: kp[0], y: kp[1] }));
                if (previousKeypointsRef.current) {
                    const movement = checkMove(previousKeypointsRef.current, currentKeypoints);
                    if (movement < 50) {
                        setShowButton(true);
                    }
                }
                previousKeypointsRef.current = currentKeypoints;
            } else {
                setIsHandDetected(false);
                setShowButton(false);
            }
        }
    };

    const captureScreenshot = () => {
        if (webcamRef.current) {
            const screenshot = webcamRef.current.getScreenshot();
            setScreenshot(screenshot);
            setIsScanning(true);
        }

        setTimeout(() => {
            setIsScanning(false);
        }, 4000);
    };

    console.log(showButton);

    return (
        <div className={styles.camera}>
            <Link className={styles.arrowBack} to={'/'}>
                <img src={arrowBack} alt="" />
            </Link>
            <h1>Хиромантия</h1>
            <span className={styles.description}>
                Узнайте тайны о своей будущей жизни. Сфотографируйте свою руку, чтобы узнать больше
            </span>
            <div className={styles.video}>
                {!isScanning ? (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        videoConstraints={{
                            width: { ideal: 900 },
                            height: { ideal: 1200 },
                            facingMode: 'environment',
                        }}
                        className={styles.videoCam}
                    />
                ) : (
                    screenshot && (
                        <img src={screenshot} alt="Скриншот" className={styles.screenshot} />
                    )
                )}
                {isScanning && <div className={styles.scanningLine}></div>}
                <div className={styles.hangLogo}>
                    <img src={hand} alt="Трафарет" />
                </div>
            </div>

            {isHandDetected ? <span>Рука обнаружена.</span> : <span>Рука не обнаружена.</span>}
            {showButton && (
                <button className={styles.screenBtn} onClick={captureScreenshot}>
                    Начать проверку
                </button>
            )}
        </div>
    );
};

export default Camera;

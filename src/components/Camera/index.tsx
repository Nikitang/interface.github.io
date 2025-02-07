import React, { useRef, useEffect, useState, FC } from 'react';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import * as tf from '@tensorflow/tfjs';
import { AnnotatedPrediction, HandPose } from '@tensorflow-models/handpose';
import gsap from 'gsap';

import styles from './Camera.module.css';
import hand from '../../assets/svg/l-hand.svg';
import arrowBack from '../../assets/svg/ArrowBack.svg';
import { checkMove } from '../../utils/checkMove';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';

const Camera: FC = () => {
    const navigate = useNavigate();

    const webcamRef = useRef<Webcam>(null);
    const [isHandDetected, setIsHandDetected] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [cameraError, setCameraError] = useState(false);
    const [videoWidth, setVideoWidth] = useState<number>(0);
    const [scanSuccess, setScanSuccess] = useState(false);
    // const detectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const previousKeypointsRef = useRef<{ x: number; y: number }[] | null>(null);

    useEffect(() => {
        if (isScanning) {
            gsap.to(`.${styles.scanningLine}`, {
                y: -260, // Длина линии вниз
                duration: 1,
                ease: 'power1.inOut',
                yoyo: true,
                repeat: -1, // Бесконечное повторение
            });
        }
    }, [isScanning]);

    useEffect(() => {
        const runHandpose = async () => {
            await tf.setBackend('webgl');
            const net = await handpose.load();
            const inter = setInterval(() => {
                detect(net);
            }, 100);
            console.log(111);

            return () => clearInterval(inter);
        };

        runHandpose();
    }, []);

    useEffect(() => {
        const checkVideoWidth = () => {
            if (webcamRef.current && webcamRef.current.video) {
                const width = webcamRef.current.video.videoWidth;
                setVideoWidth(width);
            }
        };
        console.log('check-handpose');

        const interval = setInterval(checkVideoWidth, 100); // Проверяем каждые 100 мс

        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, []);

    const detect = async (net: HandPose) => {
        if (
            webcamRef.current &&
            webcamRef.current.video &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            // const videoHeight = webcamRef.current.video.videoHeight;

            video.width = videoWidth;
            // video.height = videoHeight;

            const hands = await net.estimateHands(video);
            if (hands.length > 0) {
                setIsHandDetected(true);
                setShowButton(true);
                const currentKeypoints = hands[0].landmarks.map((kp) => ({ x: kp[0], y: kp[1] }));
                // if (previousKeypointsRef.current) {
                //     const movement = checkMove(previousKeypointsRef.current, currentKeypoints);
                //         setShowButton(true);

                // }
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
            setTimeout(() => {
                setScanSuccess(true);
            }, 2500);
        }

        setTimeout(() => {
            navigate('/success');
            setIsScanning(false);
        }, 4000);
    };

    const handleUserMediaError = () => {
        setCameraError(true);
    };

    console.log(webcamRef.current?.video);

    return (
        <div className={styles.camera}>
            <Link to={'/'} className={styles.arrowBack}>
                <img src={arrowBack} alt="" />
            </Link>
            <h1>Хиромантия</h1>
            <span className={styles.description}>
                Узнайте тайны о своей будущей жизни. Сфотографируйте свою руку, чтобы узнать больше
            </span>
            <div className={styles.video}>
                {!isScanning ? (
                    !cameraError ? (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/png"
                            forceScreenshotSourceSize={false}
                            videoConstraints={{
                                width: { ideal: 900 },
                                height: { ideal: 1200 },
                                facingMode: 'environment',
                            }}
                            className={styles.videoCam}
                            onUserMediaError={handleUserMediaError}
                        />
                    ) : (
                        <div className={styles.cameraError}>
                            <span>
                                Ошибка доступа к камере. Пожалуйста, предоставьте доступ к камере
                                или проверьте подключение.
                            </span>
                        </div>
                    )
                ) : (
                    screenshot && (
                        <img src={screenshot} alt="Скриншот" className={styles.screenshot} />
                    )
                )}
                {isScanning && <div className={styles.scanningLine}></div>}
                {!cameraError && videoWidth > 50 && (
                    <div className={styles.hangLogo}>
                        <img src={hand} alt="" />
                    </div>
                )}
            </div>

            {/* {isHandDetected ? <span>Рука обнаружена.</span> : <span>Рука не обнаружена.</span>} */}

            {showButton && !cameraError && !isScanning && (
                <button className={styles.screenBtn} onClick={captureScreenshot}>
                    Начать проверку
                </button>
            )}

            {scanSuccess && <Modal />}
        </div>
    );
};

export default Camera;

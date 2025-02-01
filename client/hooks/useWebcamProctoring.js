import * as cocossd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-cpu'; // Add CPU backend import
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import { useEffect, useRef, useState } from 'react';

export function useWebcamProctor() {
    const [isDetecting, setIsDetecting] = useState(false);
    const [alert, setAlert] = useState([]);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const detectionInterval = useRef(null);

    // Initialize TensorFlow backends
    useEffect(() => {
        const setupTF = async () => {
            // Register both backends
            await tf.ready();
            // Set WebGL as the default backend
            await tf.setBackend('webgl');
        };
        setupTF();

        // Cleanup interval on unmount
        return () => {
            if (detectionInterval.current) {
                clearInterval(detectionInterval.current);
            }
        };
    }, []);

    // Main detection function
    const runCoco = async () => {
        try {
            const net = await cocossd.load();
            setIsDetecting(true);
            detectionInterval.current = setInterval(() => {
                detect(net);
            }, 100); // Increased interval to reduce load
        } catch (error) {
            console.error("Error starting detection:", error);
            setIsDetecting(false);
        }
    };

    // Detection loop
    const detect = async (net) => {
        const newAlerts=[];
        if (
            typeof webcamRef.current !== 'undefined' &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            try {
                const video = webcamRef.current.video;
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;

                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;

                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;

                const objects = await net.detect(video);
                
                // Count people and check for phones
                const peopleCount = objects.filter(obj => obj.class === 'person').length;
                const hasPhone = objects.some(obj => obj.class === 'cell phone');

                // Log only if there are 2+ people or a phone is detected
                if (peopleCount >= 2) {
                    newAlerts.push('Multiple persons detected - Exam terminated!');
                }
                if(hasPhone){
                    newAlerts.push('Phone detected - Exam terminated!');
                }
                setAlert(newAlerts);

                const ctx = canvasRef.current.getContext('2d');
                ctx.clearRect(0, 0, videoWidth, videoHeight); // Clear previous drawings
                ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

                // Draw detected objects
                objects.forEach(object => {
                    const [x, y, width, height] = object.bbox;
                    ctx.strokeStyle = (object.class === 'cell phone' || 
                                     (object.class === 'person' && peopleCount >= 2)) 
                                     ? '#FF0000' 
                                     : '#00FF00';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x, y, width, height);
                    ctx.fillStyle = ctx.strokeStyle;
                    ctx.font = '16px Arial';
                    ctx.fillText(
                        `${object.class} ${Math.round(object.score * 100)}%`,
                        x,
                        y > 10 ? y - 5 : 10
                    );
                });
            } catch (error) {
                console.error("Error during detection:", error);
            }
        }
    };

    return {
        alert,
        isDetecting,
        webcamRef,
        canvasRef,
        startDetection: runCoco
    };
}
"use client"
import { ICONS } from '@/constants'
import { useScreenRecording } from '@/lib/hooks/useScreenRecording'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

const ScreenRecorder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const router = useRouter();

    const {
        resetRecording,
        recordedBlob,
        isRecording,
        recordedVideoUrl,
        recordingDuration,
        startRecording,
        stopRecording,
    } = useScreenRecording();

    const handleClose = () => {
        resetRecording();
        setIsOpen(false);
    }

    const handleStart = async () => {
        await startRecording();
    }

    const recordAgain = async () => {
        resetRecording();
        await startRecording();

        if (recordedVideoUrl && videoRef.current) {
            videoRef.current.src = recordedVideoUrl;
        }
    }

    return (
        <div className="record">
            <button
                title='record'
                className='primary-btn'
                onClick={() => setIsOpen(true)}
            >
                <Image src={ICONS.record} alt='record' width={16} height={16} />
                <span>Record a video</span>
            </button>

            {
                isOpen && (
                    <section className='dialog'>
                        <div className="overlay-record" onClick={handleClose}>
                            <div className="dialog-content">
                                <figure>
                                    <h3>Screen Recording</h3>
                                    <button onClick={handleClose}>
                                        <Image src={ICONS.close} alt='close' width={20} height={20} />
                                    </button>
                                </figure>
                                <section>
                                    {
                                        isRecording ? (
                                            <article>
                                                <div />
                                                <span>Recording in progress</span>
                                            </article>
                                        ) : recordedVideoUrl ? (
                                            <video ref={videoRef} controls />
                                        ) : (
                                            <p>Click record to start capturing your screen</p>
                                        )
                                    }
                                </section>
                                <div className="record-box">
                                    {!isRecording && !recordedVideoUrl && (
                                        <button onClick={handleStart} className='record-start'>
                                            <Image src={ICONS.record} alt='record' width={16} height={16} />
                                            Record
                                        </button>
                                    )}
                                    {
                                        isRecording && (
                                            <button onClick={stopRecording} className='record-stop'>
                                                <Image src={ICONS.record} alt='record' width={16} height={16} />
                                                Stop recording
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </div>
    )
}

export default ScreenRecorder
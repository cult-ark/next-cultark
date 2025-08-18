'use client'

import { useRef, useEffect } from "react";

const BackgroundVideo = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            // Try to load and play the video
            const loadVideo = async () => {
                try {
                    // Set poster as fallback
                    video.poster = "/images/videoframe_0.png";

                    // Preload video
                    await video.load();

                    // Try to play
                    const playPromise = video.play();

                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("Video autoplay prevented:", error);
                            // Autoplay failed, but video is still loaded and shown
                            // The poster will remain displayed
                        });
                    }
                } catch (error) {
                    console.error("Error loading video:", error);
                }
            };

            loadVideo();
        }
    }, []);

    return (
        <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full z-0
                object-cover object-center animate-fade-in"
            src="/images/OriginalVideo.mp4"
            poster="/images/videoframe_0.png"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
        />
    );
};

export default BackgroundVideo;
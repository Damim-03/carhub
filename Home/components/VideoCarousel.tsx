import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { SyntheticEvent, useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../../constants/constant";
import { pauseImg, playImg, replayImg } from "../../Utils";
import React from "react";

const VideoCarousel = () => {
    const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
    const videoDivRef = useRef<(HTMLDivElement | null)[]>([]);

  // video and indicator
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const handleSpanClick = (index: number) => {
    if (videoRef.current[video.videoId]) {
      // Pause the currently playing video before switching
      videoRef.current[video.videoId].pause();
      videoRef.current[video.videoId].currentTime = 0;

      gsap.to(videoRef.current[video.videoId], {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setVideo((prev) => ({
            ...prev,
            videoId: index,
            isPlaying: true,
            startPlay: true,
          }));

          gsap.to(videoRef.current[index], {
            opacity: 1,
            duration: 0.5,
          });

          // Play the newly selected video
          videoRef.current[index].play();
        },
      });
    }
  };


  const [loadedData, setLoadedData] = useState<SyntheticEvent<HTMLVideoElement, Event>[]>([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut", // show visualizer https://gsap.com/docs/v3/Eases
    });

    // video animation to play the video when it is in the view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);


  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // vd id is the id for every video until id becomes number 3
  const handleProcess = (type: string, i?: number) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: (i ?? 0) + 1, isPlaying: false }));
        break;

      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true, isPlaying: false }));

        // Reset span indicators when all videos complete
        videoSpanRef.current.forEach((span, idx) => {
          gsap.to(span, { width: "0%", backgroundColor: "#afafaf" });
          gsap.to(videoDivRef.current[idx], { width: "12px" });
        });
        break;

      case "video-reset":
        setVideo((prev) => ({
          ...prev,
          videoId: 0,
          isLastVideo: false,
          isPlaying: true,
          startPlay: true,
        }));

        // Restart first video
        if (videoRef.current[0]) {
          videoRef.current[0].currentTime = 0;
          videoRef.current[0].play();
          gsap.to(videoRef.current[0], { opacity: 1, duration: 0.5 });
        }

        // Reset span indicators
        videoSpanRef.current.forEach((span, idx) => {
          gsap.to(span, { width: "0%", backgroundColor: "#afafaf" });
          gsap.to(videoDivRef.current[idx], { width: "12px" });
        });
        break;

      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: false }));
        videoRef.current[video.videoId]?.pause();
        break;

      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: true }));
        videoRef.current[video.videoId]?.play();
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i: number, e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setLoadedData((prev) => [...prev, e]);
  };

  return (
      <>
        <div className="flex items-center">
          {hightlightsSlides.map((list, i) => (
              <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                <div className="video-carousel_container">
                  <div className="w-full h-full flex-center rounded-2xl overflow-hidden bg-black">
                    <video
                        id="video"
                        playsInline
                        className={list.id === 2 ? "translate-x-50 pointer-events-none" : "pointer-events-none"}
                        preload="auto"
                        muted
                        ref={(el) => {
                          if (el) videoRef.current[i] = el;
                        }}
                        onEnded={() =>
                            i !== 3
                                ? handleProcess("video-end", i)
                                : handleProcess("video-last", i)
                        }
                        onPlay={() => setVideo((prev) => ({ ...prev, isPlaying: true }))}
                        onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                    >
                      <source src={list.video} type="video/mp4" />
                    </video>
                  </div>

                  <div id="text" className="absolute top-12 left-[5%] z-10">
                    {list.textLists.map((text, i) => (
                        <p key={i} className="md:text-2xl text-xl font-medium text-white">
                          {text}
                        </p>
                    ))}
                  </div>
                </div>
              </div>
          ))}
        </div>

        <div className="relative flex-center mt-10">
          <div className="flex-center py-5 px-7 bg-gray-400 backdrop-blur rounded-full dark:bg-gray-700">
            {hightlightsSlides.map((_, i) => (
                <span
                    key={i}
                    className="mx-2 w-3 h-3 rounded-full bg-gray-300 relative cursor-pointer"
                    ref={(el) => {
                      if (el) videoDivRef.current[i] = el;
                    }}
                    onClick={() => handleSpanClick(i)}
                >
              <span
                  className="absolute h-full w-full rounded-full"
                  ref={(el) => {
                    if (el) videoSpanRef.current[i] = el;
                  }}
              />
            </span>
            ))}
          </div>

          <button className="control-btn">
            <img
                src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                onClick={
                  isLastVideo
                      ? () => handleProcess("video-reset")
                      : !isPlaying
                          ? () => handleProcess("play")
                          : () => handleProcess("pause")
                }
            />
          </button>
        </div>
      </>
  );
};

export default VideoCarousel;
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../../constants/constant";
import { pauseImg, playImg, replayImg } from "../../Utils";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLDivElement | null)[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<SyntheticEvent<HTMLVideoElement, Event>[]>([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // Keep track of animation instances for cleanup
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const animUpdateRef = useRef<() => void>();

  const handleSpanClick = (index: number) => {
    const currentVideo = videoRef.current[video.videoId];
    const nextVideo = videoRef.current[index];

    if (!currentVideo || !nextVideo) return;

    // Pause the currently playing video before switching
    currentVideo.pause();
    currentVideo.currentTime = 0;

    gsap.to(currentVideo, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          videoId: index,
          isPlaying: true,
          startPlay: true,
        }));

        gsap.to(nextVideo, {
          opacity: 1,
          duration: 0.5,
        });

        // Play the newly selected video
        nextVideo.play().catch(error => {
          console.error("Video play failed:", error);
        });
      },
    });
  };

  useGSAP(() => {
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
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
    let anim: gsap.core.Tween;
    const span = videoSpanRef.current[videoId];
    const videoElement = videoRef.current[videoId];

    if (span && videoElement) {
      // animation to move the indicator
      anim = gsap.to(span, {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

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
          gsap.to(span, {
            width: `${progress}%`,
            backgroundColor: "white",
          });
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span, {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        if (videoElement && hightlightsSlides[videoId]) {
          anim.progress(
              videoElement.currentTime / hightlightsSlides[videoId].videoDuration
          );
        }
      };

      animUpdateRef.current = animUpdate;

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      }

      return () => {
        if (anim) anim.kill();
        gsap.ticker.remove(animUpdate);
      };
    }
  }, [videoId, startPlay, isPlaying]);

  useEffect(() => {
    const currentVideo = videoRef.current[videoId];
    if (loadedData.length > 3 && currentVideo) {
      if (!isPlaying) {
        currentVideo.pause();
      } else if (startPlay) {
        currentVideo.play().catch(error => {
          console.error("Video play failed:", error);
        });
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (animUpdateRef.current) {
        gsap.ticker.remove(animUpdateRef.current);
      }
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  const handleProcess = (type: string, i?: number) => {
    switch (type) {
      case "video-end":
        setVideo((prev) => ({
          ...prev,
          isEnd: true,
          videoId: (i ?? 0) + 1,
          isPlaying: false
        }));
        break;

      case "video-last":
        setVideo((prev) => ({
          ...prev,
          isLastVideo: true,
          isPlaying: false
        }));

        videoSpanRef.current.forEach((span, idx) => {
          if (span) {
            gsap.to(span, {
              width: "0%",
              backgroundColor: "#afafaf"
            });
          }
          if (videoDivRef.current[idx]) {
            gsap.to(videoDivRef.current[idx], {
              width: "12px"
            });
          }
        });
        break;

      case "video-reset":
      {
        const firstVideo = videoRef.current[0];
        if (firstVideo) {
          firstVideo.currentTime = 0;
          firstVideo.play().catch(error => {
            console.error("Video play failed:", error);
          });
          gsap.to(firstVideo, {
            opacity: 1,
            duration: 0.5
          });
        }

        setVideo({
          videoId: 0,
          isLastVideo: false,
          isPlaying: true,
          startPlay: true,
          isEnd: false,
        });

        videoSpanRef.current.forEach((span, idx) => {
          if (span) {
            gsap.to(span, {
              width: "0%",
              backgroundColor: "#afafaf"
            });
          }
          if (videoDivRef.current[idx]) {
            gsap.to(videoDivRef.current[idx], {
              width: "12px"
            });
          }
        });
        break;
      }

      case "pause":
      {
        const currentVideo = videoRef.current[video.videoId];
        if (currentVideo) {
          currentVideo.pause();
        }
        setVideo((prev) => ({
          ...prev,
          isPlaying: false
        }));
        break;
      }

      case "play":
      {
        const currentVideo = videoRef.current[video.videoId];
        if (currentVideo) {
          currentVideo.play().catch(error => {
            console.error("Video play failed:", error);
          });
        }
        setVideo((prev) => ({
          ...prev,
          isPlaying: true
        }));
        break;
      }

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (_i: number, e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
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
                        className={
                          list.id === 2
                              ? "translate-x-50 pointer-events-none"
                              : "pointer-events-none"
                        }
                        preload="auto"
                        muted
                        ref={(el) => {
                          videoRef.current[i] = el;
                        }}
                        onEnded={() =>
                            i !== 3
                                ? handleProcess("video-end", i)
                                : handleProcess("video-last", i)
                        }
                        onPlay={() =>
                            setVideo((prev) => ({
                              ...prev,
                              isPlaying: true
                            }))
                        }
                        onPause={() =>
                            setVideo((prev) => ({
                              ...prev,
                              isPlaying: false
                            }))
                        }
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
                <div
                    key={i}
                    className="mx-2 w-3 h-3 rounded-full bg-gray-300 relative cursor-pointer"
                    ref={(el) => {
                      videoDivRef.current[i] = el;
                    }}
                    onClick={() => handleSpanClick(i)}
                >
              <span
                  className="absolute h-full w-full rounded-full"
                  ref={(el) => {
                    videoSpanRef.current[i] = el;
                  }}
              />
                </div>
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
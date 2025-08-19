import { useState, useEffect } from "react";
import PlayIcon from "../../icons/PlayIcon.png";
import "./FeaturedVideo.css";

const FeaturedVideo = ({ video, isPlaying, onPlayClick }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (isMobile) {
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }

    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes} minutes`;
  };

  const getTruncatedDescription = (description) => {
    if (!description) return "";

    const maxLength = isMobile ? 120 : isTablet ? 200 : 300;

    if (description.length <= maxLength) return description;

    return description.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="featured-video">
      {isPlaying ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="featured-background-video"
          src={video.VideoUrl}
          onError={(e) => console.error("Video failed to load:", e)}
        />
      ) : (
        <div
          className="featured-background"
          style={{
            backgroundImage: `url(${video.CoverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          role="img"
          aria-label={video.Title}
        />
      )}

      <div className="featured-overlay" />
      <div className="featured-content">
        <div className="video-info">
          <div className="video-category">{video.Category}</div>

          {video.TitleImage ? (
            <img
              className="video-title-image"
              src={video.TitleImage}
              alt={video.Title}
              loading="lazy"
            />
          ) : (
            <h1 className="video-title-text">{video.Title}</h1>
          )}

          <div className="video-details">
            <span className="release-year">{video.ReleaseYear}</span>
            <span className="detail-separator">•</span>
            <span className="mpa-rating">{video.MpaRating}</span>
            <span className="detail-separator">•</span>
            <span className="duration">{formatDuration(video.Duration)}</span>
          </div>

          <p className="video-description">
            {getTruncatedDescription(video.Description)}
          </p>
        </div>

        <div className="video-actions">
          <button
            className="play-button"
            onClick={onPlayClick}
            aria-label="Play video"
          >
            <img src={PlayIcon} alt="" className="play-icon" />
            <span>Play</span>
          </button>
          <button className="more-info-button" aria-label="More information">
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideo;

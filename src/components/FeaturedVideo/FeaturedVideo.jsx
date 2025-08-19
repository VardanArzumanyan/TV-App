import PlayIcon from "../../icons/PlayIcon.png";

import "./FeaturedVideo.css";

const FeaturedVideo = ({ video, isPlaying, onPlayClick }) => {
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="featured-video">
      {isPlaying ? (
        <video
          autoPlay
          muted
          className="featured-background-video"
          src={video.VideoUrl}
        />
      ) : (
        <div className="featured-background">
          <img
            src={video.CoverImage}
            alt={video.Title}
            className="featured-background-image"
          />
        </div>
      )}

      <div className="featured-content">
        <div className="video-category">{video.Category}</div>
        <img className="video-title" src={video.TitleImage} alt={video.Title} />
        <div className="video-details">
          <span className="release-year">{video.ReleaseYear}</span>
          <span className="mpa-rating">{video.MpaRating}</span>
          <span className="duration">{formatDuration(video.Duration)}</span>
        </div>
        <p className="video-description">{video.Description}</p>
        <div className="video-actions">
          <button className="play-button" onClick={onPlayClick}>
            <img src={PlayIcon} alt="Play Icon" className="play-icon" />
            Play
          </button>
          <button className="more-info-button">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideo;

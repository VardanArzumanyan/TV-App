import { useState, useEffect } from "react";
import Menu from "./components/Menu/Menu";
import FeaturedVideo from "./components/FeaturedVideo/FeaturedVideo";
import TrendingNow from "./components/TrendingNow/TrendingNow";
import data from "../data/data.json";
import "./App.css";

function App() {
  const [featuredVideo, setFeaturedVideo] = useState(data.Featured);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sortedVideos = [...data.TendingNow]
      .sort((a, b) => new Date(b.Date) - new Date(a.Date))
      .slice(0, 50);

    const viewedVideos = JSON.parse(
      sessionStorage.getItem("viewedVideos") || "[]"
    );

    if (viewedVideos.length > 0) {
      const viewedIds = viewedVideos.map((v) => v.Id);
      const viewed = sortedVideos.filter((v) => viewedIds.includes(v.Id));
      const notViewed = sortedVideos.filter((v) => !viewedIds.includes(v.Id));

      setTrendingVideos([...viewed, ...notViewed]);
    } else {
      setTrendingVideos(sortedVideos);
    }
  }, []);

  const handleVideoClick = (video) => {
    setFeaturedVideo(video);
    setIsPlaying(false);

    setTimeout(() => {
      setIsPlaying(true);
    }, 2000);

    const viewedVideos = JSON.parse(
      sessionStorage.getItem("viewedVideos") || "[]"
    );

    const filtered = viewedVideos.filter((v) => v.Id !== video.Id);

    sessionStorage.setItem(
      "viewedVideos",
      JSON.stringify([video, ...filtered])
    );
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleMenuToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div className="app">
      <Menu onToggle={handleMenuToggle} />

      <div className={`main-content ${isMenuOpen ? "content-dimmed" : ""}`}>
        <FeaturedVideo
          video={featuredVideo}
          isPlaying={isPlaying}
          onPlayClick={handlePlayClick}
        />

        <TrendingNow videos={trendingVideos} onVideoClick={handleVideoClick} />
      </div>
    </div>
  );
}

export default App;

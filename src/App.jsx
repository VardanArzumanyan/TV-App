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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const sortedVideos = [...(data.TrendingNow || data.TendingNow || [])]
      .sort((a, b) => new Date(b.Date) - new Date(a.Date))
      .slice(0, 50);

    const viewedVideos = JSON.parse(
      localStorage.getItem("viewedVideos") || "[]"
    );

    if (viewedVideos.length > 0) {
      const viewedMap = new Map();
      viewedVideos.forEach((video, index) => {
        viewedMap.set(video.Id, { ...video, viewOrder: index });
      });

      const viewed = [];
      const notViewed = [];

      sortedVideos.forEach((video) => {
        if (viewedMap.has(video.Id)) {
          viewed.push({
            ...video,
            viewOrder: viewedMap.get(video.Id).viewOrder,
          });
        } else {
          notViewed.push(video);
        }
      });

      viewed.sort((a, b) => a.viewOrder - b.viewOrder);
      setTrendingVideos([...viewed, ...notViewed]);
    } else {
      setTrendingVideos(sortedVideos);
    }
  }, []);

  const handleVideoClick = (video) => {
    setFeaturedVideo(video);
    setIsPlaying(false);

    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }

    setTimeout(() => {
      setIsPlaying(true);
    }, 2000);

    const viewedVideos = JSON.parse(
      localStorage.getItem("viewedVideos") || "[]"
    );

    const filteredViewed = viewedVideos.filter((v) => v.Id !== video.Id);
    const updatedViewedVideos = [video, ...filteredViewed];
    const limitedViewedVideos = updatedViewedVideos.slice(0, 20);

    localStorage.setItem("viewedVideos", JSON.stringify(limitedViewedVideos));

    setTrendingVideos((prevVideos) => {
      const otherVideos = prevVideos.filter((v) => v.Id !== video.Id);
      return [video, ...otherVideos];
    });

    console.log("Video clicked:", video.Title);
    console.log(
      "Updated viewed videos:",
      limitedViewedVideos.map((v) => v.Title)
    );
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleMenuToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  const handleOverlayClick = () => {
    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="app">
      <Menu
        onToggle={handleMenuToggle}
        isOpen={isMenuOpen}
        isMobile={isMobile}
      />

      {isMobile && isMenuOpen && (
        <div className="mobile-overlay" onClick={handleOverlayClick} />
      )}

      <div className={`main-content ${isMenuOpen ? "menu-open" : ""}`}>
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

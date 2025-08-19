import { useRef, useState, useEffect } from "react";

import "./TrendingNow.css";

const TrendingNow = ({ videos = [], onVideoClick }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const mockVideos = [
    {
      Id: 1,
      Title: "Action Movie 2024",
      CoverImage: "https://picsum.photos/300/400?random=1",
    },
    {
      Id: 2,
      Title: "Romance Drama",
      CoverImage: "https://picsum.photos/300/400?random=2",
    },
    {
      Id: 3,
      Title: "Sci-Fi Adventure",
      CoverImage: "https://picsum.photos/300/400?random=3",
    },
    {
      Id: 4,
      Title: "Comedy Special",
      CoverImage: "https://picsum.photos/300/400?random=4",
    },
    {
      Id: 5,
      Title: "Horror Thriller",
      CoverImage: "https://picsum.photos/300/400?random=5",
    },
    {
      Id: 6,
      Title: "Documentary",
      CoverImage: "https://picsum.photos/300/400?random=6",
    },
    {
      Id: 7,
      Title: "Mystery Film",
      CoverImage: "https://picsum.photos/300/400?random=7",
    },
    {
      Id: 8,
      Title: "Fantasy Epic",
      CoverImage: "https://picsum.photos/300/400?random=8",
    },
    {
      Id: 9,
      Title: "Crime Drama",
      CoverImage: "https://picsum.photos/300/400?random=9",
    },
    {
      Id: 10,
      Title: "Animation",
      CoverImage: "https://picsum.photos/300/400?random=10",
    },
    {
      Id: 11,
      Title: "Biographical",
      CoverImage: "https://picsum.photos/300/400?random=11",
    },
    {
      Id: 12,
      Title: "War Epic",
      CoverImage: "https://picsum.photos/300/400?random=12",
    },
    {
      Id: 13,
      Title: "Musical",
      CoverImage: "https://picsum.photos/300/400?random=13",
    },
    {
      Id: 14,
      Title: "Sports Drama",
      CoverImage: "https://picsum.photos/300/400?random=14",
    },
    {
      Id: 15,
      Title: "Western",
      CoverImage: "https://picsum.photos/300/400?random=15",
    },
  ];

  const displayVideos = videos.length > 0 ? videos : mockVideos;

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const itemWidth = 220;
      const visibleItems = Math.floor(
        carouselRef.current.clientWidth / itemWidth
      );
      const scrollAmount = itemWidth * Math.max(1, visibleItems - 1);

      if (direction === "left") {
        carouselRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      updateScrollButtons();
      carousel.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);

      return () => {
        carousel.removeEventListener("scroll", updateScrollButtons);
        window.removeEventListener("resize", updateScrollButtons);
      };
    }
  }, [displayVideos]);

  const handleVideoClick = (video) => {
    if (onVideoClick) {
      onVideoClick(video);
    } else {
      console.log("Clicked video:", video.Title);
    }
  };

  return (
    <div className="trending-section">
      <h2 className="section-title">Trending Now</h2>
      <div className="trending-container">
        <button
          className={`scroll-button left ${!canScrollLeft ? "disabled" : ""}`}
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
        >
          ‹
        </button>

        <div className="trending-carousel" ref={carouselRef}>
          {displayVideos.map((video) => (
            <div
              key={video.Id}
              className="trending-item"
              onClick={() => handleVideoClick(video)}
            >
              {video.CoverImage ? (
                <img
                  className="trending-cover"
                  src={video.CoverImage}
                  alt={video.Title}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="trending-placeholder"
                style={{ display: video.CoverImage ? "none" : "flex" }}
              >
                {video.Title}
              </div>
              <div className="trending-title">{video.Title}</div>
            </div>
          ))}
        </div>

        <button
          className={`scroll-button right ${!canScrollRight ? "disabled" : ""}`}
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default TrendingNow;

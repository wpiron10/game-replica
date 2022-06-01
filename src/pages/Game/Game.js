import "./Game.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Game = ({ aboutRef, setFavorites }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [dataOtherGames, setDataOtherGames] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [active, setActive] = useState(false);
  const [thumbUp, setThumbUp] = useState(false);
  const [thumbDown, setThumbDown] = useState(false);

  useEffect(() => {
    const fetchDataGame = async () => {
      try {
        const response = await axios.get(
          `https://game-replica-backend.herokuapp.com/games/${id}`
          // `https://api.rawg.io/api/games/${id}?key=${ApiKey}`
        );
        setData(response.data);
        if (response.data.slug) {
          const secondResponse = await axios.get(
            `https://game-replica-backend.herokuapp.com/relatedgames?slug=${response.data.slug}`
            // `https://api.rawg.io/api/games/${response.data.slug}/game-series?key=${ApiKey}`
          );
          setDataOtherGames(secondResponse.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchDataGame();
  }, [id]);

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop - 130,
      left: 0,
      behavior: "smooth",
    });
  };

  return isLoading === true ? (
    <div>
      <p>chargement</p>
    </div>
  ) : (
    <div className="game-page">
      <div className="game-section">
        <div className="game-subsection-left">
          <div className="subsection-left-sticky-content">
            <div>
              <h1 className="subsection-left-title">{data.name}</h1>
              <div className="subsection-left-title-line"></div>
            </div>
            <img
              className="game-img"
              src={data.background_image}
              alt={data.name}
            />
          </div>
        </div>
        <div className="game-subsection-right">
          <div className="subsection-right-sub-section">
            <div className="right-content-collection-review">
              <div className="right-content-collection-review-btn">
                <div
                  className="right-content-collection-review-btn-col-1"
                  onClick={async () => {
                    const toAddCookies = {
                      id: data.id,
                      name: data.name,
                      image: data.background_image,
                    };
                    // console.log(data, "data");

                    const favoriteToStr = JSON.stringify(toAddCookies);

                    setFavorites(favoriteToStr);
                  }}
                >
                  Saved to <br />
                  <p id="Collection">Collection</p>
                </div>
                <div className="right-content-collection-review-btn-col-2">
                  <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                </div>
              </div>
              <div className="right-content-collection-review-btn">
                <div className="right-content-collection-review-btn-col-1">
                  Add a <br />
                  Review
                </div>
                <div className="right-content-collection-review-btn-col-2">
                  <FontAwesomeIcon icon="fa-solid fa-message" />
                </div>
              </div>
            </div>
            <div className="subsection-right-columns">
              <div className="right-content-info-col-1">
                <div className="subsection-right-content">
                  <p className="subsection-right-label">Platforms: </p>

                  <div className="subsection-right-info">
                    {data.platforms.map((elem) => {
                      return (
                        <p
                          className="subsection-right-text"
                          key={elem.platform.name}
                        >
                          {elem.platform.name},&nbsp;
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="subsection-right-content">
                  <p className="subsection-right-label">Released Date :</p>

                  <div className="subsection-right-info">
                    <p className="subsection-right-text">{data.released}</p>
                  </div>
                </div>
                <div className="subsection-right-content">
                  <p className="subsection-right-label">Publisher:</p>

                  <div className="subsection-right-info">
                    {data.publishers.map((elem, index) => {
                      return (
                        <p className="subsection-right-text" key={index}>
                          {elem.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="right-content-info-col-2">
                <div className="subsection-right-content">
                  <p className="subsection-right-label">Genre(s): </p>

                  <div className="subsection-right-info">
                    {data.genres.map((elem, index) => {
                      return (
                        <p className="subsection-right-text" key={index}>
                          {elem.name},&nbsp;
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="subsection-right-content">
                  <p className="subsection-right-label">Developer(s): </p>

                  <div className="subsection-right-info">
                    {data.developers.map((elem, index) => {
                      return <p key={index}>{elem.name}&nbsp;</p>;
                    })}
                  </div>
                </div>
                <div className="subsection-right-content">
                  <p className="subsection-right-label">Average rating: </p>

                  <div className="subsection-right-info">
                    <p>{data.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* //developers */}
          <div className="subsection-right-about-desc">
            <div>
              <p className="subsection-right-label" ref={aboutRef}>
                About
              </p>

              <div className="subsection-right-info">
                <p
                  className={
                    active === false
                      ? "subsection-right-desc"
                      : "subsection-right-desc-see-more"
                  }
                >
                  {data.description_raw}
                </p>
              </div>
            </div>
            <div className="see-more-btn">
              <Link
                to={`/game/${id}/#about`}
                onClick={() => {
                  if (active === true) {
                    setActive(false);
                  } else {
                    setActive(true);
                  }
                  handleScroll(aboutRef.current);
                }}
              >
                <button className="see-more">
                  See {active ? "less" : "more"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="ratings-section">
        <div className="ratings-subsection-title">
          <h3 className="ratings-title">Ratings </h3>
          <div className="ratings-title-line"></div>
        </div>
        <div className="discover-other-game-ratings">
          {data.ratings.map((elem, index) => {
            const BackgroundById = (elem) => {
              if (elem.id) {
                if (elem.id === 5) {
                  return "green";
                } else if (elem.id === 4) {
                  return "yellow";
                } else if (elem.id === 3) {
                  return "orange";
                } else if (elem.id === 2) {
                  return "red";
                } else if (elem.id === 1) {
                  return "grey";
                }
              }
            };

            return (
              <div key={index} className="discover-other-game-percents">
                <p>{elem.title}</p>
                <div className="discover-other-game-percent-display">
                  <div
                    style={{
                      display: "flex",
                      width: elem.percent + "%",
                      height: "30px",
                      backgroundColor: BackgroundById(elem),
                    }}
                    className="discover-other-game-percent"
                  >
                    {elem.percent > 10 && <span>{elem.percent} %</span>}
                  </div>
                  {elem.percent < 10 && (
                    <span className="elem-under-ten-percent">
                      {elem.percent} %
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="discover-other-game-section">
        <h3 className="discover-other-game-title">
          Other games like {data.name} :
        </h3>
        <div className="result-cards">
          {dataOtherGames.results.map((otherGame, index) => {
            return (
              <Link to={`/game/${otherGame.id}`} key={index}>
                <div className="result-card">
                  <img
                    src={otherGame.background_image}
                    className="result-img"
                    alt={otherGame.name}
                  />
                  <h4 className="result-info">{otherGame.name}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="reviews-section">
        <h3>Reviews</h3>
        <div>
          <h4>Most Relevant reviews</h4>
        </div>
        <div className="reviews">
          <div className="review">
            <div className="review-content-row1">
              <div className="review-title">« The Witcher 3: Wild Hunt »</div>
              <div className="review-comment">
                orld adventures of the renowned monster slayer Geralt of Rivia
                are now even on a larger scale. Following the source material
                more accurately, this time Geralt is trying to find the child of
                the prophecy, Ciri while making a quick coin from various
                contracts on the side. Great attention to the world building
                above all creates an immersive story, where your decisions will
                shape the world around you.
              </div>
            </div>

            <div className="review-content-row2">
              <div className="review-user">
                <img
                  src={data.background_image}
                  alt={data.name}
                  className="review-profile-img"
                />
                <p>Username</p>
              </div>
              <div className="review-thumb-vote">
                <div className="review-thumb-up">
                  <FontAwesomeIcon
                    icon="fa-solid fa-thumbs-up"
                    className="icon-thumb"
                    style={{ color: thumbUp ? "green" : "grey" }}
                    onClick={() => {
                      if (thumbUp === true) {
                        setThumbUp(false);
                      } else {
                        setThumbUp(true);
                        setThumbDown(false);
                      }
                    }}
                  />
                  <p>+1</p>
                </div>
                <div className="review-thumb-down">
                  <FontAwesomeIcon
                    className="icon-thumb"
                    icon="fa-solid fa-thumbs-down"
                    style={{ color: thumbDown ? "red" : "grey" }}
                    onClick={() => {
                      if (thumbDown === true) {
                        setThumbDown(false);
                      } else {
                        setThumbDown(true);
                        setThumbUp(false);
                      }
                    }}
                  />
                  <p>-1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Game;

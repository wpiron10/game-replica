import "./Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./../assets/img/Logo.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;
  const ApiKey = "f45fcba7b85f4962a5878f5f6d37b06f";

  {
    /*         //------------------------- // parent plateforms : game   consoles types // ---------------------------// */
  }

  const [parentPlatformSelector, setParentPlatformSelector] = useState("");
  const [parentPlatform, setParentPlatform] = useState(null);

  {
    /*         //------------------------- // plateforms : game consoles // ---------------------------// */
  }

  //plateforme  : str / num
  const [platformSelector, setPlatformSelector] = useState("");
  const [platform, setPlatform] = useState(null);

  {
    /*         //------------------------- // API Rawg// ---------------------------// */
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let ParentPlatformFilter = "";
        if (parentPlatform) {
          ParentPlatformFilter =
            ParentPlatformFilter + `&parent_platforms=${parentPlatform}`;
        }

        let PlatformFilter = "";
        if (platform) {
          PlatformFilter = PlatformFilter + `&platforms=${platform}`;
        }

        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${ApiKey}&page=${page}&search=${search}${ParentPlatformFilter}${PlatformFilter}`
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, page, parentPlatform, platform]);

  {
    /*         //------------------------- // ParentConsoleList // ---------------------------// */
  }

  const ParentConsoleList = (listOfParentPlatforms) => {
    const resultPlatformTabDeduplicate = [];
    if (listOfParentPlatforms.length !== null) {
      for (let i = 0; i < listOfParentPlatforms.length; i++) {
        console.log(
          listOfParentPlatforms[i].parent_platforms,
          "listOfParentPlatforms"
        );

        for (
          let j = 0;
          j < listOfParentPlatforms[i].parent_platforms.length;
          j++
        ) {
          if (
            resultPlatformTabDeduplicate.indexOf(
              listOfParentPlatforms[i].parent_platforms[j].platform.name
            ) === -1
          ) {
            resultPlatformTabDeduplicate.push(
              listOfParentPlatforms[i].parent_platforms[j].platform.name
            );
          }
        }
      }
    }

    return resultPlatformTabDeduplicate;
  };

  {
    /*         //------------------------- // consoleList // ---------------------------// */
  }

  const consoleList = (listOfPlatforms) => {
    const resultTabDeduplicate = [];
    if (listOfPlatforms.length !== null) {
      for (let i = 0; i < listOfPlatforms.length; i++) {
        // console.log(listOfPlatforms[i].platforms, "listOfPlatforms");

        for (let j = 0; j < listOfPlatforms[i].platforms.length; j++) {
          if (
            resultTabDeduplicate.indexOf(
              listOfPlatforms[i].platforms[j].platform.name
            ) === -1
          ) {
            resultTabDeduplicate.push(
              listOfPlatforms[i].platforms[j].platform.name
            );
          }
        }
      }
    }

    return resultTabDeduplicate;
  };

  return isLoading === true ? (
    <div>
      <p>En attente de réponse</p>
    </div>
  ) : (
    <div className="home-container">
      <div className="search-section">
        <div className="search-title-searchbar">
          <img className="logo" src={Logo} />
          <div className="searchbar">
            <input
              placeholder="Search for a game"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            ></input>
            <FontAwesomeIcon
              id="search-magnifying-glass"
              icon="fa-solid fa-magnifying-glass"
            />
          </div>
          <div>{search.length < 1 && <h3>Search {data.count} games</h3>}</div>
          <div>
            {search.length >= 1 && (
              <div className="search-info">
                <h3>Search result for "{search}"</h3>
                <h4>{data.count} games</h4>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="filters-section">
        <div>
          <label for="platform-select">Platform:</label>

          {/*         //------------------------- // select a  PARENT PLATFORM // ---------------------------// */}

          <select
            name="platforms"
            id="platform-select"
            onChange={(event) => {
              setParentPlatformSelector("");
              console.log(event.target.value, "<<<<<<<<<<<<<<<<<<<<  event1");
              if (event.target.value === "Android") {
                setParentPlatformSelector(event.target.value);
              } else if (event.target.value === "Apple Macintosh") {
                setParentPlatformSelector(event.target.value);
              } else if (event.target.value === "Linux") {
                setParentPlatformSelector(event.target.value);
              } else if (event.target.value === "Nintendo") {
                setParentPlatformSelector(event.target.value);
              } else if (event.target.value === "PC") {
                setParentPlatformSelector(event.target.value);
              } else if (event.target.value === "PlayStation") {
                setParentPlatformSelector(event.target.value);
              } else if (event.target.value === "Web") {
                setParentPlatformSelector(event.target.value);
              } else if (event.target.value === "Xbox") {
                setParentPlatformSelector(event.target.value);
              } else if (event.target.value === "iOS") {
                setParentPlatformSelector(event.target.value);
              }
            }}
          >
            <option value="">--Please choose an option--</option>
            {ParentConsoleList(data.results)
              .sort()
              .map((item, index) => {
                console.log(item);
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <label for="platform-select">Type :</label>

          {/*         //------------------------- // select a  CONSOLE / PLATFORM// ---------------------------// */}

          <select
            name="type"
            id="type-select"
            onChange={(event) => {
              setPlatformSelector("");
              console.log(event.target.value, "<<<<<<<<<<<<<<<<<<<<  event2");
              if (event.target.value === "Android") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "Linux") {
                setPlatformSelector("Linux");
              } else if (event.target.value === "Nintendo Switch") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "Nintendo 3DS") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "PC") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "PS Vita") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "PlayStation 2") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "PlayStation 3") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "PlayStation 4") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "Wii U") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "Web") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "Xbox One") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "Xbox 360") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "Xbox Series S/X") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "ios") {
                setPlatformSelector(event.target.value);
              } else if (event.target.value === "macOS") {
                setPlatformSelector(event.target.value);
              }
            }}
          >
            <option value="">--Please choose an option--</option>
            {consoleList(data.results)
              .sort()
              .map((item, index) => {
                console.log(item);
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>

        {/*         //------------------------- // Apply filters // ---------------------------// */}

        <div>
          Filter :
          <button
            onClick={() => {
              setParentPlatform();

              if (parentPlatformSelector === "Android") {
                setParentPlatform(8);
              } else if (parentPlatformSelector === "Apple Macintosh") {
                setParentPlatform(5);
              } else if (parentPlatformSelector === "Linux") {
                setParentPlatform(6);
              } else if (parentPlatformSelector === "Nintendo") {
                setParentPlatform(7);
              } else if (parentPlatformSelector === "PC") {
                setParentPlatform(1);
              } else if (parentPlatformSelector === "PlayStation") {
                setParentPlatform(2);
              } else if (parentPlatformSelector === "Web") {
                setParentPlatform(14);
              } else if (parentPlatformSelector === "Xbox") {
                setParentPlatform(3);
              } else if (parentPlatformSelector === "iOS") {
                setParentPlatform(4);
              }

              if (platformSelector === "Android") {
                setPlatform(21);
                setParentPlatform(8);
              } else if (platformSelector === "Linux") {
                setPlatform(6);
                setParentPlatform(6);
              } else if (platformSelector === "Nintendo Switch") {
                setPlatform(7);
                setParentPlatform(7);
              } else if (platformSelector === "Nintendo 3DS") {
                setPlatform(8);
                setParentPlatform(7);
              } else if (platformSelector === "PC") {
                setPlatform(4);
                setParentPlatform(1);
              } else if (platformSelector === "PS Vita") {
                setPlatform(19);
                setParentPlatform(2);
              } else if (platformSelector === "PlayStation 2") {
                setPlatform(15);
                setParentPlatform(2);
              } else if (platformSelector === "PlayStation 3") {
                setPlatform(16);
                setParentPlatform(2);
              } else if (platformSelector === "PlayStation 4") {
                setPlatform(18);
                setParentPlatform(2);
              } else if (platformSelector === "Wii U") {
                setPlatform(10);
                setParentPlatform(7);
              } else if (platformSelector === "Web") {
                setPlatform(171);
                setParentPlatform(14);
              } else if (platformSelector === "Xbox One") {
                setPlatform(1);
                setParentPlatform(3);
              } else if (platformSelector === "Xbox 360") {
                setPlatform(14);
                setParentPlatform(3);
              } else if (platformSelector === "Xbox Series S/X") {
                setPlatform(186);
                setParentPlatform(3);
              } else if (platformSelector === "ios") {
                setPlatform(3);
                setParentPlatform(4);
              } else if (platformSelector === "macOS") {
                setPlatform(5);
                setParentPlatform(5);
              }
            }}
          >
            Apply filters
          </button>
        </div>
      </div>

      {/*         //------------------------- // Map sur les jeux // ---------------------------// */}

      <div className="result-section">
        <h2>Most Relevance Games</h2>
        <div className="results">
          {data.results.map((game, index) => {
            return (
              <div className="result-card" key={index}>
                <img className="result-img" src={game.background_image} />
                <div className="result-info">
                  <h4 className="result-title">{game.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
        <div className="results-pagination">
          <div className="results-pagination-btn">
            {page > 1 && (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-left"
                onClick={() => {
                  setPage(page - 1);
                }}
              />
            )}
          </div>
          <div>{page}</div>
          <div className="results-pagination-btn">
            {page < data.count / limit && (
              <FontAwesomeIcon
                icon="fa-solid fa-angle-right"
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

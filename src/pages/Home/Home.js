import "./Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/img/Logo.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  /*         //------------------------- // parent plateforms : game   consoles types // ---------------------------// */

  const [parentPlatformSelector, setParentPlatformSelector] = useState("");
  const [parentPlatform, setParentPlatform] = useState(null);
  const [parentPlatformFamily, setParentPlatformFamily] = useState(null);

  /*         //------------------------- // plateforms : game consoles // ---------------------------// */

  //plateforme  : str / num
  const [platformSelector, setPlatformSelector] = useState("");
  const [platform, setPlatform] = useState(null);

  const [orderSelector, setOrderSelector] = useState("");
  const [order, setOrder] = useState(null);

  /*         //------------------------- // API Rawg// ---------------------------// */

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

        let OrderFilter = "";
        if (order) {
          OrderFilter = OrderFilter + `&ordering=${order}`;
        }

        const response = await axios.get(
          `https://game-replica-backend.herokuapp.com/?page=${page}&search=${search}${ParentPlatformFilter}${PlatformFilter}${OrderFilter}`
          // `https://api.rawg.io/api/games?key=${ApiKey}&page=${page}&search=${search}${ParentPlatformFilter}${PlatformFilter}${OrderFilter}`
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, page, parentPlatform, platform, order]);

  /*         //------------------------- // Set a game console to a family // ---------------------------// */

  const isNameContainedInFamily = (name) => {
    if (
      name === "PlayStation" ||
      name === "PlayStation 2" ||
      name === "PlayStation 2" ||
      name === "PlayStation 3" ||
      name === "PlayStation 4" ||
      name === "PS Vita"
    ) {
      return "PlayStation";
    } else if (name === "Android" || name === "Linux") {
      return "Linux";
    } else if (
      name === "Nintendo" ||
      name === "Wii U" ||
      name === "Nintendo Switch" ||
      name === "Nintendo 3DS"
    ) {
      return "Nintendo";
    } else if (
      name === "Xbox" ||
      name === "Xbox One" ||
      name === "Xbox 360" ||
      name === "Xbox Series S/X"
    ) {
      return "Xbox";
    } else if (name === "iOS" || name === "macOS") {
      return "Apple";
    } else if (name === "PC") {
      return "PC";
    } else if (name === "Web") {
      return "Web";
    }
  };

  /*         //------------------------- // ParentConsoleList // ---------------------------// */

  const ParentConsoleList = (listOfParentPlatforms) => {
    const resultPlatformTabDeduplicate = [];
    if (listOfParentPlatforms.length > 1) {
      for (let i = 0; i < listOfParentPlatforms.length; i++) {
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
            if (parentPlatformFamily) {
              if (
                isNameContainedInFamily(
                  listOfParentPlatforms[i].parent_platforms[j].platform.name
                ) === parentPlatformFamily
              ) {
                resultPlatformTabDeduplicate.push(
                  listOfParentPlatforms[i].parent_platforms[j].platform.name
                );
              }
            } else if (parentPlatformFamily === null) {
              resultPlatformTabDeduplicate.push(
                listOfParentPlatforms[i].parent_platforms[j].platform.name
              );
            }
          }
        }
      }
    }

    return resultPlatformTabDeduplicate;
  };

  /*         //------------------------- // consoleList // ---------------------------// */

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
            if (parentPlatformFamily) {
              if (
                isNameContainedInFamily(
                  listOfPlatforms[i].platforms[j].platform.name
                ) === parentPlatformFamily
              ) {
                resultTabDeduplicate.push(
                  listOfPlatforms[i].platforms[j].platform.name
                );
              }
            } else if (parentPlatformFamily === null) {
              resultTabDeduplicate.push(
                listOfPlatforms[i].platforms[j].platform.name
              );
            }
          }
        }
      }
    }

    return resultTabDeduplicate;
  };

  const isFilterOrSortApplied = () => {
    if (platform || parentPlatform || order) {
      return true;
    }
  };

  return isLoading === true ? (
    <div>
      <p>chargement</p>
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
          <div className="search-info">
            {search.length < 1 && <h3>Search {data.count} games</h3>}
          </div>
          <div>
            {search.length >= 1 && (
              <div className="search-info">
                <div className="search-result">
                  <h3>Search result for </h3>
                  <h3 className="search-game-request"> "{search}"</h3>
                </div>
                <h4>{data.count} games</h4>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* // ------------------------- // select a  PARENT PLATFORM // ---------------------------//  */}
      <div className="filters-section">
        <div>
          <label htmlFor="platform-select">Platform:</label>

          <select
            className="select-filter"
            name="platforms"
            id="platform-select"
            onChange={(event) => {
              setParentPlatformSelector(null);
              setParentPlatformFamily(null);

              // console.log(event.target.value, "<<<<<<<<<<<<<<<<<<<<  event1");
              if (event.target.value === "Android") {
                setParentPlatformSelector(event.target.value);
                setParentPlatformFamily("Linux");
              } else if (event.target.value === "Apple Macintosh") {
                setParentPlatformSelector(event.target.value);
                setParentPlatformFamily("Apple");
              } else if (event.target.value === "Linux") {
                setParentPlatformSelector(event.target.value);
                setParentPlatformFamily("Linux");
              } else if (event.target.value === "Nintendo") {
                setParentPlatformSelector(event.target.value);
                setParentPlatformFamily("Nintendo");
              } else if (event.target.value === "PC") {
                setParentPlatformSelector(event.target.value);
                setParentPlatformFamily("PC");
              } else if (event.target.value === "PlayStation") {
                setParentPlatformSelector(event.target.value);
                setParentPlatformFamily("PlayStation");
              } else if (event.target.value === "Web") {
                setParentPlatformSelector(event.target.value);
                setParentPlatformFamily("Web");
              } else if (event.target.value === "Xbox") {
                setParentPlatformSelector(event.target.value);
                setParentPlatformFamily("Xbox");
              } else if (event.target.value === "iOS") {
                setParentPlatformSelector(event.target.value);
                setParentPlatformFamily("Xbox");
              }
            }}
          >
            <option className="option-filter" value={null}>
              --Please choose an option--
            </option>
            {ParentConsoleList(data.results)
              .sort()
              .map((item, index) => {
                // console.log(item);
                return (
                  <option className="option-filter" key={index} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>

        {/*         //------------------------- // select a  CONSOLE / PLATFORM// ---------------------------// */}
        <div>
          <label htmlFor="platform-select">Type :</label>
          <select
            className="select-filter"
            name="type"
            id="type-select"
            onChange={(event) => {
              setPlatformSelector("");
              setParentPlatformFamily(null);

              // console.log(event.target.value, "<<<<<<<<<<<<<<<<<<<<  event2");
              if (event.target.value === "Android") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Linux");
              } else if (event.target.value === "Linux") {
                setPlatformSelector("Linux");
                setParentPlatformFamily("Linux");
              } else if (event.target.value === "Nintendo Switch") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Nintendo");
              } else if (event.target.value === "Nintendo 3DS") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Nintendo");
              } else if (event.target.value === "PC") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("PC");
              } else if (event.target.value === "PS Vita") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("PlayStation");
              } else if (event.target.value === "PlayStation 2") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("PlayStation");
              } else if (event.target.value === "PlayStation 3") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("PlayStation");
              } else if (event.target.value === "PlayStation 4") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("PlayStation");
              } else if (event.target.value === "Wii U") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Nintendo");
              } else if (event.target.value === "Web") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Web");
              } else if (event.target.value === "Xbox One") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Xbox");
              } else if (event.target.value === "Xbox 360") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Xbox");
              } else if (event.target.value === "Xbox Series S/X") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Xbox");
              } else if (event.target.value === "iOS") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Apple");
              } else if (event.target.value === "macOS") {
                setPlatformSelector(event.target.value);
                setParentPlatformFamily("Apple");
              }
            }}
          >
            <option className="option-filter" value={null}>
              --Please choose an option--
            </option>
            {consoleList(data.results)
              .sort()
              .map((item, index) => {
                return (
                  <option className="option-filter" key={index} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>

        {/*         //------------------------- // ORDER : SORT BY // ---------------------------// */}

        <div>
          <label htmlFor="platform-select">Sort by:</label>
          <select
            className="select-filter"
            onChange={(event) => {
              setOrderSelector("");
              if (event.target.value === "Name") {
                setOrderSelector(event.target.value);
                // console.log(orderSelector, "name");
              } else if (event.target.value === "Release Date") {
                setOrderSelector(event.target.value);
                // console.log(orderSelector, "date");
              } else if (event.target.value === "Rating") {
                setOrderSelector(event.target.value);
                // console.log(orderSelector, "rate");
              }
            }}
          >
            <option className="option-filter" value="Name">
              Default
            </option>

            <option className="option-filter" value="Name">
              Name
            </option>
            <option className="option-filter" value="Release Date">
              Release Date
            </option>
            <option className="option-filter" value="Rating">
              Grade
            </option>
          </select>
        </div>

        {/*         //------------------------- // Apply filters // ---------------------------// */}

        <div>
          <button
            onClick={() => {
              {
                /*         //------------------------- // Apply filters on Parent Platform // ---------------------------// */
              }

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

              {
                /*         //------------------------- // Apply filters on Platforms // ---------------------------// */
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
              } else if (platformSelector === "iOS") {
                setPlatform(3);
                setParentPlatform(4);
              } else if (platformSelector === "macOS") {
                setPlatform(5);
                setParentPlatform(5);
              }

              {
                /*         //------------------------- // Apply ordering on filters // ---------------------------// */
              }
              setOrder();
              if (orderSelector === "Name") {
                setOrder("name");
              } else if (orderSelector === "Release Date") {
                setOrder("released");
              } else if (orderSelector === "Rating") {
                setOrder("rating");
              }
            }}
          >
            Apply filters
          </button>
        </div>
      </div>
      <div className="button-filter-effect">
        {isFilterOrSortApplied() && (
          <button
            onClick={() => {
              setPlatform(null);
              setParentPlatform(null);
              setParentPlatformSelector(null);
              setPlatformSelector(null);
              setOrder(null);
            }}
          >
            Reset Filters and Sort
          </button>
        )}
      </div>
      {/*         //------------------------- // Map sur les jeux // ---------------------------// */}

      <div className="result-section">
        <h2>Most Relevance Games</h2>
        <div className="results">
          {data.results.map((game, index) => {
            return (
              <Link to={`/game/${game.id}`} key={index}>
                <div
                  className="result-card"
                  key={index}
                  onClick={() => navigate("/Game")}
                >
                  <img className="result-img" src={game.background_image} />
                  <div className="result-info">
                    <h4 className="result-title">{game.name}</h4>
                  </div>
                </div>
              </Link>
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

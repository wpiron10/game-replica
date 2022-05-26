import "./Game.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const Game = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const ApiKey = "339e480322b04471a75133f7583df2a2";

  useEffect(() => {
    const fetchDataGame = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${ApiKey}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchDataGame();
  });

  return (
    <div>
      <div className="game-section">
        <div>{data.name}</div>
        <img className="game-img" src={data.image_background} />
      </div>
      <div>
        <p>Review : </p>
        {data.rating}
      </div>

      <div>
        <p>Updated : </p>
        {data.updated}
      </div>
      <div>
        <p>Description : </p>
        {data.description}
      </div>
    </div>
  );
};
export default Game;

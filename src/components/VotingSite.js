import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VotingSite.css";

function VotingSite() {
  const [cookies] = useCookies(["joined"]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function sendVote(event) {
    axios
      .post("http://localhost:8001/vote", {
        voted: event.target.value,
        name: cookies.joined.name,
        sessionID: cookies.joined.sessionID,
      })
      .then(function (response) {
        navigate("/votes");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cookies.joined.name,
        sessionID: cookies.joined.sessionID,
      }),
    };

    async function fetchData() {
      const response = await fetch(
        "http://localhost:8001/joinSession",
        requestOptions
      );
      const res = await response.json();
      setData(res.data);
      console.log(res.data);
    }
    fetchData();
  }, []);

  return (
    data[0] && (
      <div className="toVoteFor" onChange={sendVote}>
        <div className="voteContainer">
          <p className="voteName">{data[0]}</p>
          <input
            className="possibleVote"
            type="radio"
            value={data[0]}
            name="map"
          />
        </div>
        <div className="voteContainer">
          <p className="voteName">{data[1]}</p>
          <input
            className="possibleVote"
            type="radio"
            value={data[1]}
            name="map"
          />
        </div>

        <div className="voteContainer">
          <p className="voteName">{data[2]}</p>
          <input
            className="possibleVote"
            type="radio"
            value={data[2]}
            name="map"
          />
        </div>
      </div>
    )
  );
}

export default VotingSite;

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./VotingSite.css";

function VotingSite() {
  const url = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["cs_map_voting"]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function sendVote(event) {
    axios
      .post(url + "/vote", {
        voted: event.target.value,
        name: cookies.cs_map_voting.name,
        sessionID: cookies.cs_map_voting.sessionID,
      })
      .then(function (response) {
        navigate("/votes");
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (cookies.cs_map_voting === undefined) {
      navigate("/");
      alert("No credentials were found, you need to join again");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cookies.cs_map_voting.name,
        sessionID: cookies.cs_map_voting.sessionID,
      }),
    };

    async function fetchData() {
      const response = await fetch(url + "/joinSession", requestOptions);
      const res = await response.json();
      setData(res.data);
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

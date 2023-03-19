import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Votes.css";
function Votes() {
  const url = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["cs_map_voting"]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionID: cookies.cs_map_voting.sessionID,
      }),
    };
    const response = await fetch(url + "/getVotesFromSession", requestOptions);

    const res = await response.json();
    //console.log(res);
    setData(res);
  }

  useEffect(() => {
    if (cookies.cs_map_voting === undefined) {
      navigate("/");
      alert("No credentials were found, you need to join again");
      return;
    }
    fetchData();
  }, []);

  return (
    data.maps && (
      <div className="container">
        <div className="votesContainer">
          <div>SessionID: {cookies.cs_map_voting.sessionID}</div>
          <div className="votesBox">
            <div className="mapVotes">
              <p className="map">{data.maps[0].name}</p>
              <p className="votes">{data.maps[0].votes}</p>
            </div>
            <div className="mapVotes">
              <p className="map">{data.maps[1].name}</p>
              <p className="votes">{data.maps[1].votes}</p>
            </div>
            <div className="mapVotes">
              <p className="map">{data.maps[2].name}</p>
              <p className="votes">{data.maps[2].votes}</p>
            </div>
          </div>
          <button onClick={fetchData}>Refresh</button>
        </div>
        {data.sessionOwner === cookies.cs_map_voting.name && (
          <div className="sessionOwner">
            <div className="left">
              <div className="participantList">
                <p>List of Participants</p>
                {data.participants.map((particinpant) => (
                  <li>{particinpant}</li>
                ))}
              </div>
            </div>
            <div className="left">
              <div className="whoVotesList">
                <p>List of user who voted</p>
                {data.whoVoted.map((whoVoted) => (
                  <li>{whoVoted}</li>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default Votes;

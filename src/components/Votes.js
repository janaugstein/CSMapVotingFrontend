import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Votes.css";
function Votes() {
  const [cookies] = useCookies(["joined"]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionID: cookies.joined.sessionID,
      }),
    };
    const response = await fetch(
      "http://localhost:8001/getVotesFromSession",
      requestOptions
    );

    const res = await response.json();
    console.log(res);
    setData(res);
  }

  useEffect(() => {
    if (cookies.joined === undefined) {
      navigate("/");
      alert("No credentials were found, you need to join again");
      return;
    }
    fetchData();
  }, []);

  return (
    data[0] && (
      <div className="votesContainer">
        <div>SessionID: {cookies.joined.sessionID}</div>
        <div className="votesBox">
          <div className="mapVotes">
            <p className="map">{data[0].name}</p>
            <p className="votes">{data[0].votes}</p>
          </div>
          <div className="mapVotes">
            <p className="map">{data[1].name}</p>
            <p className="votes">{data[1].votes}</p>
          </div>
          <div className="mapVotes">
            <p className="map">{data[2].name}</p>
            <p className="votes">{data[2].votes}</p>
          </div>
        </div>
        <button onClick={fetchData}>Refresh</button>
      </div>
    )
  );
}

export default Votes;

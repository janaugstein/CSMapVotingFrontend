import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function VotingSite() {
  const [cookies] = useCookies(["joined"]);
  const [data, setData] = useState([]);

  function sendVote(event) {
    axios
      .post("http://localhost:8001/vote", {
        voted: event.target.value,
        name: cookies.joined.name,
      })
      .then(function (response) {
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
      <div onChange={sendVote}>
        <input type="radio" value={data[0].map1} name="map" /> {data[0].map1}
        <input type="radio" value={data[0].map2} name="map" /> {data[0].map2}
        <input type="radio" value={data[0].map3} name="map" /> {data[0].map3}
      </div>
    )
  );
}

export default VotingSite;

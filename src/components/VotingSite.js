import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function VotingSite() {
  const [cookies] = useCookies(["joined"]);
  const [data, setData] = useState([]);

  /*async function getData() {
    axios
      .post("http://localhost:8001/joinSession", {
        name: cookies.joined.name,
        sessionID: cookies.joined.sessionID,
      })
      .then(function (response) {
        //console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }*/

  useEffect(() => {
    //console.log(cookies.joined.name);
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
      <div>
        <p>{data[0].map1}</p>
        <p>{data[0].map2}</p>
        <p>{data[0].map3}</p>
      </div>
    )
  );
}

export default VotingSite;

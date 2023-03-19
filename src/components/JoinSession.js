import TextField from "@mui/material/TextField";
import { useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./JoinSession.css";

function JoinSession() {
  var url = process.env.REACT_APP_API_URL;
  const nameRef = useRef();
  const sessionIDRef = useRef();
  const [cookies, setCookie] = useCookies(["cs_map_voting"]);
  let navigate = useNavigate();

  function setMyCookie() {
    //first check if cookie with the given sessionID already exist

    let d = new Date();
    //expiration after 30 minutes
    d.setTime(d.getTime() + 5 * 60 * 1000);

    setCookie(
      "cs_map_voting",
      { name: nameRef.current.value, sessionID: sessionIDRef.current.value },
      { path: "/", expires: d }
    );
  }

  function checkInputs() {
    if (nameRef.current.value === "" || sessionIDRef.current.value === "") {
      alert("Please enter both a name and a sessionID");
      return false;
    } else {
      return true;
    }
  }

  async function checkName() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionID: sessionIDRef.current.value,
      }),
    };

    const response = await fetch(url + "/getParticipants", requestOptions);
    const res = await response.json();
    if (res.participants.includes(nameRef.current.value)) {
      alert(
        `User with the name ${nameRef.current.value} already participated. Please use another name`
      );
      return false;
    } else {
      console.log("Name does not exist");
      return true;
    }
  }

  async function join() {
    if (checkInputs() && (await checkName())) {
      if (cookies.cs_map_voting === undefined) {
        setMyCookie();
        navigate("/voting");
      } else if (
        cookies.cs_map_voting.sessionID === sessionIDRef.current.value
      ) {
        alert("You already joined this Session");
        navigate("/votes");
      } else {
        setMyCookie();
        navigate("/voting");
      }
    }
  }
  return (
    <div className="joinSession">
      <TextField
        required
        id="name"
        label="Name"
        margin="normal"
        inputRef={nameRef}
        InputLabelProps={{ className: "textfield" }}
        inputProps={{ className: "textfield" }}
      />
      <TextField
        required
        id="sessionID"
        label="sessionID"
        margin="normal"
        inputRef={sessionIDRef}
        InputLabelProps={{ className: "textfield" }}
        inputProps={{ className: "textfield" }}
      />
      <button onClick={join}>Join</button>
    </div>
  );
}

export default JoinSession;

import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import { useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./JoinSession.css";

function JoinSession() {
  var url = process.env.REACT_APP_API_URL;
  const nameRef = useRef();
  const sessionIDRef = useRef();
  const [cookies, setCookie] = useCookies(["cs_map_voting"]);
  let navigate = useNavigate();
  const [warning, setWarning] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [info, setInfo] = useState(false);
  const [infoText, setInfoText] = useState("");

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
      //alert("Please enter both a name and a sessionID");
      setWarning(true);
      setWarningText("Please enter both a name and a sessionID");
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
    console.log(response);
    //check if participants is empty
    if (response.status === 404) {
      setWarning(true);
      setWarningText(
        `The sessionID ${sessionIDRef.current.value} does not exist`
      );
      return;
    }
    //check if the user name already exists
    if (res.participants.includes(nameRef.current.value)) {
      //check if a cookies exists and if the sessionID in the cookie is equal to the entered sessionID. When thats the case alert that he already joined, else that the user name is already in use
      if (
        cookies.cs_map_voting &&
        cookies.cs_map_voting.sessionID === sessionIDRef.current.value
      ) {
        setInfo(true);
        setInfoText(
          "You already joined this Session. Redirecting to the overview of the votes. Please wait..."
        );
        setTimeout(() => {
          navigate("/votes");
        }, 2000);
      } else {
        setWarning(true);
        setWarningText(`User with the name ${nameRef.current.value} already participated.
        Please use another name`);
      }
      return false;
    } else {
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
        setInfo(true);
        setInfoText(
          "You already joined this Session. Redirecting to the overview of the votes. Please wait..."
        );
        setTimeout(() => {
          navigate("/votes");
        }, 2000);
      } else {
        setMyCookie();
        navigate("/voting");
      }
    }
  }
  return (
    <div className="joinSession">
      {warning && <Alert severity="warning">{warningText}</Alert>}
      {info && <Alert severity="info">{infoText}</Alert>}
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

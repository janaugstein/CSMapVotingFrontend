import TextField from "@mui/material/TextField";
import { useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./JoinSession.css";

function JoinSession() {
  const nameRef = useRef();
  const sessionIDRef = useRef();
  const [cookies, setCookie] = useCookies(["joined"]);
  let navigate = useNavigate();

  function setMyCookie() {
    let d = new Date();
    //expiration after 30 minutes
    d.setTime(d.getTime() + 30 * 60 * 1000);

    setCookie(
      "joined",
      { name: nameRef.current.value, sessionID: sessionIDRef.current.value },
      { path: "/", expires: d, sameSite: "none" }
    );
  }

  function join() {
    /*axios
      .post("http://localhost:8001/joinSession", {
        name: nameRef.current.value,
        sessionID: sessionIDRef.current.value,
      })
      .then(function (response) {
        //setMyCookie();
        console.log(response);
        navigate("/voting");
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log({
      name: nameRef.current.value,
      sessionID: sessionIDRef.current.value,
    });*/
    setMyCookie();
    navigate("/voting");
    console.log({
      name: nameRef.current.value,
      sessionID: sessionIDRef.current.value,
    });
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
      <button onClick={join}>Join Session</button>
    </div>
  );
}

export default JoinSession;

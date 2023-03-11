import TextField from "@mui/material/TextField";
import { useRef } from "react";
import axios from "axios";

function JoinSession() {
  const nameRef = useRef();
  const sessionIDRef = useRef();
  //const axios = require("axios");

  function join() {
    axios
      .post("http://localhost:8001/joinSession", {
        name: nameRef.current.value,
        sessionID: sessionIDRef.current.value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log({
      name: nameRef.current.value,
      sessionID: sessionIDRef.current.value,
    });
    /*axios({
      method: "post",
      url: "http://localhost:8001/joinSession",
      data: {
        name: nameRef.current.value,
        sessionID: sessionIDRef.current.value,
      },
    }).then(function (response) {
      console.log(response);
    });*/
  }
  return (
    <div>
      <TextField
        required
        id="name"
        label="Name"
        margin="normal"
        inputRef={nameRef}
      />
      <TextField
        required
        id="sessionID"
        label="sessionID"
        margin="normal"
        inputRef={sessionIDRef}
      />
      <button onClick={join}>Join Session</button>
    </div>
  );
}

export default JoinSession;

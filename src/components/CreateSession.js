import TextField from "@mui/material/TextField";
import { useRef } from "react";
import axios from "axios";
import "./CreateSession.css";

function CreateSession() {
  const nameRef = useRef();
  const map1Ref = useRef();
  const map2Ref = useRef();
  const map3Ref = useRef();

  function create() {
    alert("clicked create");
  }

  return (
    <div className="createSession">
      <TextField
        required
        id="name"
        label="Name"
        margin="normal"
        inputRef={nameRef}
      />
      <TextField
        required
        id="map1"
        label="map1"
        margin="normal"
        inputRef={map1Ref}
      />
      <TextField
        required
        id="map2"
        label="map2"
        margin="normal"
        inputRef={map2Ref}
      />
      <TextField
        required
        id="map2"
        label="map2"
        margin="normal"
        inputRef={map3Ref}
      />
      <button onClick={create}>Create Session</button>
    </div>
  );
}

export default CreateSession;

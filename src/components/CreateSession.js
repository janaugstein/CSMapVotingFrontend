import TextField from "@mui/material/TextField";
import { useRef } from "react";
import axios from "axios";
import "./CreateSession.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function CreateSession() {
  var url = process.env.REACT_APP_API_URL;
  const nameRef = useRef();
  const map1Ref = useRef();
  const map2Ref = useRef();
  const map3Ref = useRef();
  const [cookies, setCookie] = useCookies(["joined"]);
  const navigate = useNavigate();

  function create() {
    let maps = [
      map1Ref.current.value,
      map2Ref.current.value,
      map3Ref.current.value,
    ];
    axios
      .post(url + "/createSession", {
        maps: maps,
        name: nameRef.current.value,
      })
      .then(function (response) {
        let d = new Date();
        //expiration after 30 minutes
        d.setTime(d.getTime() + 30 * 60 * 1000);
        setCookie(
          "joined",
          { name: nameRef.current.value, sessionID: response.data.sessionID },
          { path: "/", expires: d, sameSite: "none" }
        );
        navigate("/voting");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="createSession">
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
        id="map1"
        label="map1"
        margin="normal"
        inputRef={map1Ref}
        InputLabelProps={{ className: "textfield" }}
        inputProps={{ className: "textfield" }}
      />
      <TextField
        required
        id="map2"
        label="map2"
        margin="normal"
        inputRef={map2Ref}
        InputLabelProps={{ className: "textfield" }}
        inputProps={{ className: "textfield" }}
      />
      <TextField
        required
        id="map2"
        label="map2"
        margin="normal"
        inputRef={map3Ref}
        InputLabelProps={{ className: "textfield" }}
        inputProps={{ className: "textfield" }}
      />
      <button onClick={create}>Create Session</button>
    </div>
  );
}

export default CreateSession;

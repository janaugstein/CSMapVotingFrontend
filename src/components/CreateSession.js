import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
  const mapOptions = ["Inferno", "Cache", "Anubis", "Ancient"];

  function create() {
    let mapsFromSelection = [
      map1Ref.current.value,
      map2Ref.current.value,
      map3Ref.current.value,
    ];
    let maps = [];
    for (var i = 0; i < mapsFromSelection.length; i++) {
      if (!maps.includes(mapsFromSelection[i])) {
        maps.push(mapsFromSelection[i]);
      } else {
        alert("You cant select Maps twice! Please change one of the Maps.");
        return;
      }
    }

    //check if one map is empty0
    for (var i = 0; i < maps.length; i++) {
      if (maps[i] === "") {
        alert("Please fill in all 3 Maps");
        return;
      }
    }
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
          { path: "/", expires: d }
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
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={mapOptions}
        sx={{ width: 300 }}
        classes={{ inputRoot: "textfield" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Map"
            margin="normal"
            inputRef={map1Ref}
            InputLabelProps={{ className: "textfield" }}
            //InputProps={{ className: "textfield" }}
          />
        )}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={mapOptions}
        sx={{ width: 300 }}
        classes={{ inputRoot: "textfield" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Map"
            margin="normal"
            inputRef={map2Ref}
            InputLabelProps={{ className: "textfield" }}
            //InputProps={{ className: "textfield" }}
          />
        )}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={mapOptions}
        sx={{ width: 300 }}
        classes={{ inputRoot: "textfield" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Map"
            margin="normal"
            inputRef={map3Ref}
            InputLabelProps={{ className: "textfield" }}
            //InputProps={{ className: "textfield" }}
          />
        )}
      />
      <button onClick={create}>Create Session</button>
    </div>
  );
}

export default CreateSession;

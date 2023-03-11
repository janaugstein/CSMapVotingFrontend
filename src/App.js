import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();

  function joinSession() {
    navigate("/joinSession");
  }

  function createSession() {
    alert("createSession");
  }

  return (
    <div>
      <button onClick={createSession}>Create Session</button>
      <button onClick={joinSession}>Join Session</button>
    </div>
  );
}

export default App;

import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();

  function joinSession() {
    navigate("/joinSession");
  }

  function createSession() {
    navigate("/createSession");
  }

  return (
    <div className="homepage">
      <button onClick={createSession}>Create Session</button>
      <button onClick={joinSession}>Join Session</button>
    </div>
  );
}

export default App;

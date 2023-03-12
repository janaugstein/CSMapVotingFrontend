import "./App.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function App() {
  let navigate = useNavigate();
  const [cookies] = useCookies(["joined"]);

  function joinSession() {
    if (cookies.joined) {
      navigate("/voting");
    } else {
      navigate("/joinSession");
    }
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

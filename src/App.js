import "./App.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  let navigate = useNavigate();
  const [cookies] = useCookies(["cs_map_voting"]);

  function joinSession() {
    /*if (cookies.cs_map_voting) {
      navigate("/voting");
    } else {
      navigate("/joinSession");
    }*/
    navigate("/joinSession");
  }

  function createSession() {
    navigate("/createSession");
  }

  return (
    <div className="homepage">
      {/*<Header />*/}
      <button onClick={createSession}>Create Session</button>
      <button onClick={joinSession}>Join Session</button>
      {/*<Footer />*/}
    </div>
  );
}

export default App;

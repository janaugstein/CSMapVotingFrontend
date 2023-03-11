import "./App.css";

function createSession() {
  alert("createSession");
}

function joinSession() {
  alert("joinSession");
}

function App() {
  return (
    <div>
      <button onClick={createSession}>Create Session</button>
      <button onClick={joinSession}>Join Session</button>
    </div>
  );
}

export default App;

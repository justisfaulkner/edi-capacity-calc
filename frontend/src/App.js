import "./App.css";
import React, { useState } from "react";

function App() {
  const [existing, setExisting] = useState(0);
  const [newIntegrations, setNewIntegrations] = useState(0);
  const [concurrent, setConcurrent] = useState(0);
  const [totalTime, setTotalTime] = useState(null);

  const calculateTime = async (e) => {
    e.preventDefault();

    console.log(`${JSON.stringify(process.env)}`);
    console.log(process.env.REACT_APP_BACKEND_URL)

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/integrations/calculate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          existing: parseInt(existing),
          new: parseInt(newIntegrations),
          concurrent: parseInt(concurrent),
        }),
      }
    );

    const data = await response.json();
    setTotalTime(data.totalTime);
  };

  return (
    <div>
      <h1>Integration Capacity Calculator</h1>
      <form onSubmit={calculateTime}>
        <label>
          Existing Integrations:
          <input
            type="number"
            value={existing}
            onChange={(e) => setExisting(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          New Integrations:
          <input
            type="number"
            value={newIntegrations}
            onChange={(e) => setNewIntegrations(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Concurrent Integrations:
          <input
            type="number"
            value={concurrent}
            onChange={(e) => setConcurrent(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Calculate Time</button>
      </form>
      {totalTime !== null && <h2>Total Time: {totalTime.toFixed(2)} hours</h2>}
    </div>
  );
}

export default App;

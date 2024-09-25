import "./App.css";
import React, { useState } from "react";

function App() {
  const [people, setPeople] = useState([
    {
      name: "Tiago",
      existingIntegrations: 0,
      newIntegrations: 0,
      concurrent: 10,
      existingHours: 0,
      newHours: 0,
      totalHours: 0,
      availableHours: 496, // 62 working days * 8 hours/day
      timeBuffer: 0.4,
    },
    {
      name: "Ethan",
      existingIntegrations: 0,
      newIntegrations: 0,
      concurrent: 10,
      existingHours: 0,
      newHours: 0,
      totalHours: 0,
      availableHours: 120, // 12 work weeks * 10 hours/week
      timeBuffer: 0.1,
    },
    {
      name: "Tharun",
      existingIntegrations: 0,
      newIntegrations: 0,
      concurrent: 10,
      existingHours: 0,
      newHours: 0,
      totalHours: 0,
      availableHours: 320, // onboarding end sep, ramp oct, work nov + dev = 40 working days * 8 hours/day
      timeBuffer: 0.2,
    },
    {
      name: "Kowsayla",
      existingIntegrations: 0,
      newIntegrations: 0,
      concurrent: 10,
      existingHours: 0,
      newHours: 0,
      totalHours: 0,
      availableHours: 168, // onboarding end of oct, ramp nov, work dev = 21 working days * 8 hours/day
      timeBuffer: 0.2,
    },
  ]);

  // Function to calculate and update times automatically when inputs change
  const calculateTime = async (index) => {
    const person = people[index];

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/integrations/calculate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          existing: parseInt(person.existingIntegrations),
          new: parseInt(person.newIntegrations),
          concurrent: parseInt(person.concurrent),
        }),
      }
    );

    const data = await response.json();

    const updatedPeople = [...people];
    updatedPeople[index] = {
      ...person,
      existingHours: data.times.existingHours,
      newHours: data.times.newHours,
      totalHours: data.times.totalHours,
    };

    setPeople(updatedPeople);
  };

  function getStatus(person) {
    if (person.totalHours > person.availableHours) {
      return "IMPOSSIBLE";
    } else if (
      person.availableHours - person.timeBuffer * person.availableHours >
      person.totalHours
    ) {
      return "REASONABLE";
    } else {
      return "UNREASONABLE";
    }
  }

  // Handle input changes and trigger calculation automatically
  const handleInputChange = (index, field, value) => {
    const sanitizedValue = Math.max(0, parseInt(value) || 0);
    const updatedPeople = [...people];
    updatedPeople[index][field] = sanitizedValue;
    setPeople(updatedPeople);

    // Trigger the calculation after the state is updated
    calculateTime(index);
  };

  // Calculate totals for existing, new, and total integrations
  const totalExistingIntegrations = people.reduce(
    (sum, person) => sum + parseInt(person.existingIntegrations),
    0
  );
  const totalNewIntegrations = people.reduce(
    (sum, person) => sum + parseInt(person.newIntegrations),
    0
  );
  const totalIntegrations = totalExistingIntegrations + totalNewIntegrations;

  return (
    <div className="container">
      {/* Display bucket totals at the top */}
      <div className="bucket">
        {/* <h2>Total Integrations</h2> */}
        <div className="bucket-group">
          <p className="total-para">
            Existing Integrations
            <div className="total-number">{totalExistingIntegrations}</div>
          </p>
          <p className="total-para">
            New Integrations<div className="total-number">{totalNewIntegrations}</div>
          </p>
          <p className="total-para">
            Total Integrations<div className="total-number">{totalIntegrations}</div>
          </p>
        </div>
      </div>

      {/* Add flexbox for horizontal layout */}
      <div className="people-container">
        {people.map((person, index) => (
          <div key={index} className="person-card">
            <div className="person-section">
              <h2>{person.name}</h2>
              <p className="buffer">({person.timeBuffer * 100}% time buffer)</p>
              <label>
                Existing Integrations:
                <input
                  type="number"
                  value={person.existingIntegrations}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "existingIntegrations",
                      e.target.value
                    )
                  }
                  required
                />
              </label>
              <label>
                New Integrations:
                <input
                  type="number"
                  value={person.newIntegrations}
                  onChange={(e) =>
                    handleInputChange(index, "newIntegrations", e.target.value)
                  }
                  required
                />
              </label>
              <label>
                Concurrent Integrations:
                <input
                  type="number"
                  value={person.concurrent}
                  onChange={(e) =>
                    handleInputChange(index, "concurrent", e.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className="results">
              <p>
                Existing Time:{" "}
                {person.existingHours > 0 ? person.existingHours.toFixed(0) : 0}{" "}
                hours
              </p>
              <p>
                New Time: {person.newHours > 0 ? person.newHours.toFixed(0) : 0}{" "}
                hours
              </p>
              <p>
                Total Time:{" "}
                {person.totalHours > 0 ? person.totalHours.toFixed(0) : 0} hours
              </p>
              <p>Max Time Available: {person.availableHours} hours</p>
              <p className={`status ${getStatus(person).toLowerCase()}`}>
                {getStatus(person)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

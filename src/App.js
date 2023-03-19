import React, { useState } from "react";
import "./App.css";

function App() {
  // Define experiences state and setExperiences function
  const [experiences, setExperiences] = useState([
    { id: 1, name: "Visit the Eiffel Tower", duration: 1, day: "Monday" },
    { id: 2, name: "Take a Seine River cruise", duration: 1, day: "Tuesday" },
    { id: 3, name: "Visit the Louvre Museum", duration: 1, day: "Thursday" },
    { id: 4, name: "Explore Montmartre", duration: 1, day: "Saturday" },
    { id: 5, name: "Stroll around Notre-Dame Cathedral", duration: 1, day: "Sunday" },
  ]);

  // Define functions for adding, editing, and deleting experiences
  function handleAddExperience() {
    const newExperience = {
      id: Math.max(...experiences.map((experience) => experience.id)) + 1,
      name: "",
      duration: 1,
      day: "Monday",
    };
    setExperiences([...experiences, newExperience]);
  }

  function handleEditExperience(id, field, value) {
    const index = experiences.findIndex((experience) => experience.id === id);
    const updatedExperience = { ...experiences[index], [field]: value };
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1, updatedExperience);
    setExperiences(updatedExperiences);
  }

  function handleDeleteExperience(id) {
    const updatedExperiences = experiences.filter((experience) => experience.id !== id);
    setExperiences(updatedExperiences);
  }

  function handleDragStart(e, experienceIndex) {
    e.dataTransfer.setData("application/json", JSON.stringify(experienceIndex));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, dayName) {
    e.preventDefault();
    const experienceIndex = JSON.parse(e.dataTransfer.getData("application/json"));
    const draggedExperience = experiences[experienceIndex];

    const index = experiences.findIndex(
      (experience) => experience.id === draggedExperience.id
    );
    if (index !== -1) {
      experiences.splice(index, 1, { ...draggedExperience, day: dayName });
      setExperiences([...experiences]);
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Trip Calendar</h1>
        <div className="hotel-details">
          <div className="hotel-name">Hotel ABC</div>
          <div>Paris, France</div>
        </div>
      </header>
      <main>
        <div className="calendar">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((dayName) => (
            <div
              className="calendar-cell"
              key={dayName}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, dayName)}
            >

              <h2>{dayName}</h2>
              <div>
                {experiences
                  .filter((experience) => experience.day === dayName)
                  .map((experience, experienceIndex) => (
                    <div
                      className="experience-item"
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, experiences.indexOf(experience))
                      }
                      key={experience.id}
                      >
                        <p>{experience.name}</p>
                        <button onClick={() => handleDeleteExperience(experience.id)}>Delete</button>
                        <button onClick={() => handleEditExperience(experience)}>Edit</button>
                      </div>
                    ))}
                </div>
                <div>
                  <button onClick={() => handleAddExperience(dayName)}>Add Experience</button>
                </div>
              </div>
            ))}
          </div>
        <div className="hotel-form">
          <label htmlFor="hotel-name">Hotel Name:</label>
          <input type="text" id="hotel-name" />
        </div>
      </main>
    </div>
  );
}

export default App;

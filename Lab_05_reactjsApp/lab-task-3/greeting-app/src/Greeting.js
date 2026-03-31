import React from "react";

function Greeting({ name, timeOfDay, bgColor }) {
    let greeting;

    if (timeOfDay === "morning") {
        greeting = "Good Morning";
    } else if (timeOfDay === "afternoon") {
        greeting = "Good Afternoon";
    } else if (timeOfDay === "evening") {
        greeting = "Good Evening";
    } else {
        greeting = "Hello";
    }

    return (
        <div style={{ backgroundColor: bgColor || "#f0f0f0", padding: "20px", margin: "10px", borderRadius: "10px" }}>
            <h2>{greeting}, {name}!</h2>
            <p>Hope you're having a great {timeOfDay}!</p>
        </div>
    );
}

export default Greeting;
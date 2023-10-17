import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const betweenDays = (): number => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(2024, 2, 3);
  const secondDate = new Date();
  return Math.round(
    Math.abs((firstDate.valueOf() - secondDate.valueOf()) / oneDay)
  );
};

function App() {
  return (
    <main>
      <section id="main-heading-container">
        <header>
          <h1 className="main-heading">Katelyn & Alejandro</h1>

          <h3 className="main-info">MARCH 2, 2024 • LEXINGTON, SC</h3>
          <h3 className="main-info">{betweenDays()} DAYS TO GO!</h3>

          <h2 className="photo-service">Photo Service Coming Soon</h2>
        </header>

        <div className="info-container">
          <p>
            We want to capture moments of our special day and want you to be
            involved. Powered by AWS, we'll be able to store memories you make
            throughout the day.
          </p>

          <div className="info-scroll">
            <h3 className="info-scroll-heading">Swipe to get started</h3>
            <span>
              <FontAwesomeIcon icon={faArrowDown} bounce={true} size={"lg"} />
            </span>
          </div>
        </div>
      </section>
      <div className="spacer layer1"></div>
      <section id="main-content-container">
        <div className="main-content-photo-header">
          <label for="photo-capture" className="photo-capture-label">
            Capture image
          </label>
          <input
            type="file"
            name="photo-capture"
            id="photo-capture"
            accept="image/*"
            capture="environment"
          />
        </div>
      </section>
    </main>
  );
}

export default App;

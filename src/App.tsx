import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import PhotoCapture from "./PhotoCapture";
// const redirectLink = 'https://www.theknot.com/us/katelyn-terrell-and-alejandro-sierra-mar-2024'

const betweenDays = (): number => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(2024, 2, 3);
  const secondDate = new Date();
  return Math.round(
    Math.abs((firstDate.valueOf() - secondDate.valueOf()) / oneDay)
  );
};


function App() {
  const queryParams = new URLSearchParams(window.location.search)
  // @ts-ignore
  const userId: string = queryParams.get("userId")?.toString()
  // @ts-ignore:
  const name: string = queryParams.get("name")?.toString()
  // @ts-ignore:
  const apiKey: string = queryParams.get("apiKey")?.toString()

  localStorage.setItem('userId', userId)
  localStorage.setItem('name', name)
  localStorage.setItem('apiKey', apiKey)

  
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
            part of it. Powered by AWS, we'll be able to store memories you make
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
      <PhotoCapture />
    </main>
  );
}

export default App;

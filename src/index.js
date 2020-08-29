import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const localStorageKey = "tbPreferredColorScheme";

  const toggleStrings = {
    Sun: "☀︎",
    Moon: "☾"
  };

  const [darkMode, setDarkMode] = React.useState(getInitialMode());

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = { localStorageKey } in localStorage;
    const savedMode = JSON.parse(localStorage.getItem(localStorageKey));
    const userPrefersDark = getPreferredColorScheme();
    // if mode was saved --> dark / light
    if (isReturningUser) {
      return savedMode;
      // if preferred color scheme is dark --> dark
    } else if (userPrefersDark) {
      return true;
      // otherwise --> light
    } else {
      return false;
    }
    // return savedMode || false;
  }

  function getPreferredColorScheme() {
    if (!window.matchMedia) return;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <nav>
        <div className="toggle-container">
          <span style={{ color: darkMode ? "lightgrey" : "yellow" }}>
            {toggleStrings.Sun}
          </span>
          <span className="toggle">
            <input
              checked={darkMode}
              onChange={() => setDarkMode((prevMode) => !prevMode)}
              id="checkbox"
              className="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox" />
          </span>

          <span style={{ color: darkMode ? "yellow" : "lightgrey" }}>
            {toggleStrings.Moon}
          </span>
        </div>
      </nav>
      <main>
        <h1>{darkMode ? "Dark Mode" : "Light Mode"}</h1>
        <p>Schalte den Schalter, um etwas Magie zu sehen!</p>
      </main>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

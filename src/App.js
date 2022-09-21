import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DefaultLayout from "./DefaultLayout";
import Rockets from "./Components/Rockets/Rockets";
import { firebase } from "./lib/firebase.prod";
import { FirebaseContext } from "./context/firebase";

function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mission/:id"
            element={
              <DefaultLayout>
                <Rockets />
              </DefaultLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
}

export default App;

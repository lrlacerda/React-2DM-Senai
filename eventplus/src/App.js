import Rotas from "./Routes";
import { UserContext } from "./context/AuthContext";
import "./App.css";
import { useState } from "react";

const App = () => {
    const [userData, setUserData] = useState({});
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <Rotas />;
        </UserContext.Provider>
    );
};

export default App;

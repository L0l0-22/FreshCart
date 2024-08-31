import { createContext, useState } from "react";

export const Context = createContext('');

// eslint-disable-next-line react/prop-types
export default function ContextProvider({ children }) {
    const [UserToken, setUserToken] = useState(localStorage.getItem("token"));
    // useEffect(() => {
    //     if (localStorage.getItem("token") !== null) {
    //         setUserToken();
    //     }
    // }, []);

    return (
        <Context.Provider value={{ UserToken, setUserToken }}>
            {children}
        </Context.Provider>
    );
}
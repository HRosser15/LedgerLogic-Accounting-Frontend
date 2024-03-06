import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";

const ContextProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? { isLoggedIn: true, ...JSON.parse(storedUser) }
      : { isLoggedIn: false, username: "", role: "" };
  });

  useEffect(() => {
    console.log("Initial Context State in ContextProvider:", state);
  }, [state]);

  const contextValue = {
    state,
    setState,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;

// Commented out 2/27/2024 to test state
// import React, { useState, useEffect } from "react";
// import AppContext from "./AppContext";

// const ContextProvider = ({ children }) => {
//   const [state, setState] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser
//       ? { isLoggedIn: true, ...JSON.parse(storedUser) }
//       : { isLoggedIn: false, username: "", role: "" };
//   });

//   useEffect(() => {
//     console.log("Initial Context State in ContextProvider:", state);
//   }, [state]);

//   const contextValue = {
//     state,
//     setState,
//   };

//   return (
//     <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
//   );
// };

// export default ContextProvider;

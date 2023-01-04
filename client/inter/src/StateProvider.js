import React, {createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

// high order component that provides us some data layer functionality
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
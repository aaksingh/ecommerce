import React, {createContext, useContext, useReducer} from "react";

// Prepares the Datalayer
export const StateContext = createContext();

//Wrap our app and provide the Data Layer

export const StateProvider = ({reducer, initialState, children})=>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);


export const useStateValue = () => useContext(StateContext)


//understand later 
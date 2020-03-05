import React from 'react';

export default function (reducer, actions, initialState) {
    const Context = React.createContext(null);
    const Provider = ({ children }) => {
        const [state, dispatch] = React.useReducer(reducer, initialState);

        const boundActions = {};

        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>;
    };

    return { Context, Provider };
}
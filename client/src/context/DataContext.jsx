import {createContext, useContext, useState} from "react";

const DataContextTemp = createContext({})

export const DataContext = ({children}) => {
    const [dataByGroup, setDataByGroup] = useState(false)

    const contextValue = [
        dataByGroup,
        setDataByGroup
    ]

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}

export const queryData = () => {
    return useContext(DataContextTemp);
}
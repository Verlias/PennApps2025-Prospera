import {createContext, useContext, useState} from "react";

const MousePositionContext = createContext({});

// eslint-disable-next-line react/prop-types
export const MousePositionProvider = ({children}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <MousePositionContext.Provider value={mousePosition}>
            <div className="h-full w-full" onMouseMove={handleMouseMove}>
                {children}
            </div>
        </MousePositionContext.Provider>
    )
}

export const useMousePosition = () => {
    return useContext(MousePositionContext);
}
import {useMousePosition} from "../../context/MousePositionProvider.jsx";
import {BorderMarq} from "../../utils/BorderMarq.jsx";
import {useRef} from "react";




export const SignIn = () => {
    const mousePos = useMousePosition();
    const usernameRef = useRef(null);
    const pwdRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            username: usernameRef.current,
            password: pwdRef.current,
        }
        // TODO: API req here
    }

    return (
        <div className="w-full h-full bg-amber-50 flex items-center justify-center">
            <div className="w-full h-auto">
                <BorderMarq displacement={mousePos.x}/>
            </div>
            <form onSubmit={onSubmit} className="w-1/3 absolute bg-black bg-opacity-5 backdrop-blur-xl shadow-sm grid grid-rows-[40%_30%_30%] z-30 rounded-xl h-1/4 ">
                <div className="w-full h-full flex items-center pt-3 px-8 text-5xl font-serif ">
                    Sign in
                </div>
                <input ref={usernameRef} placeholder="Username" className="pl-8 placeholder:text-xl placeholder:text-gray-500 text-2xl w-full h-full transition-colors focus:bg-opacity-20 bg-black bg-opacity-0 focus:outline-none"></input>
                <input placeholder="Password" type="password" className="pl-8 placeholder:text-xl placeholder:text-gray-500 text-2xl w-full h-full transition-colors focus:bg-opacity-20 bg-black bg-opacity-0 focus:outline-none"></input>
                <input type="submit" className="hidden"/>
            </form>
        </div>
    )
}
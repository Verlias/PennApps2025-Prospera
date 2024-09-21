import {useMousePosition} from "../../context/MousePositionProvider.jsx";
import {useRef} from "react";
import {BorderMarq} from "../../utils/BorderMarq.jsx";

export const SignUp = () => {
    const mousePos = useMousePosition();
    const usernameRef = useRef();
    const emailRef = useRef(null);
    const pwdRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            username: usernameRef.current,
            email: emailRef,
            password: pwdRef.current,
        }
        // TODO: API req here
    }

    return (
        <div className="w-full h-full bg-amber-50 flex items-center justify-center">
            <div className="w-full h-auto">
                <BorderMarq displacement={mousePos.x}/>
            </div>
            <form onSubmit={onSubmit} className="w-1/3 absolute bg-black bg-opacity-5 backdrop-blur-xl shadow-sm grid grid-rows-[30%_23%_23%_24%] z-30 rounded-xl h-1/3 ">
                <div className="w-full h-full flex items-center pt-3 px-8 text-5xl font-serif ">
                    Sign up
                </div>
                <input placeholder="Username" className="pl-8 placeholder:text-gray-500 placeholder:text-xl text-2xl w-full h-full transition-colors focus:bg-opacity-20 bg-black bg-opacity-0 focus:outline-none"></input>
                <input ref={emailRef} placeholder="Email" type="email" className="pl-8 placeholder:text-xl placeholder:text-gray-500 text-2xl w-full h-full transition-colors focus:bg-opacity-20 bg-black bg-opacity-0 focus:outline-none"></input>
                <input placeholder="Password" type="password" className="pl-8 placeholder:text-xl placeholder:text-gray-500 text-2xl w-full h-full transition-colors focus:bg-opacity-20 bg-black bg-opacity-0 focus:outline-none"></input>
                <input type="submit" className="hidden"/>
            </form>
        </div>
    )
}
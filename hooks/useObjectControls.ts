import {useEffect, useState} from "react";

type Output = {
    keyUp: boolean;
    keyDown: boolean;
    keyRight: boolean;
    keyLeft: boolean;
    spaceKey: boolean;
    onKeyUpCallback?: (() => void) | undefined;
}
export const useObjectControls = (): Output => {

    const [keyUp, setKeyUp] = useState<boolean>(false);
    const [keyDown, setKeyDown] = useState<boolean>(false);
    const [keyRight, setKeyRight] = useState<boolean>(false);
    const [keyLeft, setKeyLeft] = useState<boolean>(false);
    const [spaceKey, setSpaceKey] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
        }
    }, []);

    const onKeyDown = (event: KeyboardEvent) => {
        event?.stopPropagation();
        switch (event.key) {
            case "ArrowRight":
                setKeyRight(true);
                break;
            case "d":
                setKeyRight(true);
                break;
            case "ArrowLeft":
                setKeyLeft(true);
                break;
            case "a":
                setKeyLeft(true);
                break;
            case "ArrowUp":
                setKeyUp(true);
                break;
            case "w":
                setKeyUp(true);
                break;
            case "ArrowDown":
                setKeyDown(true);
                break;
            case "s":
                setKeyDown(true);
                break;
            case " ":
                setSpaceKey(true);
                break;
            default:
                break;
        }
    };

    const onKeyUp = async (event: KeyboardEvent) => {
        event?.stopPropagation();
        switch (event.key) {
            case "ArrowRight":
                setKeyRight(false);
                break;
            case "d":
                setKeyRight(false);
                break;
            case "ArrowLeft":
                setKeyLeft(false);
                break;
            case "a":
                setKeyLeft(false);
                break;
            case "ArrowUp":
                setKeyUp(false);
                break;
            case "w":
                setKeyUp(false);
                break;
            case "ArrowDown":
                setKeyDown(false);
                break;
            case "s":
                setKeyDown(false);
                break;
            case " ":
                setSpaceKey(false);
                break;
            default:
                break;
        }
    };

    return {
        keyUp,
        keyDown,
        keyRight,
        keyLeft,
        spaceKey,
    };
}
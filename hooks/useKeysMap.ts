import {useMemo} from "react";
import {KeyboardControlsEntry} from "@react-three/drei";

export enum Controls {
    FORWARD = "forward",
    BACKWARD = "backward",
    LEFTWARD = "leftward",
    RIGHTWARD = "rightward",
    JUMP = "jump",
    RUN = "run",
    DANCE = "dance",
}

type Output = {
    keysMap: KeyboardControlsEntry<Controls>[];
}
export const useKeysMap = (): Output => {
    const cachedKeysMap = useMemo<KeyboardControlsEntry<Controls>[]>(
        () => [
            { name: Controls.FORWARD, keys: ["ArrowUp", "KeyW"] },
            { name: Controls.BACKWARD, keys: ["ArrowDown", "KeyS"] },
            { name: Controls.LEFTWARD, keys: ["ArrowLeft", "KeyA"] },
            { name: Controls.RIGHTWARD, keys: ["ArrowRight", "KeyD"] },
            { name: Controls.JUMP, keys: ["Space"] },
            { name: Controls.RUN, keys: ["Shift", "KeyX"] },
            { name: Controls.DANCE, keys: ["KeyT"] },
        ], []);

    return {
        keysMap: cachedKeysMap,
    };
};

import {useEffect, useState} from "react";

type OutputUseTimer = {
    minutes: number;
    seconds: number;
};
export const useTimer = (
    timeoutInMinutes: number,
    onTimeout?: (() => void) | undefined
): OutputUseTimer => {

    const [minutes, setMinutes] = useState<number>(timeoutInMinutes);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                    return;
                }
                setSeconds(59);
                setMinutes(minutes - 1);
                return;
            }
            setSeconds(seconds - 1);
        }, 1000);

        if (minutes === 0 && seconds === 0 && onTimeout) {
            onTimeout();
        }

        return () => clearInterval(interval);
    }, [seconds]);

    return {
        minutes,
        seconds,
    }
};

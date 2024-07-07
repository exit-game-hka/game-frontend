import {useEffect, useState} from "react";

const CURRENT_TIMEOUT_LOCAL_STORAGE_KEY = "current-timeout";

type OutputUseTimer = {
    minutes: number;
    seconds: number;
};
export const useTimer = (
    timeoutInMinutes: number,
    onTimeout?: (() => void) | undefined
): OutputUseTimer => {

    const [minutes, setMinutes] = useState<number | undefined>(undefined);
    const [seconds, setSeconds] = useState<number | undefined>(undefined);

    useEffect(() => {
        const getCurrentTimeoutFromLocalStorage = () => {
            const timeoutFromLocalStorage = localStorage.getItem(CURRENT_TIMEOUT_LOCAL_STORAGE_KEY);
            if (!timeoutFromLocalStorage || timeoutFromLocalStorage === "") return;
            const [minutesFromLocalStorage, secondsFromLocalStorage] = timeoutFromLocalStorage.split(":").map(Number);
            if (isNaN(minutesFromLocalStorage) || isNaN(secondsFromLocalStorage)) {
                setMinutes(timeoutInMinutes);
                setSeconds(0);
                return;
            }
            if (minutesFromLocalStorage === 0 && secondsFromLocalStorage === 0) {
                setMinutes(timeoutInMinutes);
                setSeconds(0);
                return;
            }
            setMinutes(minutesFromLocalStorage);
            setSeconds(secondsFromLocalStorage);
        }
        getCurrentTimeoutFromLocalStorage();
    }, [timeoutInMinutes]);

    useEffect(() => {
        const saveCurrentTimeoutToLocalStorage = () => {
            if (typeof window === "undefined") return;
            localStorage.setItem(CURRENT_TIMEOUT_LOCAL_STORAGE_KEY, `${minutes}:${seconds}`);
        }

        const interval = setInterval(() => {
            if (minutes === undefined || seconds === undefined) return;

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
            saveCurrentTimeoutToLocalStorage();
        }, 1000);

        if (minutes === 0 && seconds === 0 && onTimeout) {
            onTimeout();
        }

        return () => clearInterval(interval);
    }, [seconds]);

    return {
        minutes: minutes ?? 0,
        seconds: seconds ?? 0,
    }
};

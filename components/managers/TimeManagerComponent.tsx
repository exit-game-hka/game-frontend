"use client";
import React, {useEffect, useMemo} from 'react';
import {TimerTotalTimeToPlayComponent} from "@/components/TimerTotalTimeToPlayComponent";
import {useGlobalStore} from "@/store/useGlobalStore";
import useSWR from "swr";
import {Aufgabe} from "@/api/aufgabe";
import {useRouter} from "next/navigation";

const TimeManagerComponent: React.FC = () => {
    const router = useRouter();
    const getAllAufgaben = useGlobalStore((state) => state.getAllAufgaben);
    const setTotalTimeToPlay = useGlobalStore((state) => state.setTotalTimeToPlay);

    const {
        data: aufgaben,
        isLoading,
        error,
    } = useSWR<Aufgabe[]>("getAllAufgaben", getAllAufgaben);

    const timeout: number = useMemo((): number => {
        return aufgaben?.reduce((acc: number, curr: Aufgabe) => acc + curr.zeitZuLoesen, 0)!;
    }, [aufgaben]);

    useEffect(() => {
        if (!timeout) return;
        setTotalTimeToPlay(timeout);
    }, [timeout]);

    const handleTimeout = () => {
        alert("Die Zeit zum Spielen ist um!");
        router.push("/intro");
    };

    if (isLoading || !aufgaben) return null;

    if (error) {
        console.error("TimeManagerComponent konnte nicht geladen werden.", error);
        return null;
    }

    return (
        <TimerTotalTimeToPlayComponent timeoutInMinute={timeout} onTimeout={handleTimeout} />
    );
};

export default TimeManagerComponent;

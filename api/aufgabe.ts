import {Loesung} from "@/api/loesung";
import {Gegenstand} from "@/api/gegenstand";
import {axiosClient} from "@/api/httpClient";
import {AxiosResponse} from "axios";

export type Aufgabe = {
    id: string;
    raumId: string;
    wert: string;
    zeitZuLoesen: number;
    beschreibung: string;
    erfolgMeldung: string;
    fehlschlagMeldung: string;
    loesungen: Loesung[];
    gegenstaende: Gegenstand[];
}

export const getTaskByIdApi = async (id: string): Promise<AxiosResponse<Aufgabe>> => {
    return await axiosClient.get<Aufgabe>(`/aufgaben/${id}`);
}

export const getAllTasksApi = async (): Promise<AxiosResponse<Aufgabe[]>> => {
    return await axiosClient.get<Aufgabe[]>("/aufgaben/alle");
};
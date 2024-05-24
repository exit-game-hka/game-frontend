import {Aufgabe} from "@/api/aufgabe";
import {AxiosResponse} from "axios";
import {axiosClient} from "@/api/httpClient";

export type Raum = {
    id: string;
    name: string;
    beschreibung: string;
    aufgaben: Aufgabe[];
}

export const getRoomByIdApi = async (id: string): Promise<AxiosResponse<Raum>> => {
    return await axiosClient.get<Raum>(`/raeume/${id}`);
}

export const getAllRoomsApi = async (): Promise<AxiosResponse<Raum[]>> => {
    return await axiosClient.get<Raum[]>("/raeume/alle");
}

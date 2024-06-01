import {AxiosResponse} from "axios";
import {axiosClient} from "@/api/httpClient";

export type Veranstaltung = {
    id: string;
    name: string;
    bezeichnung: string;
    beschreibung: string;
};

const ENDPOINT = "/veranstaltung" as const;

export const getVeranstaltungByIdApi = async (id: string): Promise<AxiosResponse<Veranstaltung>> => {
    return await axiosClient.get<Veranstaltung>(`${ENDPOINT}/${id}`);
};

export const getAllVeranstaltungenApi = async (): Promise<AxiosResponse<Veranstaltung[]>> => {
    return await axiosClient.get<Veranstaltung[]>(`${ENDPOINT}/alle`);
};

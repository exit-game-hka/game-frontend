import {AxiosResponse} from "axios";
import {axiosClient} from "@/api/httpClient";

export type Spieler = {
    id: string;
    spielerId: string;
    semesterId: string;
    veranstaltungId: string;
};

const ENDPOINT = "/spieler" as const;

export const getSpielerBySpielerIdApi = async (avatarName: string): Promise<AxiosResponse<Spieler>> => {
    const encodedQueryParam = encodeURIComponent(avatarName);
    return await axiosClient.get<Spieler>(`${ENDPOINT}?spieler_id=${encodedQueryParam}`);
};

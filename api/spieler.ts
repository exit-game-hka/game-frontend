import {AxiosResponse} from "axios";
import {axiosClient} from "@/api/httpClient";

export type Spieler = {
    id: string;
    avatarName: string;
    semesterId: string;
    veranstaltungId: string;
};

const ENDPOINT = "/spieler" as const;

export const getSpielerByAvatarNameApi = async (avatarName: string): Promise<AxiosResponse<Spieler>> => {
    const encodedQueryParam = encodeURIComponent(avatarName);
    return await axiosClient.get<Spieler>(`${ENDPOINT}?avatar_name=${encodedQueryParam}`);
};

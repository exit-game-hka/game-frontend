import {AxiosResponse} from "axios";
import {axiosClient} from "@/api/httpClient";

type FrontendUser = {
    id: string;
    username: string;
    password: string;
};

type FrontendUserDto = Omit<FrontendUser, "id">;

const ENDPOINT = "/frontend-users" as const;

export const getPasswordHashApi = async (frontendUser: string): Promise<AxiosResponse<string>> => {
    return await axiosClient.get<string>(`${ENDPOINT}/${frontendUser}`);
};

import {AxiosResponse} from "axios";
import {axiosClient} from "@/api/httpClient";

export type Semester = {
    id: string;
    start: Date;
    ende: Date;
    bezeichnung: string;
};

const ENDPOINT = "/semester" as const;

export const getSemesterByIdApi = async (id: string): Promise<AxiosResponse<Semester>> => {
    return await axiosClient.get<Semester>(`${ENDPOINT}/${id}`);
};

export const getAllSemesterApi = async (): Promise<AxiosResponse<Semester[]>> => {
    return await axiosClient.get<Semester[]>(`${ENDPOINT}/alle`);
};

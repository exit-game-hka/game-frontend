import {ThreeEvent} from "@react-three/fiber/dist/declarations/src/core/events";
import React, {createContext, PropsWithChildren, ReactNode} from "react";
import {ThreeElements} from "@react-three/fiber";
import {AnimationActions} from "@/context/AnimationContext";
import {Aufgabe, getAllTasksApi, getTaskByIdApi} from "@/api/aufgabe";
import {getAllRoomsApi, getRoomByIdApi, Raum} from "@/api/raum";
import {UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR} from "@/app/contants";
import {getSpielerBySpielerIdApi, Spieler} from "@/api/spieler";
import {usePathname, useRouter} from "next/navigation";
import {
    createStatusApi,
    getStatusBySemesterIdApi,
    getStatusBySpielerIdApi,
    Status,
    StatusDto,
    updateStatusApi
} from "@/api/status";
import {
    createErgebnisApi,
    Ergebnis,
    ErgebnisDto,
    getErgebnisByAufgabeIdAndSpielerIdApi,
    getErgebnisBySemesterIdApi
} from "@/api/ergebnis";

export type PropsModelComponent = Omit<Partial<ThreeElements["object3D"]>, "args" | "onUpdate"> & {
    setAnimationActions?: ((actions: AnimationActions) => void) | undefined;
    args?: any;
    //onUpdate?: (event: ThreeEvent) => void;
    onUpdate?: any;
};

export type Coordinate = [
    x: number,
    y: number,
    z: number,
]

export type InteractiveObjectComponent = {
    onClick?: (event: ThreeEvent<MouseEvent>) => void
}

export type ButtonType = {
    label: string;
    icon?: ReactNode;
    isActive?: boolean | undefined;
    disabled?: boolean | undefined;
    onClick?: (() => void) | undefined;
}

type ContextOutput = {


    getSpielerBySpielerId: (spielerId: string) => Promise<Spieler>;
    setSpieler: (spieler: Spieler) => void;
    removeSpieler: () => void;
    getStatusBySpielerId: (id: string) => Promise<Status>;
    getStatusBySemesterId: (id: string) => Promise<Status>;
    createStatus: (statusDto: StatusDto) => Promise<void>;
    updateStatus: (status: Status) => Promise<void>;
    // Ergebnis
    getErgebnisByAufgabeIdAndSpielerId: (aufgabeId: string, spielerId: string) => Promise<Ergebnis>;
    getErgebnisBySemesterId: (id: string) => Promise<Ergebnis[]>;
    createErgebnis: (ergebnisDto: ErgebnisDto) => Promise<void>;
}

// @ts-ignore
export const ApplicationContext = createContext<ContextOutput>({});

type Props = PropsWithChildren;

export const ApplicationContextProvider: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const router = useRouter();
    const pathname = usePathname();

    // useEffect(() => {
    //     const playerFromLocalStorage = localStorage.getItem("player");
    //     if (!playerFromLocalStorage && pathname !== "/") {
    //         router.push("/login");
    //     }
    // }, [pathname]);

    const setSpieler = (spielerToSave: Spieler) => {
        localStorage.setItem("player", JSON.stringify(spielerToSave));
    }

    const removeSpieler = () => {
        localStorage.removeItem("player");
    }

    const getRoomById = async (id: string): Promise<Raum> => {
        const response = await getRoomByIdApi(id);
        return response.data;
    }

    const getAllRooms = async (): Promise<Raum[]> => {
        const response = await getAllRoomsApi();
        return response.data;
    }

    const getSpielerBySpielerId = async (spielerId: string): Promise<Spieler> => {
        const response = await getSpielerBySpielerIdApi(spielerId);
        return response.data;
    }

    const getStatusBySpielerId = async (id: string): Promise<Status> => {
        const response = await getStatusBySpielerIdApi(id);
        return response.data;
    }

    const getStatusBySemesterId = async (id: string): Promise<Status> => {
        const response = await getStatusBySemesterIdApi(id);
        return response.data;
    }

    const createStatus = async (statusDto: StatusDto): Promise<void> => {
        const response = await createStatusApi(statusDto);
        return response.data;
    }

    const updateStatus = async (status: Status): Promise<void> => {
        await updateStatusApi(status);
    }

    // Ergebnis
    const getErgebnisByAufgabeIdAndSpielerId = async (aufgabeId: string, spielerId: string): Promise<Ergebnis> => {
        const response = await getErgebnisByAufgabeIdAndSpielerIdApi(aufgabeId, spielerId);
        return response.data;
    }

    const getErgebnisBySemesterId = async (id: string): Promise<Ergebnis[]> => {
        const response = await getErgebnisBySemesterIdApi(id);
        return response.data;
    }

    const createErgebnis = async (ergebnisDto: ErgebnisDto): Promise<void> => {
        await createErgebnisApi(ergebnisDto);
    }

    return (
        <ApplicationContext.Provider value={{
            //avatar: selectedAvatar,
            //setAvatar: setSelectedAvatar,
            // getAufgabeById,
            // getAllAufgaben,
            //getRoomById,
            //getAllRooms,
            getSpielerBySpielerId,
            setSpieler,
            removeSpieler,
            getStatusBySpielerId,
            getStatusBySemesterId,
            createStatus,
            updateStatus,
            getErgebnisByAufgabeIdAndSpielerId,
            getErgebnisBySemesterId,
            createErgebnis,
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export const convertMinutesToMilliseconds = (minutes: number) => {
    return (minutes / 60) * UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR;
}


import {ThreeEvent} from "@react-three/fiber/dist/declarations/src/core/events";
import React, {
    ComponentType,
    createContext,
    ForwardRefExoticComponent,
    PropsWithChildren,
    ReactNode,
    RefAttributes,
    useEffect,
    useState
} from "react";
import {ThreeElements} from "@react-three/fiber";
import {AnimationActions} from "@/context/AnimationContext";
import {Aufgabe, getAllTasksApi, getTaskByIdApi} from "@/api/aufgabe";
import {getAllRoomsApi, getRoomByIdApi, Raum} from "@/api/raum";
import {UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR} from "@/app/contants";
import {useAvatars} from "@/hooks/useAvatars";
import {getSpielerBySpielerIdApi, Spieler} from "@/api/spieler";
import {usePathname, useRouter} from "next/navigation";

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

export type AvatarItem = {
    name: string;
    model: AvatarType;
    thumbnail: string;
    onClick?: (() => void) | undefined;
};

export type AvatarType = ComponentType<PropsModelComponent> | ForwardRefExoticComponent<RefAttributes<any>>;

type ContextOutput = {
    avatar: AvatarItem;
    setAvatar: (avatar: AvatarItem) => void;
    getAufgabeById: (id: string) => Promise<Aufgabe>;
    getAllAufgaben: () => Promise<Aufgabe[]>;
    getRoomById: (id: string) => Promise<Raum>;
    getAllRooms: () => Promise<Raum[]>;
    getSpielerBySpielerId: (spielerId: string) => Promise<Spieler>;
    spieler: Spieler  | undefined;
    saveSpieler: (spieler: Spieler) => void;
}

// @ts-ignore
export const ApplicationContext = createContext<ContextOutput>({});

type Props = PropsWithChildren;

export const ApplicationContextProvider: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const {
        selectedAvatar,
        setSelectedAvatar,
    } = useAvatars();
    const router = useRouter();
    const pathname = usePathname();
    const [spieler, setSpieler] = useState<Spieler>();

    useEffect(() => {
        const playerFromLocalStorage = localStorage.getItem("player");
        if (!playerFromLocalStorage) return;
        const player = JSON.parse(playerFromLocalStorage) as Spieler;
        setSpieler(player);
    }, []);

    useEffect(() => {
        const playerFromLocalStorage = localStorage.getItem("player");
        if (!playerFromLocalStorage && pathname !== "/") {
            router.push("/login");
        };
    }, [pathname]);

    const saveSpieler = (spielerToSave: Spieler) => {
        localStorage.setItem("player", JSON.stringify(spielerToSave));
        setSpieler(spielerToSave);
    }

    const getAufgabeById = async (id: string): Promise<Aufgabe> => {
        const response = await getTaskByIdApi(id);
        return response.data;
    }

    const getAllAufgaben = async (): Promise<Aufgabe[]> => {
        const response = await getAllTasksApi();
        return response.data;
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

    return (
        <ApplicationContext.Provider value={{
            avatar: selectedAvatar,
            setAvatar: setSelectedAvatar,
            getAufgabeById,
            getAllAufgaben,
            getRoomById,
            getAllRooms,
            getSpielerBySpielerId,
            spieler,
            saveSpieler,
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export const convertMinutesToMilliseconds = (minutes: number) => {
    return (minutes / 60) * UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR;
}


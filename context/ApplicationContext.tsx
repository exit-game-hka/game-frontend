import {ThreeEvent} from "@react-three/fiber/dist/declarations/src/core/events";
import React, {
    ComponentType,
    createContext,
    ForwardRefExoticComponent,
    PropsWithChildren,
    ReactNode,
    RefAttributes, useState
} from "react";
import {ThreeElements} from "@react-three/fiber";
import {AnimationActions} from "@/context/AnimationContext";
import {Aufgabe, getAllTasksApi, getTaskByIdApi} from "@/api/aufgabe";
import {getAllRoomsApi, getRoomByIdApi, Raum} from "@/api/raum";
import {UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR} from "@/app/contants";
import {useAvatars} from "@/hooks/useAvatars";
import {ModalProps} from "@/components/shared/TaskModalComponent";

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
    modalProps: ModalProps;
    setModalProps: (props: ModalProps) => void;
    getAufgabeById: (id: string) => Promise<Aufgabe>;
    getAllAufgaben: () => Promise<Aufgabe[]>;
    getRoomById: (id: string) => Promise<Raum>;
    getAllRooms: () => Promise<Raum[]>;
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

    const [modalProps, setModalProps] = useState<ModalProps>({ open: false });

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

    return (
        <ApplicationContext.Provider value={{
            avatar: selectedAvatar,
            setAvatar: setSelectedAvatar,
            modalProps,
            setModalProps,
            getAufgabeById,
            getAllAufgaben,
            getRoomById,
            getAllRooms,
        }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export const convertMinutesToMilliseconds = (minutes: number) => {
    return (minutes / 60) * UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR;
}


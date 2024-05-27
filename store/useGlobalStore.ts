import {create, StateCreator} from "zustand";
import {ComponentType, ForwardRefExoticComponent, ReactNode, RefAttributes} from "react";
import {Amy} from "@/components/avatars/Amy";
import {Leonard} from "@/components/avatars/Loenard";
import {Aufgabe, getAllTasksApi, getTaskByIdApi} from "@/api/aufgabe";
import {getAllRoomsApi, getRoomByIdApi, Raum} from "@/api/raum";
import {getSpielerBySpielerIdApi, Spieler} from "@/api/spieler";
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
import {UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR} from "@/app/contants";
import {ThreeElements} from "@react-three/fiber";
import {AnimationAction} from "three";
import {
    createInteraktionApi,
    getInteraktionBySpielerIdAndAufgabeIdApi,
    Interaktion,
    InteraktionDto
} from "@/api/interaktion";
import {createKommentarApi, KommentarDto} from "@/api/kommentar";

// Zustand Doc: https://github.com/pmndrs/zustand
// Avatar store

type AvatarStore = {
    avatarList: AvatarItem[];
    selectedAvatar: AvatarItem;
    setSelectedAvatar: (avatar: AvatarItem) => void;
};
const INITIAL_AVATAR_LIST: AvatarItem[] = [
    {
        name: "Amy",
        model: Amy,
        thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/amy/thumbnail.png`,
    },
    {
        name: "Leonard",
        model: Leonard,
        thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/leonard/thumbnail.png`,
    },
];

const useAvatarStoreSlice: StateCreator<AvatarStore> = (set) => ({
    avatarList: INITIAL_AVATAR_LIST,
    selectedAvatar: INITIAL_AVATAR_LIST[0],
    setSelectedAvatar: (newAvatar: AvatarItem) => set(() => ({ selectedAvatar: newAvatar })),
});

// Aufgabe store

type AufgabeStore = {
    getAufgabeById: (id: string) => Promise<Aufgabe>;
    getAllAufgaben: () => Promise<Aufgabe[]>;
};
const useAufgabeStoreSlice: StateCreator<AufgabeStore> = () => ({
    getAufgabeById: async (id: string): Promise<Aufgabe> => {
        const response = await getTaskByIdApi(id);
        return response.data;
    },
    getAllAufgaben: async (): Promise<Aufgabe[]> => {
        const response = await getAllTasksApi();
        return response.data;
    },
});

// Room store

type RoomStore = {
    getRoomById: (id: string) => Promise<Raum>;
    getAllRooms: () => Promise<Raum[]>;
};
const useRoomStoreSlice: StateCreator<RoomStore> = () => ({
    getRoomById: async (id: string): Promise<Raum> => {
        const response = await getRoomByIdApi(id);
        return response.data;
    },
    getAllRooms: async (): Promise<Raum[]> => {
        const response = await getAllRoomsApi();
        return response.data;
    },
});

// Spieler store

type SpielerStore = {
    getSpielerBySpielerId: (spielerId: string) => Promise<Spieler>;
    getSpielerFromLocalStorage: () => Spieler | undefined | null;
    setSpieler: (spieler: Spieler) => void;
    removeSpieler: () => void;
};
const useSpielerStoreSlice: StateCreator<SpielerStore> = () => ({
    getSpielerBySpielerId: async (spielerId: string): Promise<Spieler> => {
        const response = await getSpielerBySpielerIdApi(spielerId);
        return response.data;
    },
    getSpielerFromLocalStorage: () => JSON.parse(localStorage.getItem("player") as string) as Spieler | undefined,
    setSpieler: (spielerToSave: Spieler) => {
        localStorage.setItem("player", JSON.stringify(spielerToSave));
    },
    removeSpieler: () => {
        localStorage.removeItem("player");
    },
});

// Status store
type StatusStore = {
    getStatusBySpielerId: (id: string) => Promise<Status>;
    getStatusBySemesterId: (id: string) => Promise<Status>;
    createStatus: (statusDto: StatusDto) => Promise<void>;
    updateStatus: (status: Status) => Promise<void>;
};
const useStatusStoreSlice: StateCreator<StatusStore> = () => ({
    getStatusBySpielerId: async (id: string): Promise<Status> => {
        const response = await getStatusBySpielerIdApi(id);
        return response.data;
    },
    getStatusBySemesterId: async (id: string): Promise<Status> => {
        const response = await getStatusBySemesterIdApi(id);
        return response.data;
    },
    createStatus: async (statusDto: StatusDto): Promise<void> => {
        const response = await createStatusApi(statusDto);
        return response.data;
    },
    updateStatus: async (status: Status): Promise<void> => {
        await updateStatusApi(status);
    },
});

// Ergebnis store

type ErgebnisStore = {
    getErgebnisByAufgabeIdAndSpielerId: (aufgabeId: string, spielerId: string) => Promise<Ergebnis[]>;
    getErgebnisBySemesterId: (id: string) => Promise<Ergebnis[]>;
    createErgebnis: (ergebnisDto: ErgebnisDto) => Promise<void>;
};
const useErgebnisStoreSlice: StateCreator<ErgebnisStore> = () => ({
    getErgebnisByAufgabeIdAndSpielerId: async (aufgabeId: string, spielerId: string): Promise<Ergebnis[]> => {
        const response = await getErgebnisByAufgabeIdAndSpielerIdApi(aufgabeId, spielerId);
        return response.data;
    },
    getErgebnisBySemesterId: async (id: string): Promise<Ergebnis[]> => {
        const response = await getErgebnisBySemesterIdApi(id);
        return response.data;
    },
    createErgebnis: async (ergebnisDto: ErgebnisDto): Promise<void> => {
        await createErgebnisApi(ergebnisDto);
    },
});

// Three.js animation store

type AnimationStore = {
    animations: ObjectAnimation[];
    addAnimation: (animation: ObjectAnimation) => void;
    resetToDefaultAnimation: (objectId: string) => void;
    playAnimationAction: (objectId: string, actionName: AnimationActionType, repetitions?: number) => void;
};
const useAnimationStoreSlice: StateCreator<AnimationStore> = (set, get) => ({
    animations: [],
    addAnimation: (animation: ObjectAnimation) => set((state) => ({ animations: [...state.animations, animation] })),
    resetToDefaultAnimation: (objectId: string) => {
        stopAllAnimationActionsOfObject(objectId, get().animations);
        validateAndPlayAnimationAction(objectId, get().animations, DEFAULT_ANIMATION);
    },
    playAnimationAction: (objectId: string, actionName: AnimationActionType, repetitions?: number) => {
        stopAllAnimationActionsOfObject(objectId, get().animations);
        validateAndPlayAnimationAction(objectId, get().animations, actionName, repetitions);
    },
});

// Interaktion store

type InteraktionStore = {
    getInteraktionBySpielerIdAndAufgabeId: (spielerId: string, aufgabeId: string) => Promise<Interaktion[]>;
    createInteraktion: (interaktionDto: InteraktionDto) => Promise<void>;
};
const useInteraktionStoreSlice: StateCreator<InteraktionStore> = () => ({
    getInteraktionBySpielerIdAndAufgabeId: async (spielerId: string, aufgabeId: string): Promise<Interaktion[]> => {
        const response = await getInteraktionBySpielerIdAndAufgabeIdApi(spielerId, aufgabeId);
        return response.data;
    },
    createInteraktion: async (interaktionDto: InteraktionDto): Promise<void> => {
        await createInteraktionApi(interaktionDto);
    },
});

// Time Store

// Zeiteinheit in Minuten
type TimeStore = {
    totalTimeToPlay: number;
    setTotalTimeToPlay: (time: number) => void;
    timeToEscapeCurrentRoom: number;
    setTimeToEscapeCurrentRoom: (time: number) => void;
}
const useTimeStoreSlice: StateCreator<TimeStore> = (set) => ({
    totalTimeToPlay: 0,
    setTotalTimeToPlay: (time: number) => set(() => ({ totalTimeToPlay: time })),
    timeToEscapeCurrentRoom: 0,
    setTimeToEscapeCurrentRoom: (time: number) => set(() => ({ timeToEscapeCurrentRoom: time })),
});

// Kommentar store
type KommentarStore = {
    createKommentar: (kommentarDto: KommentarDto) => Promise<void>;
}
const useKommentarStoreSlice: StateCreator<KommentarStore> = () => ({
    createKommentar: async (kommentarDto: KommentarDto): Promise<void> => {
        await createKommentarApi(kommentarDto);
    },
});

type GlobalStore =
    AvatarStore &
    AufgabeStore &
    RoomStore &
    SpielerStore &
    StatusStore &
    ErgebnisStore &
    AnimationStore &
    InteraktionStore &
    TimeStore &
    KommentarStore;
export const useGlobalStore = create<GlobalStore>((...fn) => ({
    ...useAvatarStoreSlice(...fn),
    ...useAufgabeStoreSlice(...fn),
    ...useRoomStoreSlice(...fn),
    ...useSpielerStoreSlice(...fn),
    ...useStatusStoreSlice(...fn),
    ...useErgebnisStoreSlice(...fn),
    ...useAnimationStoreSlice(...fn),
    ...useInteraktionStoreSlice(...fn),
    ...useTimeStoreSlice(...fn),
    ...useKommentarStoreSlice(...fn),
}));

// Global stateless content (Types, Functions, etc...)

export type AvatarItem = {
    name: string;
    model: AvatarType;
    thumbnail: string;
    onClick?: (() => void) | undefined;
};

export type AvatarType = ComponentType<PropsModelComponent> | ForwardRefExoticComponent<RefAttributes<any>>;

const SECONDS_IN_A_MINUTE = 60;

export const convertMinutesToMilliseconds = (minutes: number): number => {
    return (minutes / SECONDS_IN_A_MINUTE) * UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR;
}

export const convertMillisecondsToMinutes = (milliseconds: number): number => {
    return milliseconds / (UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR * SECONDS_IN_A_MINUTE);
}

export type ButtonType = {
    label: string;
    icon?: ReactNode;
    isActive?: boolean | undefined;
    disabled?: boolean | undefined;
    onClick?: (() => void) | undefined;
};

export type PropsModelComponent = Omit<Partial<ThreeElements["object3D"]>, "args" | "onUpdate"> & {
    setAnimationActions?: ((actions: AnimationActions) => void) | undefined;
    args?: any;
    //onUpdate?: (event: ThreeEvent) => void;
    onUpdate?: any;
};

export type AnimationActionType = "idle" | "run" | "jump" | "angry" | "defeated" | "celebration_chicken_dance";

const DEFAULT_ANIMATION: AnimationActionType = "idle" as const;

export type AnimationActions = {
    [p: string]: AnimationAction | null;
};

export type ObjectAnimation = {
    id: string;
    animationActions: AnimationActions;
};

const stopAllAnimationActionsOfObject = (objectId: string, animations: ObjectAnimation[])  => {
    const animation = animations.find(a => a.id === objectId);
    if (!animation) {
        console.error(`Object with ID ${objectId} was not found. So no animation will be played`);
        return;
    }
    Object.entries(animation.animationActions).forEach(([_, action]) => {
        // @ts-ignore
        action?.stop();
    });
}

const validateAndPlayAnimationAction = (objectId: string,  animations: ObjectAnimation[], actionName: AnimationActionType, repetitions?: number) => {
    const animation = animations.find(a => a.id === objectId);
    if (!animation) {
        console.error(`Object with ID ${objectId} was not found. So no animation will be played`);
        return;
    }
    if (repetitions) {
        animation.animationActions[actionName]?.setLoop(2200, repetitions);
    }
    animation.animationActions[actionName]?.play();
};

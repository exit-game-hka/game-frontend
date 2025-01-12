import {create, StateCreator} from "zustand";
import {ComponentType, ForwardRefExoticComponent, ReactNode, RefAttributes} from "react";
import {Megan} from "@/components/avatars/Megan";
import {Aufgabe, getAllTasksApi, getTaskByIdApi} from "@/api/aufgabe";
import {getAllRoomsApi, getRoomByIdApi, Raum} from "@/api/raum";
import {createSpielerApi, getSpielerBySpielerIdApi, Spieler, SpielerDto} from "@/api/spieler";
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
    getErgebnisBySemesterIdApi, getErgebnisBySpielerIdApi
} from "@/api/ergebnis";
import {UNIX_TIME_TO_JAVASCRIPT_TIME_FACTOR} from "@/app/contants";
import {ThreeElements} from "@react-three/fiber";
import {AnimationAction} from "three";
import {
    createInteraktionApi,
    getInteraktionBySpielerIdAndAufgabeIdApi, getInteraktionBySpielerIdApi,
    Interaktion,
    InteraktionDto
} from "@/api/interaktion";
import {createKommentarApi, KommentarDto} from "@/api/kommentar";
import {getAllSemesterApi, getSemesterByIdApi, Semester} from "@/api/semester";
import {getAllVeranstaltungenApi, getVeranstaltungByIdApi, Veranstaltung} from "@/api/veranstaltung";
import {Mousey} from "@/components/avatars/Mousey";
import {Prisoner} from "@/components/avatars/Prisoner";
import {Alex} from "@/components/avatars/Alex";
import {SportyGranny} from "@/components/avatars/SportyGranny";
// import {David} from "@/components/avatars/David";
import webSocketClient, {WEBSOCKET_SEND_NOTIFICATION_ENDPOINT} from "@/api/webSocketClient";
import {Client} from "@stomp/stompjs";
import {NotificationDto} from "@/api/notification";
import {AxiosResponse} from "axios";

// Zustand Doc: https://github.com/pmndrs/zustand
// Avatar store

type AvatarStore = {
    avatarList: AvatarItem[];
    selectedAvatar: AvatarItem;
    setSelectedAvatar: (avatar: AvatarItem) => void;
};
const INITIAL_AVATAR_LIST: AvatarItem[] = [
    {
        name: "Megan",
        model: Megan,
        thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/megan/thumbnail.png`,
    },
    // {
    //     name: "Lewis",
    //     model: Lewis,
    //     thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/lewis/thumbnail.png`,
    // },
    // {
    //     name: "Maria",
    //     model: Maria,
    //     thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/maria/thumbnail.png`,
    // },
    {
        name: "Mousey",
        model: Mousey,
        thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/mousey/thumbnail.png`,
    },
    {
        name: "Häftling",
        model: Prisoner,
        thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/prisoner/thumbnail.png`,
    },
    {
        name: "Alex",
        model: Alex,
        thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/alex/thumbnail.png`,
    },
    {
        name: "Sporty Granny",
        model: SportyGranny,
        thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/sporty_granny/thumbnail.png`,
    },
    // {
    //     name: "David",
    //     model: David,
    //     thumbnail: `${process.env.NEXT_PUBLIC_BASE_PATH}/models/avatars/david/thumbnail.png`,
    // },
];

const SELECTED_AVATAR_LOCAL_STORAGE_KEY = "selected-avatar" as const;

const resolveSelectedAvatarFromLocalStorage = (avatarList: AvatarItem[]): AvatarItem => {
    if (typeof window === "undefined") return avatarList[0];
    const selectedAvatarName = localStorage.getItem(SELECTED_AVATAR_LOCAL_STORAGE_KEY);
    if (!selectedAvatarName || selectedAvatarName === "") return avatarList[0];
    return avatarList.find((avatar) =>
        avatar.name.toLocaleLowerCase() === selectedAvatarName.toLocaleLowerCase()
    ) || avatarList[0];
}

const saveSelectedAvatarToLocalStorage = (selectedAvatar: AvatarItem) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(SELECTED_AVATAR_LOCAL_STORAGE_KEY, selectedAvatar.name);
}

const useAvatarStoreSlice: StateCreator<AvatarStore> = (set) => ({
    avatarList: INITIAL_AVATAR_LIST,
    selectedAvatar: resolveSelectedAvatarFromLocalStorage(INITIAL_AVATAR_LIST),
    setSelectedAvatar: (newAvatar: AvatarItem) => set(() => {
        saveSelectedAvatarToLocalStorage(newAvatar);
        return { selectedAvatar: newAvatar };
    }),
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
    createSpieler: (spielerDto: SpielerDto) => Promise<void>;
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
    createSpieler: async (spielerDto: SpielerDto) => {
        await createSpielerApi(spielerDto);
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
    getErgebnisBySpielerId: (spielerId: string) => Promise<Ergebnis[]>;
    getErgebnisBySemesterId: (id: string) => Promise<Ergebnis[]>;
    createErgebnis: (ergebnisDto: ErgebnisDto) => Promise<void>;
};
const useErgebnisStoreSlice: StateCreator<ErgebnisStore> = () => ({
    getErgebnisByAufgabeIdAndSpielerId: async (aufgabeId: string, spielerId: string): Promise<Ergebnis[]> => {
        const response = await getErgebnisByAufgabeIdAndSpielerIdApi(aufgabeId, spielerId);
        return response.data;
    },
    getErgebnisBySpielerId: async (spielerId: string): Promise<Ergebnis[]> => {
        const response = await getErgebnisBySpielerIdApi(spielerId);
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
    getInteraktionBySpielerId: (spielerId: string) => Promise<Interaktion[]>;
    getInteraktionBySpielerIdAndAufgabeId: (spielerId: string, aufgabeId: string) => Promise<Interaktion[]>;
    createInteraktion: (roomId: string, interaktionDto: InteraktionDto) => Promise<void>;
    prozentZahlAngeklickteObjekte: number;
    setProzentZahlAngeklickteObjekte: (roomId: string) => Promise<void>;
};
const useInteraktionStoreSlice: StateCreator<InteraktionStore> = (set, get) => ({
    getInteraktionBySpielerId: async (spielerId: string): Promise<Interaktion[]> => {
        const response = await getInteraktionBySpielerIdApi(spielerId);
        return response.data;
    },
    getInteraktionBySpielerIdAndAufgabeId: async (spielerId: string, aufgabeId: string): Promise<Interaktion[]> => {
        const response = await getInteraktionBySpielerIdAndAufgabeIdApi(spielerId, aufgabeId);
        return response.data;
    },
    createInteraktion: async (roomId: string, interaktionDto: InteraktionDto): Promise<void> => {
        await createInteraktionApi(interaktionDto);
        await get().setProzentZahlAngeklickteObjekte(roomId);
    },
    prozentZahlAngeklickteObjekte: 0,
    setProzentZahlAngeklickteObjekte: async (roomId: string) => {
        const player = useGlobalStore.getState().getSpielerFromLocalStorage();
        if (!player) {
            console.log("No player!");
            return;
        }
        const interaktionOfPlayer = await get().getInteraktionBySpielerId(player.id);
        const interaktionOfPlayerDistinct = interaktionOfPlayer.reduce(
            (acc: Interaktion[], curr: Interaktion) => acc.find((i) => i.action === curr.action) ? acc : [...acc, curr], []
        );

        const {
            interactionsOfPlayerInRoom,
            interactionsInRoom,
        } = getInteractionsOfPlayerInRoom(roomId, interaktionOfPlayerDistinct.map((i) => i.action));

        const quotient = (interactionsOfPlayerInRoom.length / interactionsInRoom.length);
        const progressPercentage = Math.round(quotient * 100);
        set(() => ({ prozentZahlAngeklickteObjekte: progressPercentage }));
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

// Semester store

type SemesterStore = {
    getSemesterById: (id: string) => Promise<Semester>;
    getAllSemester: () => Promise<Semester[]>;
};
const useSemesterStoreSlice: StateCreator<SemesterStore> = () => ({
    getSemesterById: async (id: string) => {
        const response = await getSemesterByIdApi(id);
        return convertToSemesterModel(response.data);
    },
    getAllSemester: async () => {
        const response = await getAllSemesterApi();
        return response.data.map(convertToSemesterModel);
    },
});

// Veranstaltung store

type VeranstaltungStore = {
    getVeranstaltungById: (id: string) => Promise<Veranstaltung>;
    getAllVeranstaltungen: () => Promise<Veranstaltung[]>;
};
const useVeranstaltungStoreStoreSlice: StateCreator<VeranstaltungStore> = () => ({
    getVeranstaltungById: async (id: string) => {
        const response = await getVeranstaltungByIdApi(id);
        return response.data;
    },
    getAllVeranstaltungen: async () => {
        const response = await getAllVeranstaltungenApi();
        return response.data;
    },
});

// User Input Events
type UserInputEvents = {
    listenToKeyboardKeyPress: boolean
    setListenToKeyboardKeyPress: (value: boolean) => void;
}
const useUserInputEventsStoreSlice: StateCreator<UserInputEvents> = (set) => ({
    listenToKeyboardKeyPress: true,
    setListenToKeyboardKeyPress: (value: boolean) => set(() => ({ listenToKeyboardKeyPress: value })),
});

// Notification store
type NotificationStore = {
    emitNotification: (notificationDto: NotificationDto) => void;
    webSocketNotificationClient: Client;
}
const useNotificationStoreSlice: StateCreator<NotificationStore> = (set) => ({
    emitNotification: (notificationDto: NotificationDto) => {
        if (!webSocketClient.connected) return;
        webSocketClient.publish({
            destination: WEBSOCKET_SEND_NOTIFICATION_ENDPOINT,
            body: JSON.stringify(notificationDto),
        });
    },
    webSocketNotificationClient: webSocketClient,
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
    KommentarStore &
    SemesterStore &
    VeranstaltungStore &
    UserInputEvents &
    NotificationStore;
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
    ...useSemesterStoreSlice(...fn),
    ...useVeranstaltungStoreStoreSlice(...fn),
    ...useUserInputEventsStoreSlice(...fn),
    ...useNotificationStoreSlice(...fn),
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
        console.error(`Animation of object with ID ${objectId} was not found. No animation will be played!`);
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

const convertToSemesterModel = (semester: Semester): Semester => {
    return {
        ...semester,
        start: new Date(semester.start),
        ende: new Date(semester.ende),
    };
};

export const INTERACTIONS_IN_ROOM_ONE = [
    "Infos über Alan Turing angeklickt",
    "Auf die Zahl 26 geklickt",
    "Schwarzes alphanumerisches Rad angeklickt",
];

export const INTERACTIONS_IN_ROOM_TWO = [
    "Buchseite über Kryptographie angeklickt",
    "Portrait von Julius Caesar angeklickt",
    "Hinweis mit dem Text 'U → N' angeklickt",
    "Auf das Plakat mit dem Text 'Substitution' geklickt",
];
export const INTERACTIONS_IN_ROOM_THREE = [
    "Tafel mit Info über Spartas Militär angeklickt",
    "Buch 1 angeklickt",
    "Buch 2 angeklickt",
];
export const INTERACTIONS_IN_ROOM_FOUR = [
    "Uhr mit dem Text 'Decode' angeklickt",
    "Buch 1 über Kryptographie und Kryptananlyse angeklickt",
    "Buch 2 mit dem Text 'Die Anzahl der Zeilen ist wichtig' angeklickt",
    "Tabelle mit vier Zeilen angeklickt",
];
export const INTERACTIONS_IN_ROOM_FIVE = [
    "Portrait von Julius Caesar mit Zahl 2 angeklickt",
    "Pflanze, die auf vier Zeilen hinweist, angeklickt",
    "Notiz 'Welche Methode fehlt?' angeklickt",
    "Hinweis mit dem Text 'T C P A Q A F B J C G C C P S D L E' angeklickt",
];
export const INTERACTIONS_IN_ROOM_SIX = [
    "Hinweis über Shannons Regeln angeklickt",
    "Tresor angeklickt",
    "Notiz angeklickt",
];

enum RoomId {
    ROOM_ONE = "20000000-0000-0000-0000-000000000001",
    ROOM_TWO = "20000000-0000-0000-0000-000000000002",
    ROOM_THREE = "20000000-0000-0000-0000-000000000003",
    ROOM_FOUR = "20000000-0000-0000-0000-000000000004",
    ROOM_FIVE = "20000000-0000-0000-0000-000000000005",
    ROOM_SIX = "20000000-0000-0000-0000-000000000006",
}

enum RoomName {
    ROOM_ONE = "Raum 1",
    ROOM_TWO = "Raum 2",
    ROOM_THREE = "Raum 3",
    ROOM_FOUR = "Raum 4",
    ROOM_FIVE = "Raum 5",
    ROOM_SIX = "Raum 6",
}

export const getRoomNameByTaskId = (taskId: string): string => {
    switch (taskId) {
        case RoomId.ROOM_ONE:
            return RoomName.ROOM_ONE;
        case RoomId.ROOM_TWO:
            return RoomName.ROOM_TWO;
        case RoomId.ROOM_THREE:
            return RoomName.ROOM_THREE;
        case RoomId.ROOM_FOUR:
            return RoomName.ROOM_FOUR;
        case RoomId.ROOM_FIVE:
            return RoomName.ROOM_FIVE;
        case RoomId.ROOM_SIX:
            return RoomName.ROOM_SIX;
        default:
            return "";
    }
}

type OutputInteractionsOfPlayerInRoom = {
    interactionsOfPlayerInRoom: string[],
    interactionsInRoom: string[]
}
const getInteractionsOfPlayerInRoom = (roomId: string, interactionsOfPlayer: string[]): OutputInteractionsOfPlayerInRoom => {
    switch (roomId) {
        case RoomId.ROOM_ONE: {
            const interactionsInRoomOne = interactionsOfPlayer.filter((i) => INTERACTIONS_IN_ROOM_ONE.includes(i));
            return {
                interactionsInRoom: INTERACTIONS_IN_ROOM_ONE,
                interactionsOfPlayerInRoom: interactionsInRoomOne,
            }
        }
        case RoomId.ROOM_TWO: {
            const interactionsInRoomTwo = interactionsOfPlayer.filter((i) => INTERACTIONS_IN_ROOM_TWO.includes(i));
            return {
                interactionsInRoom: INTERACTIONS_IN_ROOM_TWO,
                interactionsOfPlayerInRoom: interactionsInRoomTwo,
            }
        }
        case RoomId.ROOM_THREE: {
            const interactionsInRoomThree = interactionsOfPlayer.filter((i) => INTERACTIONS_IN_ROOM_THREE.includes(i));
            return {
                interactionsInRoom: INTERACTIONS_IN_ROOM_THREE,
                interactionsOfPlayerInRoom: interactionsInRoomThree,
            }
        }
        case RoomId.ROOM_FOUR: {
            const interactionsInRoomFour = interactionsOfPlayer.filter((i) => INTERACTIONS_IN_ROOM_FOUR.includes(i));
            return {
                interactionsInRoom: INTERACTIONS_IN_ROOM_FOUR,
                interactionsOfPlayerInRoom: interactionsInRoomFour,
            }
        }
        case RoomId.ROOM_FIVE: {
            const interactionsInRoomFive = interactionsOfPlayer.filter((i) => INTERACTIONS_IN_ROOM_FIVE.includes(i));
            return {
                interactionsInRoom: INTERACTIONS_IN_ROOM_FIVE,
                interactionsOfPlayerInRoom: interactionsInRoomFive,
            }
        }
        case RoomId.ROOM_SIX: {
            const interactionsInRoomSix = interactionsOfPlayer.filter((i) => INTERACTIONS_IN_ROOM_SIX.includes(i));
            return {
                interactionsInRoom: INTERACTIONS_IN_ROOM_SIX,
                interactionsOfPlayerInRoom: interactionsInRoomSix,
            }
        }
        default: {
            return {
                interactionsInRoom: [],
                interactionsOfPlayerInRoom: [],
            }
        }
    }
}
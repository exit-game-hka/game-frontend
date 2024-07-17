export type Notification = {
    id: string;
    userName: string;
    title: string;
    content: string;
    creationDate: string;
    viewed: boolean;
    type: NOTIFICATION_TYPE;
};

export type NotificationDto = Omit<Notification, "id" | "viewed">;

export enum NOTIFICATION_TYPE {
    NEW_PLAYER_LOGGED_IN = "NEW_PLAYER_LOGGED_IN_EVENT",
    PLAYER_STARTED_GAME = "PLAYER_STARTED_GAME",
    PLAYER_GAVE_UP = "PLAYER_GAVE_UP",
    PLAYER_ENDED_GAME = "PLAYER_ENDED_GAME",
    PLAYER_SENT_COMMENT = "PLAYER_SENT_COMMENT",
}

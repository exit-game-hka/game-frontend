import React, {createContext, PropsWithChildren, useState} from "react";
import {AnimationAction} from "three";

export type AnimationActionType = "idle" | "run" | "jump" | "angry" | "defeated" | "celebration_chicken_dance";

const DEFAULT_ANIMATION: AnimationActionType = "idle" as const;

export type AnimationActions = {
    [p: string]: AnimationAction | null;
};

export type ObjectAnimation = {
    id: string;
    animationActions: AnimationActions;
}

export type ContextOutput = {
    animations: ObjectAnimation[];
    addAnimation: (animation: ObjectAnimation) => void;
    resetToDefaultAnimation: (objectId: string) => void;
    playAnimationAction: (objectId: string, actionName: AnimationActionType, repetitions?: number) => void;
}

// @ts-ignore
export const AnimationContext = createContext<ContextOutput>({});

type Props = PropsWithChildren;

export const AnimationContextProvider: React.FC<Props> = (props: Props) => {

    const [animations, setAnimations] = useState<ObjectAnimation[]>([]);

    const stopAllAnimationActionsOfObject = (objectId: string)  => {
        const animation = animations.find(a => a.id === objectId);
        if (!animation) {
            console.error(`Object with ID ${objectId} was not found. So no animation will be played`);
            return;
        }
        Object.entries(animation.animationActions).forEach(([_, action]) => {
            action?.stop();
        });
    }

    const validateAndPlayAnimationAction = (objectId: string, actionName: AnimationActionType, repetitions?: number) => {
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

    const resetToDefaultAnimation = (objectId: string) => {
        stopAllAnimationActionsOfObject(objectId);
        validateAndPlayAnimationAction(objectId, DEFAULT_ANIMATION);
    }

    const playAnimationAction = (objectId: string, actionName: AnimationActionType, repetitions?: number) => {
        stopAllAnimationActionsOfObject(objectId);
        validateAndPlayAnimationAction(objectId, actionName, repetitions);
    };

    const addAnimation = (animation: ObjectAnimation) => {
        setAnimations(prevState => [...prevState, animation]);
    }

    return (
        <AnimationContext.Provider value={{
            animations,
            addAnimation,
            playAnimationAction,
            resetToDefaultAnimation,
        }}>
            {props.children}
        </AnimationContext.Provider>
    );
}
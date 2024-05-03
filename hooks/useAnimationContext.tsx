import {useContext} from "react";
import {AnimationContext} from "@/context/AnimationContext";

const useAnimationContext = () => {
    return useContext(AnimationContext);
};

export default useAnimationContext;
import {Amy} from "@/components/avatars/Amy";
import {Leonard} from "@/components/avatars/Loenard";
import {useEffect, useMemo, useState} from "react";
import {AvatarItem} from "@/context/ApplicationContext";
import {useSearchParams} from "next/navigation";

type Output = {
    avatarList: AvatarItem[];
    selectedAvatar: AvatarItem;
    setSelectedAvatar: (model: AvatarItem) => void;
};
export const useAvatars = (): Output => {
    const param = useSearchParams();
    const avatarList: AvatarItem[] = useMemo(() => [
        {
            name: "Amy",
            model: Amy,
            thumbnail: "/models/avatars/amy/thumbnail.png",
            onClick: () => setSelectedAvatar(avatarList.find(a => a.name === "Amy")!),
        },
        {
            name: "Leonard",
            model: Leonard,
            thumbnail: "/models/avatars/leonard/thumbnail.png",
            onClick: () => setSelectedAvatar(avatarList.find(a => a.name === "Leonard")!),
        },
    ], []);

    const [selectedAvatar, setSelectedAvatar] = useState<AvatarItem>(avatarList[0]);

    useEffect(() => {
        if (!param.get("avatar")) return;
        const avatarFound = avatarList.find((a) => a.name.toLowerCase() === (param.get("avatar") as string).toLowerCase());
        if (!avatarFound) return;
        setSelectedAvatar(avatarFound);
    }, [avatarList, param]);

    return {
        avatarList,
        selectedAvatar,
        setSelectedAvatar,
    }
};

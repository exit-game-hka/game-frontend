import React from 'react';
import {useMediaQuery} from "@/hooks/useMediaQuery";
import Image from "next/image";

const SplashScreenComponent: React.FC = () => {
    const { isSmall } = useMediaQuery();

    const imageSource = isSmall ?
        `${process.env.NEXT_PUBLIC_BASE_PATH}/splash-screen-mobile.jpg` :
        `${process.env.NEXT_PUBLIC_BASE_PATH}/splash-screen.jpg`;

    return (
        <Image
            src={imageSource}
            alt={"Splash screen"}
            fill={true}
            style={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                objectFit: "cover",
                zIndex: "var(--z-index-splash-screen)",
            }}
        />
    )
};

export default SplashScreenComponent;

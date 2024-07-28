import React from 'react';
import {DetectiveOfficeWithWindow} from "@/components/DetectiveOfficeWithWindow";
import {WORLD_COORDINATE} from "@/app/contants";
import {InteractiveObjectProps} from "@/components/InteractiveObjectProps";

export const DetectiveOfficeComponent: React.FC<InteractiveObjectProps> = (props) => {
    return (
        <>
            <DetectiveOfficeWithWindow
                // @ts-ignore
                scale={0.6}
                position={[6.8, WORLD_COORDINATE[1], -6.7]}
            />
        </>
    );
};

import React, {ReactNode} from 'react';
import {useMediaQuery} from "@/hooks/useMediaQuery";

type Props = {
    layoutOnSmallScreen: ReactNode;
    layoutOnLargeScreen: ReactNode;
};
export const ResponsiveLayoutComponent: React.FC<Props> = (props) => {
    const { layoutOnSmallScreen, layoutOnLargeScreen } = props;
    const { isSmall } = useMediaQuery();

    return (
        <>
            { isSmall ? layoutOnSmallScreen : layoutOnLargeScreen }
        </>
    );
};


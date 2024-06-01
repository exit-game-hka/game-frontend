import React from "react";
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import dynamic from "next/dynamic";

const OverviewCardComponent = dynamic(
    () => import("@/components/shared/OverviewCardComponent"),
    { ssr: false }
);
const Home: React.FC = () => {
    return (
        <PageContentWrapperComponent subtitle="Das Abenteuer beginnt hier">
            <OverviewCardComponent />
        </PageContentWrapperComponent>
    )
};

export default Home;

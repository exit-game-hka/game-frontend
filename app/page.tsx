import React from "react";
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import dynamic from "next/dynamic";

const HomePageContentComponent = dynamic(
    () => import("@/components/HomePageContentComponent"),
    { ssr: false }
);

const Home: React.FC = () => {
    return (
        <PageContentWrapperComponent subtitle="Das Abenteuer beginnt hier">
            <HomePageContentComponent />
        </PageContentWrapperComponent>
    );
};

export default Home;

import React from "react";
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import {OverviewCardComponent} from "@/components/shared/OverviewCardComponent";

const Home: React.FC = () => {
    return (
        <PageContentWrapperComponent subtitle="Das Abenteuer beginnt hier">
            <OverviewCardComponent />
        </PageContentWrapperComponent>
    )
};

export default Home;

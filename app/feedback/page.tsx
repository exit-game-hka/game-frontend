import React from 'react';
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import {FeedbackFormComponent} from "@/components/FeedbackFormComponent";

const FeedbackPage: React.FC = () => {
    return (
        <PageContentWrapperComponent>
            <FeedbackFormComponent />
        </PageContentWrapperComponent>
    );
};

export default FeedbackPage;

import React from 'react';
import {PageContentWrapperComponent} from "@/components/shared/PageContentWrapperComponent";
import {DownloadResultAndQrCodeCodeComponent} from "@/components/DownloadResultAndQrCodeCodeComponent";

const ResultAndQrCodePage: React.FC = () => {
    return (
        <PageContentWrapperComponent title={"Lerninhalte und QR Code"}>
            <DownloadResultAndQrCodeCodeComponent />
        </PageContentWrapperComponent>
    );
};

export default ResultAndQrCodePage;


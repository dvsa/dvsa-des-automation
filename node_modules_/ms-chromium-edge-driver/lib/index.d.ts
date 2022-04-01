export declare const installDriver: () => Promise<{
    browserPath: string;
    driverPath: string;
}>;
export declare const paths: () => {
    browserPath: string | undefined;
    driverPath: string | undefined;
};

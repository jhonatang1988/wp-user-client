import type { Config, WpUserClientConfig } from "./types/index.js";
declare class WpUserClient {
    env: string;
    config: Config;
    constructor(wpUserClientConfig: WpUserClientConfig);
    login(email: string, password: string): Promise<{
        status: number;
        token: string;
        userId: string;
    } | {
        status: number;
        token?: undefined;
        userId?: undefined;
    }>;
    signup(email: string, password: string): Promise<number | {
        error: string;
    }>;
    checkExpiry(token: string): boolean;
    hello(): Promise<string>;
}
export default WpUserClient;

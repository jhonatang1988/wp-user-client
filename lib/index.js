import config from "./config/index.js";
import jsonwebtoken from "jsonwebtoken";
class WpUserClient {
    env;
    config;
    constructor(wpUserClientConfig) {
        if (!wpUserClientConfig.env) {
            throw new Error("env is required");
        }
        this.env = wpUserClientConfig.env;
        this.config = config(wpUserClientConfig.env);
    }
    async login(email, password) {
        try {
            const response = await fetch(`${this.config.baseUrl}/login`, {
                method: "POST",
                body: new URLSearchParams({
                    email,
                    password,
                }),
            });
            if (response.status === 200) {
                const token = await response.text();
                const decoded = jsonwebtoken.decode(token);
                return {
                    status: response.status,
                    token,
                    userId: decoded.userId,
                };
            }
            else {
                return {
                    status: response.status,
                };
            }
        }
        catch (error) {
            return {
                status: 500,
            };
        }
    }
    async signup(email, password) {
        try {
            const response = await fetch(`${this.config.baseUrl}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    email,
                    password,
                }),
            });
            return response.status;
        }
        catch (error) {
            return { error: JSON.stringify(error) };
        }
    }
    checkExpiry(token) {
        const decoded = jsonwebtoken.decode(token);
        const exp = decoded.exp;
        if (!exp) {
            return false;
        }
        const now = Math.floor(Date.now() / 1000);
        return exp > now;
    }
    async hello() {
        try {
            const response = await fetch(`${this.config.baseUrl}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.text();
        }
        catch (error) {
            throw error;
        }
    }
}
export default WpUserClient;

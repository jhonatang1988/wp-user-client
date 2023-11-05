import type { Config, WpUserClientConfig } from "./types/index.js";
import config from "./config/index.js";
import jsonwebtoken from "jsonwebtoken";

class WpUserClient {
  env: string;
  config: Config;

  constructor(wpUserClientConfig: WpUserClientConfig) {
    if (!wpUserClientConfig.env) {
      throw new Error("env is required");
    }
    this.env = wpUserClientConfig.env;
    this.config = config(wpUserClientConfig.env);
  }

  async login(email: string, password: string) {
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
        const decoded = jsonwebtoken.decode(token) as jsonwebtoken.JwtPayload;

        return {
          status: response.status,
          token,
          userId: decoded.userId as string,
        };
      } else {
        return {
          status: response.status,
        };
      }
    } catch (error) {
      return {
        status: 500,
      };
    }
  }

  async signup(email: string, password: string) {
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
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  }

  checkExpiry(token: string) {
    const decoded = jsonwebtoken.decode(token) as jsonwebtoken.JwtPayload;
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
    } catch (error) {
      throw error;
    }
  }
}

export default WpUserClient;

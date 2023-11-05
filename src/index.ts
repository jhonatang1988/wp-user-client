import type { Config, WpUserClientConfig } from "./types";
import config from "./config";

class WpUserClient {
  env: string;
  config: Config;

  constructor(wpUserClientConfig: WpUserClientConfig) {
    // TODO: implement
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
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response", response);

      return response.body;
    } catch (error) {
      throw error;
    }
  }

  async hello() {
    try {
      const response = await fetch(`${this.config.baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("mundo response", response);

      return response.body;
    } catch (error) {
      throw error;
    }
  }
}

export default WpUserClient;
import prod from "./prod.js";
import dev from "./dev.js";

export default function (env: string) {
  switch (env) {
    case "prod":
      return prod;
    case "dev":
      return dev;
    default:
      throw new Error("env not found");
  }
}
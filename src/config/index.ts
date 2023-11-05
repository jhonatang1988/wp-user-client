import prod from "./prod";

export default function (env: string) {
  switch (env) {
    case "prod":
      return prod;
    default:
      throw new Error("env not found");
  }
}
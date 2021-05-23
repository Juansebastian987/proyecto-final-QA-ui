import { Pact } from "@pact-foundation/pact";
import path from "path";

export const provider = new Pact({
  consumer: "GameFront",
  provider: "GameBack",
  port: 8080,
  cors: true,
  log: path.resolve(
    process.cwd(),
    "./test/contract/logs",
    "GameFront-GamaBack"
  ),
  dir: path.resolve(process.cwd(), "./test/contract/pacts"),
});

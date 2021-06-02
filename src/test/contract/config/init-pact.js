const { Pact } = require("@pact-foundation/pact");
const path = require("path");

const consumerName = 'GameFront';
const providerName = 'GameBack';

export const provider = new Pact({
  consumer: consumerName,
  provider: providerName,
  
  port: 8080,
  cors: true,
  log: path.resolve(process.cwd(), './test/contract/logs', `${consumerName}-${providerName}.log`),
  dir: path.resolve(process.cwd(), './test/contract/pacts'),
  logLevel: 'INFO'
});

import { createApp } from "./http/app.js";
import { config } from "./config.js";

const app = createApp();

app.listen(config.PORT, config.HOST, () => {
  console.log(`D20 Dungeon Studio API listening on http://${config.HOST}:${config.PORT}`);
});

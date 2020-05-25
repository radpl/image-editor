import local from "./local.config";
import prod from "./production.config";

const env = 'local';
let config;
if (env === 'local') {
  config = { ...local };
} else {
  config = { ...prod };
}

export default config;
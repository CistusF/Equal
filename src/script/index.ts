import { settingDir } from "./global";
import { createWriteStream, existsSync, mkdirSync, writeFile } from 'fs';
import { join } from 'path';

if (!existsSync(join(settingDir, "config.json"))) {
    mkdirSync(settingDir);
    createWriteStream(join(settingDir, "config.json"));
};

const defaultOptions = {
    opacity: 1,
    timer: 130,
    lang: "en-US",
    aot: false,
    sound: 1,
    rate: 1,
}

writeFile(join(settingDir, "config.json"), JSON.stringify(defaultOptions), {
    encoding: "utf8",
}, (err: NodeJS.ErrnoException | null) => {
    if (err) throw new Error(String(err));
});
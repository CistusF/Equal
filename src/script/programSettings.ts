import { settingDir } from "./global";
import { ipcRenderer } from 'electron';
import { createWriteStream, existsSync } from 'fs';
import { readFile, mkdir, writeFile, } from 'fs/promises';
import { join } from 'path';
import {configTypes} from '../types/types';

const save = async () => {
    const voiceSettings: NodeListOf<HTMLInputElement> = document.querySelectorAll(".voice");
    const generalSettings: NodeListOf<HTMLInputElement> = document.querySelectorAll(".general");

    if (!existsSync(join(settingDir, "config.json"))) {
        await mkdir(settingDir);
        createWriteStream(join(settingDir, "config.json"));
    };

    try {
        const options: configTypes = await readFile(join(settingDir, "config.json"), "utf-8")
            .then(res => {
                return JSON.parse(res);
            })
            .catch(err => {
                throw new Error(String(err));
            });

        for (const key of voiceSettings) {
            options[key.id] = key.value;
            localStorage.setItem(key.id, key.value);
        };

        for (const key of generalSettings) {
            options[key.id] = key.value;
            localStorage.setItem(key.id, key.value);
        };

        writeFile(join(settingDir, "config.json"), JSON.stringify(options))
            .catch(err => {
                throw new Error(String(err));
            })
            .finally(() => {
                alert("File saved successfully");
                location.href = "./index.html";
                ipcRenderer.send('ready');
            });
    } catch (err) {
        if (err) {
            throw new Error(String(err));
        }
    }
};

document.querySelector("#save")?.addEventListener("click", save);
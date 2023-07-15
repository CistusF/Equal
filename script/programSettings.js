const { ipcRenderer } = require('electron');
const { writeFileSync, createWriteStream, existsSync, mkdirSync, writeFile } = require('fs');
const { join } = require('path');

const save = () => {
    console.log(settingDir);
    const voiceSettings = document.querySelectorAll(".voice");
    const generalSettings = document.querySelectorAll(".general");

    const options = {};

    for (const key of voiceSettings) {
        options[key.id] = key.value;
        localStorage.setItem(key.id, key.valu);
    };

    for (const key of generalSettings) {
        options[key.id] = key.value;
        localStorage.setItem(key.id, key.valu);
    };

    if (!existsSync(join(settingDir, "config.json"))) {
        mkdirSync(settingDir);
        createWriteStream(join(settingDir, "config.json"));
    }
    writeFile(join(settingDir, "config.json"), JSON.stringify(options), {
        encoding: "utf8",
    }, (err) => {
        if (err) throw new Error(err);
        else {
            alert("File saved successfully");

            location.href = "./index.html";
            ipcRenderer.send('ready');
        }
    });

}
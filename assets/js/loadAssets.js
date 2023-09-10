"use strict";

// Credit to: https://github.com/david-reid/preloading.assets.js

class LoadAssets {
    constructor() {
        this.assets = null;
        this.assetsToLoad = 0;
    }

    toggleScreen(id, toggle) {
        let elements = document.querySelectorAll(id);
        let display = (toggle) ? "flex" : "none";
        [...elements].forEach(e => {
            e.style.display = display;
        });
    }

    closeAllScreens() {
        let elements = document.querySelectorAll(".screen");
        [...elements].forEach(e => {
            e.style.display = "none";
        });
    }

    showScreen(id) {
        this.closeAllScreens();
        this.toggleScreen(id, true);
    }

    load(assets) {
        this.assets = assets;
        if (!this.assets || this.assets.length == 0) {
            this.showScreen(".game-start");
            return;
        }
        if (this.assets) {
            this.assetsToLoad = this.assets.length;

            for (let i = 0; i < this.assets.length; i++) {
                if (this.assets[i].var != undefined) {
                    if (this.assets[i].var.nodeName == "IMG") {
                        this.beginLoadingImage(
                            this.assets[i].var,
                            this.assets[i].file
                        );
                    }
                    if (this.assets[i].var.nodeName == "AUDIO") {
                        this.beginLoadingAudio(
                            this.assets[i].var,
                            this.assets[i].file
                        );
                    }
                }
            }
        }
    }

    launchIfReady() {
        this.assetsToLoad--;
        if (this.assetsToLoad == 0) {
            this.showScreen(".game-start");
        }
    }

    beginLoadingImage(imgVar, fileName) {
        imgVar.onload = () => this.launchIfReady();
        imgVar.src = fileName;
    }

    beginLoadingAudio(audioVar, fileName) {
        audioVar.src = fileName;
        audioVar.addEventListener('canplay', () => this.launchIfReady());
    }
}
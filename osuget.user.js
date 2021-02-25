// ==UserScript==
// @name        OsuGet
// @namespace   github.com/33kk/osuget
// @match       https://osu.ppy.sh/*
// @grant       none
// @version     1.0
// @author      33KK
// @description 10/14/2020, 5:22:58 PM
// ==/UserScript==

const idRegex = /https:\/\/osu\.ppy\.sh\/beatmapsets\/([0-9]+)/;

function getBeatmapSetId(str) {
	return str.match(idRegex)[1];
}

function listen() {
  document.querySelector("html").removeEventListener("click", click);
  document.querySelector("html").addEventListener("click", click);
}

function click(e) {
	if (!window.location.pathname.startsWith("/beatmapsets")) return;
	let t;
	if (e.target) {
		if (e.target.href) {
			t = e.target;
		} else if (e.target.parentElement && e.target.parentElement.href) {
			t = e.target.parentElement;
		} else if (e.target.parentElement.parentElement && e.target.parentElement.parentElement.href) {
			t = e.target.parentElement.parentElement;
		}
	}
	if (t) {
		if (t.classList && t.classList.contains("js-beatmapset-download-link") && t.classList.contains("beatmapset-panel__icon") && idRegex.test(t.href)) {
			console.log("osuget: click");
			t.href = "osuget:" + getBeatmapSetId(t.href);
		} else if (t.classList && t.classList.contains("btn-osu-big--beatmapset-header") && t.href === "https://osu.ppy.sh/home/support") {
			t.href = "osuget:" + getBeatmapSetId(window.location.href);
		}
	}
}

window.addEventListener("popstate", listen);

listen();

// ==UserScript==
// @name        OsuGet
// @namespace   github.com/33kk/osuget
// @match       https://osu.ppy.sh/beatmapsets*
// @grant       none
// @version     1.0
// @author      33KK
// @description 10/14/2020, 5:22:58 PM
// ==/UserScript==

const idRegex = /https:\/\/osu\.ppy\.sh\/beatmapsets\/([0-9]+)/;

function getBeatmapSetId(str) {
	return str.match(idRegex)[1];
}

function click(e) {
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
		if (t.classList && t.classList.contains("js-beatmapset-download-link") && idRegex.test(t.href)) {
			console.log("osuget: click");
			t.href = "osuget:" + getBeatmapSetId(t.href);
		} else if (t.classList && t.classList.contains("btn-osu-big--beatmapset-header") && t.href === "https://osu.ppy.sh/home/support") {
			t.href = "osuget:" + getBeatmapSetId(window.location.href);
		}
	}
}

document.querySelector("html").addEventListener("click", click);

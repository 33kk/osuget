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
    let tmp = e.target;
		for (let i = 0; i < 10 && !t && tmp.parentElement; i++) {
      if (tmp.href) {
        t = tmp;
        break;
      }
      tmp = tmp.parentElement;
    }
	}
	if (t) {
		if (t.classList && ((t.classList.contains("js-beatmapset-download-link") && t.classList.contains("beatmapset-panel__icon")) || t.classList.contains("beatmapset-panel__menu-item")) && idRegex.test(t.href)) {
			t.href = "osuget:" + getBeatmapSetId(t.href);
		}
    else if (t.classList && t.classList.contains("btn-osu-big--beatmapset-header") && t.href && t.href.includes("/support")) {
			t.href = "osuget:" + getBeatmapSetId(window.location.href);
		}
    else {
      return;
    }
    console.log(`osuget: ${t.href}`);
	}
}

function hookHistory() {
  let _pushState = history.pushState;
  let _replaceState = history.replaceState;
  
  function pushState(...args) {
    _pushState(...args);
    console.log("osuget: pushState hook");
    setTimeout(listen, 100);
  }
  function replaceState(...args) {
    _replaceState(...args);
    console.log("osuget: replaceState hook");
    setTimeout(listen, 100);
  }
  
  history.pushState = pushState;
  history.replaceState = replaceState;
}

window.addEventListener("popstate", listen);

hookHistory();
listen();

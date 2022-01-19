let mangaInfo = {}

const logInfo = () => {
	console.log(mangaInfo)
}

const crawlInfo = () => {
	try {
		mangaInfo.name = document.querySelector(".series-name a").innerHTML;
		let tagRaw = document.querySelectorAll(".badge-info");
		mangaInfo.tag = Array.from(tagRaw).map(el => el.outerText);
		document.querySelectorAll("div.series-information > div").forEach(infoItem => {
			let items = infoItem.children
			switch (items[0].innerText) {
				case "Tình trạng:":
					mangaInfo.status = items[1].innerText
					break;
				case "Tác giả:":
					mangaInfo.author = items[1].innerText
					break;
				case "Tên khác:":
					mangaInfo.otherName = items[1].innerText
					break;
				default:
					break;
			}
		})
		let img = document.querySelector(".series-cover > div > div").style || '';
		mangaInfo.thumbnail = img.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1] || '';
		mangaInfo.summary = document.querySelector("div.summary-content > p").innerText || '';
		mangaInfo.chapters = Array.from(document.querySelectorAll(".list-chapters.at-series > a")).map(link => {
			return { chapter: link.getAttribute('title'), url: link.getAttribute('href') }
		})
		return true
	} catch (error) {
		return false
	}
}

const crawlImages = () => {
	mangaInfo.name = document.querySelector("#app > main > div.container > div.row.custom > ul > li.active > a").innerText
	mangaInfo.images = Array.from(document.querySelectorAll("#chapter-content > img")).map(el => el.getAttribute('data-src'))
}

const createButton = (name) => {
	let button = document.createElement("button")
	button.innerText = name
	button.className = "btn btn-default bg-lhmanga text-white"
	button.style.cssText = "position:fixed;bottom:10vh;right:0px"
	button.addEventListener('click', logInfo)
	document.querySelector('#app').appendChild(button)
}

const readyStateCheckInterval = setInterval(function () {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		if (crawlInfo()) {
			createButton("Show Info")
		}
		else {
			crawlImages()
			createButton("Show link")
		}
	}
}, 10);
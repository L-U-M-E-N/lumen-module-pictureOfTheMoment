let picList;
let timeoutDelay = -1;

class Pictures {
	static async init() {
		picList = await ipcRenderer.invoke('pictureOfTheMoment-getList');

		if(currentWindow === 'index') {
			const imgDOM = document.getElementsByClassName('module-pictures')[0];

			Pictures.drawRandomImg(imgDOM);
		}
	}

	static drawRandomImg(imgDOM) {
		const tmpList = [];
		for(const i in picList) {
			for(let j=0; j<picList[i].length; j++) {
				tmpList.push(i + '/' + picList[i][j]);
			}
		}

		if(tmpList.length === 0) {
			return;
		}

		const elt = tmpList[Math.floor(tmpList.length * Math.random())];
		while(imgDOM.firstChild) {
			imgDOM.removeChild(imgDOM.firstChild);
		}

		const img = document.createElement('img');
		imgDOM.appendChild(img);
		img.src = Pictures.normalizeFileName(elt);
		img.addEventListener('load', setupBlocks);

		clearTimeout(timeoutDelay);
		timeoutDelay = setTimeout(() => { Pictures.drawRandomImg(imgDOM); }, 15*60*1000);
	}

	static normalizeFileName(fname) {
		return fname.replace(/ /g, '%20').replace(/'/g,'\\\'').replace(/#/g,'%23');
	}
}

window.addEventListener('load', Pictures.init);
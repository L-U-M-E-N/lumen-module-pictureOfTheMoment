// Get files
const pictureList = {};

fileScanner('PATHTOFILE',/\.(png|jpg|jpeg|bmp|svg)$/,function(filename){
	let dirName  = filename.split('\\');
	const picName  = dirName.pop();
	dirName      = dirName.join('/');

	if(pictureList[dirName] === undefined) { pictureList[dirName] = []; }
	pictureList[dirName].push(picName);
});

const window = require('electron').BrowserWindow;
ipcMain.on('pictureOfTheMoment-getList', () => {
	for(const currWindow of window.getAllWindows()) {
		currWindow.webContents.send('pictureOfTheMoment-list', pictureList);
	}
});
// Get files
const pictureList = {};

ipcMain.handle('pictureOfTheMoment-getList', () => {
	return pictureList;
});

(async() => {
	const directories = await ConfigManager.get('pictureOfTheMoment', 'directories');

	for(const directory of directories) {
		fileScanner(directory,/\.(png|jpg|jpeg|bmp|svg)$/,function(filename){
			let dirName  = filename.split('\\');
			const picName  = dirName.pop();
			dirName      = dirName.join('/');

			if(pictureList[dirName] === undefined) { pictureList[dirName] = []; }
			pictureList[dirName].push(picName);
		});
	}
})(); // Delay, so you won't have this scan at exact load time

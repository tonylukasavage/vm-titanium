var win = Ti.UI.createWindow({
	backgroundColor: '#fff'
});
var button = Ti.UI.createButton({
	title: 'button'
});
win.add(button);

for (var i = 0; i < 10; i++) {
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	while (color.length < 7) { color = color.substr(0,1) + '0' + color.substr(1); }

	win.add(Ti.UI.createView({
		height: Math.random() * Ti.Platform.displayCaps.platformHeight,
		width: Math.random() * Ti.Platform.displayCaps.platformWidth,
		left: Math.random() * Ti.Platform.displayCaps.platformWidth,
		top: Math.random() * Ti.Platform.displayCaps.platformHeight,
		backgroundColor: color
	}));
}

win.open();

win.children.length;
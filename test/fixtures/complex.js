var win = Ti.UI.createWindow({
	backgroundColor: '#fff'
});
var button = Ti.UI.createButton({
	title: 'button'
});
win.add(button);

for (var i = 0; i < 10; i++) {
	win.add(Ti.UI.createView({
		height: Math.random() * Ti.Platform.displayCaps.platformHeight,
		width: Math.random() * Ti.Platform.displayCaps.platformWidth,
		left: Math.random() * Ti.Platform.displayCaps.platformWidth,
		top: Math.random() * Ti.Platform.displayCaps.platformHeight,
		backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16)
	}));
}

win.open();

win.children.length;
var context = this;

// https://jira.appcelerator.org/browse/TIMOB-17454
Ti.UI.currentWindow.__triple = {
	context: function() {
		return context;
	},
	eval: eval
};

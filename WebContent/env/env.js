Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var envGrid = new Ext.grid.PropertyGrid({
		region : 'center',
	    width: 300,
	    source: {
	        "1.框架": "Extjs3.4",
	        "2.浏览器": "IE8、火狐等"
	    }
	});
	
	envGrid.on('beforeedit', function(e){
		e.cancel = true;
		return;
	});
	
	new Ext.Viewport({
		layout: 'border',
		items: [envGrid]
	});
});
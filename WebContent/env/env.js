Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var envGrid = new Ext.grid.PropertyGrid({
		region : 'center',
	    width: 300,
	    source: {
	        "1.服务器": "Tomcat",
	        "2.数据库": "Hsqldb",
	        "3.框架": "spring4、MyBatis、Extjs3.4",
	        "4.其它包": "POI等",
	        "5.浏览器": "IE8、火狐"
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
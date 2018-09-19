Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var userStore = new Ext.data.JsonStore({
		autoLoad : true,
	    autoDestroy: true,
	    url: 'loadProject.txt',
	    storeId: 'projectStore',
	    root: 'projects',
	    idProperty: 'id',
	    fields: ['id', 'name', 'summary', 'remark']
	});
	
	var expander = new Ext.ux.grid.RowExpander({
        tpl : new Ext.Template(
        	'<b>说明:</b><br><font color="0000ff">{summary}</font>'
        )
    });
	
	var projectGrid = new Ext.grid.GridPanel({
		id : 'projectGridrid',
		region : 'center',
		loadMask : true,
		stripeRows : true,
		frame: true,
		viewConfig: {
            forceFit:true
        },
		plugins : expander,
		store : userStore,
	    columns: [/*new Ext.grid.RowNumberer(), */expander, {
        	header: '模块名称',
        	dataIndex: 'name',
        	width : 160
        }, {
        	header: '备注',
        	dataIndex: 'remark',
        	width : 400
        }]
	});
	
	new Ext.Viewport({
		layout: 'border',
		items: [projectGrid]
	});
});
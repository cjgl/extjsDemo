Ext.onReady(function() {
	var basicTree = new Ext.tree.TreePanel({
		title: '基本管理',
	    rootVisible: false,
	    root : {
	    	text : '基本管理',
	    	expanded: true,
            children: [{
            	id : 'user',
                text: '用户管理',
                leaf: true
            }]
	    }
	});
	
	basicTree.on('click', function(node){	
		if(node.id == 'user'){
			var tabPanel = Ext.getCmp('tab');
			var panel = tabPanel.getItem('userPanel');
			if(panel != null){
				tabPanel.setActiveTab('userPanel');
				return;
			}
			var userPanel = new Ext.Panel({
				id : 'userPanel',
				title : node.text,
				closable : true,
				html : "<iframe id='userFrame' src='user/user.html' scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>"
			});
			tabPanel.add(userPanel);
			tabPanel.setActiveTab('userPanel');
		} else if(node.id == 'stock'){
			var tabPanel = Ext.getCmp('tab');
			var panel = tabPanel.getItem('stockPanel');
			if(panel != null){
				tabPanel.setActiveTab('stockPanel');
				return;
			}
			var stockPanel = new Ext.Panel({
				id : 'stockPanel',
				title : node.text,
				closable : true,
				html : "<iframe id='stockFrame' src='stock/stock.jsp' scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>"
			});
			tabPanel.add(stockPanel);
			tabPanel.setActiveTab('stockPanel');
		}
	});
	
	var systemTree = new Ext.tree.TreePanel({
		title: '系统管理',
	    rootVisible: false,
	    root : {
	    	text : '基本管理',
	    	expanded: true,
            children: [{
            	id : 'project',
                text: '项目说明',
                leaf: true
            }]
	    }
	});
	
	systemTree.on('click', function(node){	
		if(node.id == 'project'){
			var tabPanel = Ext.getCmp('tab');
			var panel = tabPanel.getItem('projectPanel');
			if(panel != null){
				tabPanel.setActiveTab('projectPanel');
				return;
			}
			var projectPanel = new Ext.Panel({
				id : 'projectPanel',
				title : node.text,
				closable : true,
				html : "<iframe id='projectFrame' src='project/project.html' scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>"
			});
			tabPanel.add(projectPanel);
			tabPanel.setActiveTab('projectPanel');
		}
	});
	
	new Ext.Viewport({
		layout: 'border',
		items: [{
			region: 'north',
			html: '<h1 class="x-panel-header">应用系统</h1>',
			border: false,
			margins: '0 0 5 0'
		}, {
			region: 'west',
			collapsible: true,
			collapseMode: 'mini',
			split: true,
			title: '菜单',    
			width: 260,       
			x:20, 
			y:20, 
			layout:'accordion',     
			defaults: { 
				bodyStyle: 'padding:15px' 
			}, 
			layoutConfig: {        
				titleCollapse: true,         
				animate: true,         
				activeOnTop: true      
			},     
			items: [basicTree, systemTree]
		}, {
			id : 'tab',
			region: 'center',
			xtype: 'tabpanel', 
			activeTab: 0,
			items: {
				title: '开发环境',
				html: "<iframe id='fileFrame' src='env/env.html' scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>"
			}
		}, {
			region: 'south',
	        xtype : 'toolbar',
	        height: 26,
	        items : [{
	        	xtype: 'tbtext',
	        	text: '欢迎'
	        }, {
	        	xtype: 'tbfill'
	        }, {
	        	xtype: 'tbtext',
	        	id : 'clock',
	        	text: '欢迎'
	        }]
		}]
	});
	
	var task = {
		run: function(){
			Ext.fly('clock').update(new Date().format('Y-m-d H:i:s'));
		},
		interval: 1000 //1秒
	};
	Ext.TaskMgr.start(task);

});

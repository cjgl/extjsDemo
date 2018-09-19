Ext.onReady(function() {
	Ext.QuickTips.init();
	
	function addUser(){
		
		var addUserWin = new Ext.Window({
		    title: '新增用户',
		    height: 260,
		    width: 400,
		    layout: 'fit',
		    items: [{
		    	id : 'addUserForm',
		        xtype: 'form',
		        monitorValid : true,
		        frame: true,
		        bodyStyle:'padding:10px 40px 0',
		        labelWidth: 60,
		        defaults: {width: 200},
		        items : [{
		        	xtype: 'textfield',
		        	id: 'name',
		            name: 'name',
		            fieldLabel: '用户名',
		            maxLength : 10,
		            maxLengthText : '用户名最多10字符！',
		            minLength : 1,
		            minLengthText : '用户名最少1个字符！',
		            allowBlank:false,
		            blankText : '用户名不可以为空！',
		            style: {
		            	marginBottom: '10px'
		            }
		        }, {
		        	xtype: 'textfield',
		        	id : 'pwd',
		            name: 'pwd',
		            fieldLabel: '密码',
		            inputType: 'password',
		            maxLength : 10,
		            maxLengthText : '密码最多10字符！',
		            minLength : 6,
		            minLengthText : '密码最少6字符！',
		            allowBlank:false,
		            blankText : '密码不可以为空！',
		            style: {
		             marginBottom: '10px'
		            }
		        }, {
		        	xtype: 'textfield',
		            name: 'pwd2',
		            fieldLabel: '确认密码',
		            inputType: 'password',
		            allowBlank: false,
		            validator: function(value) {
		                return (value === Ext.getCmp('pwd').getValue()) ? true : '密码不一致';
		            }
		        }],
		        buttonAlign : 'center',
		        buttons: [{
		            text: '重置',
		            handler: function() {
		            	Ext.getCmp('addUserForm').getForm().reset();
		            }
		        }, {
		            text: '提交',
		            formBind: true,
		            handler: function() {
		                var form = Ext.getCmp('addUserForm').getForm();
		                
		                if (form.isValid()) {
		                	var current = new Date().format('Y-m-d H:i:s');
		                	var UserRecord = Ext.data.Record.create(['id','name','createtime','updatetime']);
			                var defaultData = {
			                	id : Ext.StoreMgr.lookup('userStore').getTotalCount(),
			                	name : Ext.getCmp('name').getValue(),
			                	createtime: current,
			                	updatetime : current
			                };
                			var r = new UserRecord(defaultData);console.log(defaultData);
                			Ext.StoreMgr.lookup('userStore').insert(Ext.StoreMgr.lookup('userStore').getTotalCount(), r);
		                    addUserWin.close();
		                }
		            }
		        }]
		    }]
		}).show();
	}
	
	function modUser(record){
		
		var modUserWin = new Ext.Window({
		    title: '修改用户',
		    height: 260,
		    width: 400,
		    layout: 'fit',
		    items: [{
		        xtype: 'form',
		        id : 'modUserForm',
		        monitorValid : true,
		        frame: true,
		        bodyStyle:'padding:10px 40px 0',
		        labelWidth: 60,
		        defaults: {width: 200},
		        items : [{
		            xtype: 'hidden',
		            name: 'id'
		        }, {
		        	xtype: 'textfield',
		        	id: 'name',
		            name: 'name',
		            fieldLabel: '用户名',
		            maxLength : 10,
		            maxLengthText : '用户名最多10字符！',
		            minLength : 1,
		            minLengthText : '用户名最少1个字符！',
		            allowBlank:false,
		            blankText : '用户名不可以为空！',
		            style: {
		            	marginBottom: '10px'
		            }
		        }, {
		        	xtype: 'textfield',
		        	id : 'pwd',
		            name: 'pwd',
		            fieldLabel: '密码',
		            inputType: 'password',
		            maxLength : 10,
		            maxLengthText : '密码最多10字符！',
		            minLength : 6,
		            minLengthText : '密码最少6字符！',
		            allowBlank:false,
		            blankText : '密码不可以为空！',
		            style: {
		             marginBottom: '10px'
		            }
		        }, {
		        	xtype: 'textfield',
		            name: 'pwd2',
		            fieldLabel: '确认密码',
		            inputType: 'password',
		            allowBlank: false,
		            validator: function(value) {
		                return (value === Ext.getCmp('pwd').getValue()) ? true : '密码不一致';
		            }
		        }],
		        buttonAlign : 'center',
		        buttons: [{
		            text: '重置',
		            handler: function() {
		            	Ext.getCmp('modUserForm').getForm().reset();
		            }
		        }, {
		            text: '提交',
		            formBind: true,
		            handler: function() {
		                var form = Ext.getCmp('modUserForm').getForm();
		                if (form.isValid()) {
		                	record.set("name", Ext.getCmp('name').getValue());
		                	record.set("updatetime", new Date().format('Y-m-d H:i:s'));
		                    modUserWin.close();
		                }
		            }
		        }]
		    }]
		}).show();
		Ext.getCmp('modUserForm').getForm().loadRecord(record);
	}
	
	var userStore = new Ext.data.JsonStore({
		autoLoad : true,
	    autoDestroy: true,
	    url: 'loadUser.json',
	    storeId: 'userStore',
	    root: 'users',
	    idProperty: 'id',
	    fields: ['id', 'name',
	             {name : 'createtime', type: 'date', dateFormat: 'Y-m-d H:i:s'}, 
	             {name : 'updatetime', type: 'date', dateFormat: 'Y-m-d H:i:s'}]
	});
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : true
	});
	
	var userGrid = new Ext.grid.GridPanel({
		id : 'userGrid',
		region : 'center',
		loadMask : true,
		stripeRows : true,
		frame: true,
		store : userStore,
		sm : sm,
		tbar: [{
	    	text: '新增用户',
	    	handler: function() {
	    		addUser();
	        }
	    }, {
	    	text: '修改用户',
	    	handler: function() {
	    		if(!userGrid.getSelectionModel().hasSelection()){
	    			return;
	    		}
	    		var record = userGrid.getSelectionModel().getSelected();
	    		modUser(record);
	        }
	    }, {
	    	text: '删除用户',
	    	handler: function() {
	    		if(!userGrid.getSelectionModel().hasSelection()){
	    			return;
	    		}
	    		
	    		Ext.Msg.confirm('提示', '请确认删除' , function(btn){
	    			if(btn == 'yes'){
	    				var record = userGrid.getSelectionModel().getSelected();
	    				Ext.StoreMgr.lookup('userStore').remove(record);
	    				Ext.Msg.alert('提示', "删除成功");
	    			}	
	    		});	
	        }
	    }],
	    columns: [new Ext.grid.RowNumberer(), sm, {
        	header: '姓名',
        	dataIndex: 'name',
        	width : 60
        }, {
        	header: '创建时间',
        	xtype: 'datecolumn',
        	dataIndex: 'createtime',
        	format: 'Y-m-d H:i:s',
        	width : 120
        }, {
        	header: '最后修改时间',
        	xtype: 'datecolumn',
        	dataIndex: 'updatetime',
        	format: 'Y-m-d H:i:s',
        	width : 120
        }]
	});
	
	userGrid.on('rowdblclick', function(grid, row, e){
		var record = grid.store.getAt(row);
		modUser(record);
	});
	
	new Ext.Viewport({
		layout: 'border',
		items: [userGrid]
	});
});
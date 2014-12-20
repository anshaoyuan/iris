require(['config'],
function() {
    'use strict';
    var letterArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    function showMsg(config) {
        require(['jquery-msg'],
        function(msg) {
            msg(config);
        })
    }
    require(['domready', 'bootstrap'],
    function() {
        require(['cmcc', 'template', 'syntax', 'jquery.xChosen', 'jquery.cookie', 'jquery.serializeJSON'],
        function(cmcc, template) {
            $('#groupDetail').on('click', '#joinTeam', {
                action: 'add'
            },
            addOrDeleteMember).on('click', '#quitTeam', {
                action: 'delete'
            },
            addOrDeleteMember);
            function fetchGroupTree() {
                require(['text!../tpl/groups_list.tpl'],
                function(raw) {
//                    $.getJSON(sysPath + "/mobile/team/queryAllTeam",
//                    function(rawdata) {
//                        var data = cmcc.Group.reGroupList(rawdata);
//                        var render = template.compile(raw);
//                        var html = render(data);
//                        $('#groupsList').html(html);
//                    })
                     $.ajax(sysPath + '/mobile/team/queryAllTeam', {
                        contentType: 'application/json; charset=utf-8',
                        type: 'get',
                        cache : false,
                        success: function(rawData) {
                            var data = cmcc.Group.reGroupList(rawData);
                        	var render = template.compile(raw);
                        	var html = render(data);
                        	$('#groupsList').html(html);
                        }
                    })
                })
            };
            //加载所有群组
            fetchGroupTree();
            $('#groupsList').undelegate('a.is-group', 'click');
            $('#groupsList').delegate('a.is-group', 'click',
            function() {
                var me = $(this);
                require(['text!../tpl/group_header.tpl', 'text!../tpl/group_detail.html'],
                function(tplHeader, tplDetail) {
                    var selfId = me.data('id');
                    $.cookie('currentTeamId', selfId);
                    $.ajax(sysPath + '/mobile/team/findTeamDetail/' + selfId, {
                        contentType: 'application/json; charset=utf-8',
                        type: 'get',
                        cache : false,
                        success: function(rawData) {
                            var data = cmcc.Group.reGroupDetail(rawData);
	                        var renderHeader = template.compile(tplHeader);
	                        var renderDetail = template.compile(tplDetail);
	                        var htmlHeader = renderHeader(data.header);
	                        var htmlDetail = renderDetail(data.detail);
	                        $('#teamVersion').val(data.detail.version);
	                        $('div.alert.alert-info').hide();
	                        $('#groupDetail').show().find('.group-heading').html(htmlHeader).end().find('#grpInf').html(htmlDetail).addClass('active').siblings().removeClass('active');
                        }
                    })
                });
            });
            //创建群组
            require(['text!../tpl/group_selection.tpl', 'text!../tpl/user_selection.tpl'],
            function(groupTpl, userTpl) {

                // 给选择分类列表填充选项
                function fillInGroups(tpl, target) {
                    $.ajax(sysPath + '/mobile/team/queryAllTeam', {
                        contentType: 'application/json; charset=utf-8',
                        type: 'get',
                        cache : false,
                        success: function(rawData) {
                            var data = cmcc.User.simpleGroups(rawData);
                        	var render = template.compile(tpl);
                        	var html = render(data);
                        	$(target).html(html);
                        }
                    })
                }

                // 给选择成员列表填充选项
                function fillInUsers(tpl, target) {
                    return $.ajax(sysPath + '/mobile/webUser/userContacts', {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({
                            updateDate: '2000-01-01 00:00:00'
                        }),
                        type: 'post',
                        cache : false,
                        success: function(rawData) {
                            var data = cmcc.User.simpleUsers(rawData);
                            var render = template.compile(tpl);
                            var html = render(data);

                            $(target).html(html)
                        }
                    })
                }

                // 创建群组
                $('#newGroupModal').on('show',
                function() {
                    $(this).find('#newGroupForm')[0].reset();
                    fillInGroups(groupTpl, '#selectParent');
                    fillInUsers(userTpl, '#selectMember');
                }).on('shown',
                function() {
                    /*$('#selectParent').chosen({
                        allow_single_deselect: true,
                        disable_search_threshold: 10,
                        display_selected_options: false,
                        no_results_text: "没有找到结果符合："
                    }).val('').trigger('chosen:updated');*/

                    $('#selectParent').xChosen({
                        afterInit: function () {
                            console.log(this._id);
                        }
                    });

                    $('#selectMember').xChosen();

                    /*$('#selectMember').chosen({
                        display_selected_options: false,
                        no_results_text: "没有找到结果符合："
                    }).val('').trigger('chosen:updated');*/
                }).on('click', '#createGroup',
                function(e) {
                    e.preventDefault();
                    $('#newGroupForm').trigger('submit');
                }).on('submit', '#newGroupForm',
                function(e) {
                    e.preventDefault();

                    var formData = $(this).serializeJSON();
                    formData.userList = [];

                    try {
                        $.each($('#selectMember').val(),
                        function(idx, val) {
                            formData.userList.push({
                                id: val
                            });
                        });
                    } catch(e) {
                        console.log(e.message);
                    }

                    $.ajax(sysPath + '/mobile/team/addteam', {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(formData),
                        type: 'post',
                        cache : false,
                        success: function() {
                            fetchGroupTree();
                        },
                        complete: function() {
                            $('#newGroupModal').modal('hide');
                        }
                    })
                });
                // 移交群组
                $('#groupDetail').on('click', '#transferTeam',
                function() {
                    fillInUsers(userTpl, '#selectNewOwner').done(function() {
                        var form = $('#transferTeamForm').parent().removeClass('hide').end()
                            .find('#selectNewOwner').xChosen(/*chosen({
                            display_selected_options: false,
                            no_results_text: "没有找到结果符合："
                        }*/).end().on('click', 'button[type=submit]',
                        function(e) {
                            e.preventDefault();
                            var formData = form.serializeJSON();
                            formData.id = $.cookie('currentTeamId');
							formData.version=$('#teamVersion').val();
                            $.ajax(sysPath + '/mobile/team/updateTeamcreater', {
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(formData),
                                type: 'post',
                                cache : false,
                                success: function() {
                                    $('#groupsList').find('a').filter(function() {
                                        return $(this).data('id') === $.cookie('currentTeamId', Number)
                                    }).trigger('click');
                                }
                            })
                        }).on('click', 'a.btn',
                        function(e) {
                            e.preventDefault();
                            form.parent().addClass('hide');
                        })
                    })
                });
                require(['text!../tpl/group_editing.html'],
                function(editTpl) {
                    var container = $('#groupDetail');
                    container.undelegate('#editBtn', 'click');
                    container.delegate('#editBtn', 'click',
                    function() {
                        var selfId = $.cookie('currentTeamId');
                        var render = template.compile(editTpl);
                        var data, html;
                        // Step1: 取群组详情
//                        $.getJSON(sysPath + '/mobile/team/findTeamDetail/' + selfId,
//                        function(rawData) {
//                            data = cmcc.Group.reGroupDetail(rawData);
//                        }
                        $.ajax(sysPath + '/mobile/team/findTeamDetail/'+selfId, {
                        	contentType: 'application/json; charset=utf-8',
                        	type: 'get',
                        	cache : false,
                        	success: function(rawData) {
                            	data = cmcc.Group.reGroupDetail(rawData);
                        	}
                       }).done(function() {
                            // Step2: 取可以作为分类的一级群组
//                            $.getJSON(sysPath + '/mobile/team/findMsgForAddTeam',
//                            function(rawData) {
//                                data.detail.parents = rawData
//                            }
                           $.ajax(sysPath + '/mobile/team/findMsgForAddTeam',{
	                        	contentType: 'application/json; charset=utf-8',
	                        	type: 'get',
	                        	cache : false,
	                        	success: function(rawData) {
	                            	data.detail.parents = rawData
	                        	}
	                       }).done(function() {
                                // Step3: 取用户列表
                                $.ajax(sysPath + '/mobile/webUser/userContacts', {
                                    contentType: 'application/json; charset=utf-8',
                                    data: JSON.stringify({
                                        updateDate: '2000-01-01 00:00:00'
                                    }),
                                    type: 'post',
                                    cache : false,
                                    success: function(rawData) {
                                        data.detail.users = cmcc.Group.simpleGroupMembers(rawData.userList)
                                    }
                                }).done(function() {
                                    // Step4: 取成员列表
//                                    $.getJSON(sysPath + '/mobile/team/queryTeamMembers/' + selfId,
//                                    function(rawData) {
//                                        data.detail.members = cmcc.Group.simpleGroupMembers(rawData);
//                                        html = render(data.detail);
//                                        container.find('#grpInf').empty().html(html)
//                                    }
                                	$.ajax(sysPath + '/mobile/team/queryTeamMembers/'+selfId,{
			                        	contentType: 'application/json; charset=utf-8',
			                        	type: 'get',
			                        	cache : false,
			                        	success: function(rawData) {
			                            	data.detail.members = cmcc.Group.simpleGroupMembers(rawData);
	                                        html = render(data.detail);
	                                        container.find('#grpInf').empty().html(html)
			                        	}
			                       }).done(function() {
                                        // Step4: 以上操作都是异步请求，逆序依赖才能完整填充编辑列表的模板，然后才是后续操作
                                        container.find('#parentId').xChosen(/*chosen({ // 分类选择
                                            disable_search_threshold: 10,
                                            display_selected_options: false,
                                            no_results_text: "没有找到结果符合："
                                        }*/).end().find('#memberIds').xChosen(/*chosen({ // 成员选择
                                            display_selected_options: false,
                                            no_results_text: "没有找到结果符合："
                                        }*/).end().find('#formEditTeam').on('click', '#cancelEdit',
                                        function() { // 取消编辑
                                            cmcc.Group.refreshCurrentGroup()
                                        }).on('click', '#submitEdit',
                                        function(e) { // 提交编辑
                                            e.preventDefault();
                                            var formData = $(e.delegateTarget).serializeJSON();
                                            var result = cmcc.Group.stringifyRoles(formData.roles);
                                            var div = $('div.control-group-item');
                                            var titles = [];
                                            div.each(function(i) {
                                                var di = $(this);
                                                var key = $('.reoleKey', di).val();
                                                var value = $('.rolesValue', di).val();
                                                if(key != '' && value != ''){
                                                	var keyValue = key + ':' + value;
                                                }
                                                titles.push(keyValue);
                                            });
                                            formData.id = $.cookie('currentTeamId');
                                            formData.titles = titles.toString();
                                            formData.userList = [];
                                            formData.version=$('#teamVersion').val();
                                            try {
                                                $.each($('#memberIds').val(),
                                                function(idx, val) {
                                                    formData.userList.push({
                                                        id: val
                                                    });
                                                });
                                            } catch(e) {
                                                console.log(e.message);
                                            }

                                            delete formData.roles;

                                            $.ajax(sysPath + '/mobile/team/updateTeamInfo', {
                                                contentType: 'application/json; charset=utf-8',
                                                data: JSON.stringify(formData),
                                                type: 'post',
                                                cache : false,
                                                success: function() {
                                                    cmcc.Group.refreshCurrentGroup()
                                                }
                                            });

                                        })
                                    })
                                })
                            })
                        })
                        $('.tab-pane').removeClass('active');
                        $('#grpInf').addClass('active');
                        $('li',$('ul#groupNavUl')).removeClass('active');
                        $('li#groupDetailNavLi').addClass('active');
                        
                    });
                    //添加职位的输入框
                    container.undelegate('a.role-add-btn', 'click');
                    container.delegate('a.role-add-btn', 'click',
                    function() {
                        var addhtml = '<div class="control-group control-group-item">';
                        addhtml += '<label class="control-label" for="chairman"><input class="reoleKey" type="text" placeholder="请输入职位" style="margin-top: -4px;padding-bottom: 3px;width: 120px;"></label>';
                        addhtml += '<div class="controls">';
                        addhtml += '<input type="text" class="rolesValue" placeholder="请输入人员"/>';
                        addhtml += '<a class="btn role-add-btn btn-link"><i class="fa fa-plus fa-fw"></i></a>';
                        addhtml += '</div>';
                        addhtml += '</div>';
                        var me = $(this);
                        if (!me.hasClass('firstAdd')) {
                            $(this).replaceWith('<a class="btn role-del-btn btn-link"><i class="fa fa-minus-square fa-fw"></i></a>');
                        } else {
                            me.addClass('hide');
                        }
                        $('#rolesListDiv').append(addhtml);
                    });
                    //删除职位的输入框
                    container.undelegate('a.role-del-btn', 'click');
                    container.delegate('a.role-del-btn', 'click',
                    function() {
                        $(this).parent().parent().remove();
                        var delbtn = $('a.role-del-btn');
                        if (0 === delbtn.length) {
                            $('.firstAdd').removeClass('hide');
                            $('a.role-add-btn').each(function(el) {
                                var me = $(this);
                                if (!me.hasClass('firstAdd')) {
                                    me.replaceWith('<a class="btn role-del-btn btn-link"><i class="fa fa-minus-square fa-fw"></i></a>');
                                }
                            })
                        }
                    });
                    //解散群组
                    container.on('click', 'a#dismissTeam', deleteTeam);
                });
                $('#groupDetail').on('show', 'a[data-toggle="tab"]', processDetail);

                function processDetail(e) {
                    switch (e.target.hash) {
                    case '#grpMsg':
                        fetchGroupMsgList(e.target.hash);
                        break;
                    case '#grpMem':
                        findAllMember(e.target.hash);
                        break;
                    }
                };
                function deleteTeam() {
                    var config = {
                        content: '您确定要删除该群组吗',
                        confirm: true,
                        cancel: true,
                        clickOk: function() {
                            var selfId = $.cookie('currentTeamId');
                            $.ajax(sysPath + '/mobile/team/deleteTeam/' + selfId, {
                                contentType: 'application/json; charset=utf-8',
                                dataType: 'json',
                                type: 'get',
                                cache : false,
                                success: function(res) {
                                    var config = {};
                                    if (res.code == '10000') {
                                        config.content = '删除成功';
                                        location.reload();
                                    } else {
                                        config.content = res.msg;
                                    }
                                    showMsg(config);
                                }
                            });
                        }
                    };
                    showMsg(config);

                }
                function fetchGroupMsgList(id) {
                    require(['text!../tpl/grp_msg_list.tpl'],
                    function(listTpl) {
                        var teamId = cmcc.Group.getCurrentId();

                        $.ajax(sysPath + '/mobile/search/stream/findByTeam/' + teamId, {
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                pageNumber: cmcc.Group.defaultPageNumber,
                                pageSize: cmcc.Group.defaultPageSize
                            }),
                            dataType: 'json',
                            type: 'post',
                            cache : false,
                            success: function(rawData) {
                                var render = template.compile(listTpl),
                                html = render({
                                    list: rawData,
                                    sysPath: sysPath
                                });
                                $(id).html(html);
                            }
                            //                        complete: function () {
                            //                            $('#grpMsg').on('click', 'a[target="_blank"]', showMsgItem)
                            //                        }
                        });
                        //消息的处理
                        $('body').undelegate('a.streamDeawithlLink', 'click');
                        $('body').delegate('a.streamDeawithlLink', 'click',
                        function() {
                            var me = $(this);
                            var type = me.data('type');
                            var streamId = me.data('streamid');
                            switch (type) {
                            case 'praise':
                                praiseStream(streamId, me);
                                break;
                            }
                        });
                        //赞消息
                        function praiseStream(streamId, el) {
                            var odata = {
                                refId: streamId,
                                refType: 1
                            };
                            $.ajax(sysPath + '/mobile/praise', {
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(odata),
                                type: 'post',
                                dataType: 'json',
                                cache : false,
                                success: function(rawData) {
                                    if (rawData.code == '10000') {
                                        var small = $('small', el);
                                        var count = small.html() - 0 + 1;
                                        $('small', el).html(count);
                                    } else {
                                        showMsg({
                                            content: rawData.msg
                                        });
                                    }
                                }
                            });
                        }
                    })
                };
                //查询所有成员
                function findAllMember(id) {
                    require(['text!../tpl/userList.tpl'],
                    function(memberTpl) {
                        var teamId = cmcc.Group.getCurrentId();
                        $.ajax(sysPath + '/mobile/team/findTeamById/' + teamId, {
                            contentType: 'application/json; charset=utf-8',
                            type: 'get',
                            cache : false,
                            success: function(res) {
                                var mydata={};
                                if (res.team.userList) {
                                	mydata.userList=groupUserByFirstLetter(res.team.userList);
                                	mydata.baseUrl=sysPath;
                                } else {
                                    mydata = {};
                                }
                                console.log(mydata);
                                var render = template.compile(memberTpl),
                                html = render(mydata);
                                $(id).html(html);
                            }
                        })
                    })
                }
                $('body').on('click', '.userDetail', function() {
					window.location.href = sysPath + '/user/toUserDetail/' + $(this).data('userid');
				});

            });
            function loadUserList(ul) {
				var users = groupUserByFirstLetter(ul);
				var datas = {
						userList : users,
						baseUrl : sysPath
					};
				var render = template.compile(raw);
				var html = render(datas);
				$('#userList').html(html);
				
			}
            //处理群组成员
            function groupUserByFirstLetter(userList) {
				if (userList.length == 0) {
					return '';
				}
				var userListOrderByFirstLetter = new Array();
				for (var i = 0; i < letterArr.length; i++) {
					var currLetter = letterArr[i];
					var userListOrderBySingleFirstLetter = new Array();
					for (var j = 0; j < userList.length; j++) {
						var user = userList[j].userInfo;
						var firstLetters = user.firstLetter;
						if (firstLetters == undefined || firstLetters == '' || firstLetters == null) {
							continue;
						}
						if (firstLetters != null && firstLetters != '') {
							var firstLetter = firstLetters.substring(0,1);
							if (currLetter == firstLetter) {
								userListOrderBySingleFirstLetter.push(user);
							}
						}
					}
					var tempList = {
						firstLetter : currLetter,
							ul : userListOrderBySingleFirstLetter
						};
					userListOrderByFirstLetter.push(tempList);
				}
			return userListOrderByFirstLetter;
		}
            // 加入 / 退出群组
            function addOrDeleteMember(event) {
                event.preventDefault();

                var self = $(event.target);
                // action 是 'add' 或 'delete'
                var endPoint = sysPath + '/mobile/team/' + event.data.action + 'Member';

                $.ajax(endPoint, {
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({
                        userId: self.data('userid'),
                        teamId: self.data('teamid')
                    }),
                    type: 'post',
                    cache : false,
                    complete: function() {
                        cmcc.Group.refreshCurrentGroup()
                    }
                })
            }
        });
    })
});
require(['config'], function () {
    "use strict";


    require(['json3', 'domready', 'bootstrap', 'module/header'], function (JSON) {
        // 群组列表一级菜单的状态判断
        $('#groupsList').on('click', 'a.first-level', function () {
            var self = $(this),
            icon = self.children('i');

            if (self.hasClass('collapsed')) {
                icon.attr('class', 'icon-minus');
            } else {
                icon.attr('class', 'icon-plus');
            }
        });

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
                complete: function () {
                    cmcc.Group.refreshCurrentGroup()
                }
            })
        }

        $('#groupDetail')
        .on('click', '#joinTeam', { action: 'add' }, addOrDeleteMember)
        .on('click', '#quitTeam', { action: 'delete' }, addOrDeleteMember);


        require(['cmcc', 'template', 'syntax',
            'chosen', 'jquery.cookie', 'jquery.serializeJSON'], function (cmcc, template) {

            function fetchGroupTree() {
                require(['text!../tpl/groups_list.tpl'], function (raw) {
                    $.getJSON(sysPath + "/mobile/team/queryAllTeam", function (rawdata) {
                        var data = cmcc.Group.reGroupList(rawdata);
                        var render = template.compile(raw);
                        var html = render(data);
                        $('#groupsList').find('.accordion-group').remove().end().append(html);
                    })
                })
            }

            fetchGroupTree();

            require(['text!../tpl/group_header.tpl', 'text!../tpl/group_detail.tpl'],
            function (tplHeader, tplDetail) {
                // 取群组详情
                $('#groupsList').on('click', 'a.is-group', function (e) {
                    e.preventDefault();
                    var selfId = $(this).data('id');
                    $.cookie('currentTeamId', selfId);

                    $.getJSON(sysPath + '/mobile/team/findTeamDetail/' + selfId, function (rawData) {
                        var data = cmcc.Group.reGroupDetail(rawData);

                        var renderHeader = template.compile(tplHeader);
                        var renderDetail = template.compile(tplDetail);

                        var htmlHeader = renderHeader(data.header);
                        var htmlDetail = renderDetail(data.detail);

                        $('div.alert.alert-info').hide();

                        $('#groupDetail').show()
                            .find('.group-heading').html(htmlHeader).end()
                            .find('#grpInf').html(htmlDetail).addClass('active')
                            .siblings().removeClass('active');
                    })
                })
            });

            require([
                'text!../tpl/group_selection.tpl',
                'text!../tpl/user_selection.tpl'
            ], function (groupTpl, userTpl) {

                // 给选择分类列表填充选项
                function fillInGroups(tpl, target) {
                    $.getJSON(sysPath + '/mobile/team/queryAllTeam', function (rawData) {
                        var data = cmcc.User.simpleGroups(rawData);
                        var render = template.compile(tpl);
                        var html = render(data);

                        $(target).html(html);
                    });
                }

                // 给选择成员列表填充选项
                function fillInUsers(tpl, target) {
                    return $.ajax(sysPath + '/mobile/webUser/userContacts', {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ updateDate: '2000-01-01 00:00:00' }),
                        type: 'post',
                        success: function (rawData) {
                            var data = cmcc.User.simpleUsers(rawData);
                            var render = template.compile(tpl);
                            var html = render(data);

                            $(target).html(html)
                        }
                    })
                }

                // 创建群组
                $('#newGroupModal').on('show', function () {
                    $(this).find('#newGroupForm')[0].reset();
                    fillInGroups(groupTpl, '#selectParent');
                    fillInUsers(userTpl, '#selectMember');
                }).on('shown', function () {
                    $('#selectParent').chosen({
                        allow_single_deselect: true,
                        disable_search_threshold: 10,
                        display_selected_options: false,
                        no_results_text: "没有找到结果符合："
                    }).val('').trigger('chosen:updated');

                    $('#selectMember').chosen({
                        display_selected_options: false,
                        no_results_text: "没有找到结果符合："
                    }).val('').trigger('chosen:updated');
                }).on('click', '#createGroup', function (e) {
                    e.preventDefault();
                    $('#newGroupForm').trigger('submit');
                }).on('submit', '#newGroupForm', function (e) {
                    e.preventDefault();

                    var formData = $(this).serializeJSON();
                    formData.userList = [];

                    try {
                        $.each($('#selectMember').val(), function (idx, val) {
                            formData.userList.push({ id: val });
                        });
                    } catch (e) {
                        console.log(e.message);
                    }

                    $.ajax(sysPath + '/mobile/team/addteam', {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(formData),
                        type: 'post',
                        success: function () {
                            fetchGroupTree();
                        },
                        complete: function () {
                            $('#newGroupModal').modal('hide');
                        }
                    })
                });

                // 移交群组
                $('#groupDetail').on('click', '#transferTeam', function () {

                    fillInUsers(userTpl, '#selectNewOwner').done(function () {
                        var form = $('#transferTeamForm').parent().removeClass('hide')
                        .end().find('#selectNewOwner').chosen({
                            display_selected_options: false,
                            no_results_text: "没有找到结果符合："
                        })
                        .end().on('click', 'button[type=submit]', function (e) {
                            e.preventDefault();
                            var formData = form.serializeJSON();
                            formData.id = $.cookie('currentTeamId');

                            $.ajax(sysPath + '/mobile/team/updateTeamcreater', {
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify(formData),
                                type: 'post',
                                success: function () {
                                    $('#groupsList').find('a').filter(function () {
                                        return $(this).data('id') === $.cookie('currentTeamId', Number)
                                    }).trigger('click');
                                }
                            })
                        }).on('click', 'a.btn', function (e) {
                            e.preventDefault();
                            form.parent().addClass('hide');
                        })
                    })
                })
            });

            require(['text!../tpl/group_editing.tpl'], function (editTpl) {
                var container = $('#groupDetail');
				container.undelegate('#editBtn', 'click');
				container.delegate('#editBtn', 'click',function() {
                    var selfId = $.cookie('currentTeamId');
                    var render = template.compile(editTpl);
                    var data, html;
                    // Step1: 取群组详情
                    $.getJSON(sysPath + '/mobile/team/findTeamDetail/' + selfId,
                    function (rawData) {
                        data = cmcc.Group.reGroupDetail(rawData)
                    	console.log(data);
                    }).done(function () {
                        // Step2: 取可以作为分类的一级群组
                        $.getJSON(sysPath + '/mobile/team/findMsgForAddTeam',
                        function (rawData) {
                            data.detail.parents = rawData
                        }).done(function () {
                            // Step3: 取用户列表
                            $.ajax(sysPath + '/mobile/webUser/userContacts', {
                                contentType: 'application/json; charset=utf-8',
                                data: JSON.stringify({ updateDate: '2000-01-01 00:00:00' }),
                                type: 'post',
                                success: function (rawData) {
                                    data.detail.users = cmcc.Group.simpleGroupMembers(rawData.userList)
                                }
                            }).done(function () {
                                // Step4: 取成员列表
                                $.getJSON(sysPath + '/mobile/team/queryTeamMembers/' + selfId,
                                function (rawData) {
                                    data.detail.members = cmcc.Group.simpleGroupMembers(rawData);
                                    html = render(data.detail);
                                    container.find('#grpInf').empty().html(html)
                                }).done(function () {
                                    // Step4: 以上操作都是异步请求，逆序依赖才能完整填充编辑列表的模板，然后才是后续操作
                                    container.find('#parentId').chosen({ // 分类选择
                                        disable_search_threshold: 10,
                                        display_selected_options: false,
                                        no_results_text: "没有找到结果符合："
                                    }).end().find('#memberIds').chosen({ // 成员选择
                                        display_selected_options: false,
                                        no_results_text: "没有找到结果符合："
                                    }).end().find('#formEditTeam').on('click', '#cancelEdit',function () { // 取消编辑
                                        cmcc.Group.refreshCurrentGroup()
                                    }).on('click', '#submitEdit', function (e) { // 提交编辑
                                        e.preventDefault();
                                        var formData = $(e.delegateTarget).serializeJSON();
                                        var result = cmcc.Group.stringifyRoles(formData.roles);

                                        formData.id = $.cookie('currentTeamId');
                                        formData.titles = result.slice(0, -1);
                                        formData.userList = [];

                                        try {
                                            $.each($('#memberIds').val(), function (idx, val) {
                                                formData.userList.push({ id: val });
                                            });
                                        } catch (e) {
                                            console.log(e.message);
                                        }

                                        delete formData.roles;

                                        $.ajax(sysPath + '/mobile/team/updateTeamInfo', {
                                            contentType: 'application/json; charset=utf-8',
                                            data: JSON.stringify(formData),
                                            type: 'post',
                                            success: function () {
                                                cmcc.Group.refreshCurrentGroup()
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
				});
				//解散群组
				container.undelegate('#dismissTeam', 'click');
				container.delegate('#dismissTeam', 'click',function() {
					var selfId = $.cookie('currentTeamId');
					$.ajax(sysPath + '/mobile/team/deleteTeam/'+selfId, {
		                contentType: 'application/json; charset=utf-8',
		                dataType : 'json',
		                type: 'get',
		                success: function (res) {
		                	if(res.code=='10000'){
		                		alert('删除成功！');
		                		location.reload();
		                	}else{
		                		alert(res.msg);
		                	}
		                }
		            });
				});
              //  container.on('click', '#editBtn', function () {})
            });

            $('#groupDetail').on('show', 'a[data-toggle="tab"]', processDetail);

            function processDetail(e) {
                switch (e.target.hash) {
                    case '#grpMsg':
                        fetchGroupMsgList(e.target.hash);
                }
            }

            function fetchGroupMsgList(id) {
                require(['text!../tpl/grp_msg_list.tpl'], function (listTpl) {
                    var teamId = cmcc.Group.getCurrentId();

                    $.ajax(sysPath + '/mobile/search/stream/findByTeam/' + teamId, {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({
                            pageNumber: cmcc.Group.defaultPageNumber,
                            pageSize: cmcc.Group.defaultPageSize
                        }),
                        type: 'post',
                        success: function (rawData) {
                            var render = template.compile(listTpl),
                                html = render({
                                    list: rawData,
                                    sysPath: sysPath
                                });

                            $(id).html(html);
                        },
                        complete: function () {
                            $('#grpMsg').on('click', 'a[target="_blank"]', showMsgItem)
                        }
                    })
                })
            }

            function showMsgItem(e) {
                var $body = $('body'),
                    $target = $body.find('#footer').first(),
                    $modal = cmcc.DOM.createSuperModal($target),
                    $link = $(e.target),
                    itemId = $link.data('stream-id');

                e.preventDefault();

                $modal
                    .one('show', {
                        itemId: itemId,
                        container: $modal
                    }, processMsgItem)
                    .one('shown', function () {
                        var operators = $(this).find('.modal-footer button.btn');
                        operators.click({
                            itemId: itemId
                        }, dispatchOperation)
                    })
/*
                    .one('shown', {

                    }, function() {
                        console.log('2nd');
                    })
*/
                    .modal({ backdrop: true })
            }

            function dispatchOperation(e) {
                var operationType = $(this).data('type');
                cmcc.Message.processOperation[operationType](e);
            }

            function processMsgItem(e) {
                require(['text!../tpl/grp_msg_item.tpl'], function (itemTpl) {
                    $.getJSON(sysPath + '/mobile/stream/' + e.data.itemId,
                        function (rawData) {
                            var container = $(e.data.container),
                                render = template.compile(itemTpl),
                                html = render(rawData);

                            container.html(html);
                        }
                    )
                })
            }
        })
    });


    require(['module/widget'], function (Widget) {
        var announceWidget = new Widget({
            widgetType: 'announce'
        });

        announceWidget.init();

        var weatherWidget = new Widget({
            widgetType: 'weather'
        });

        weatherWidget.init();

        var stockWidget = new Widget({
            widgetType: 'stock'
        });

        stockWidget.init();
    })
});

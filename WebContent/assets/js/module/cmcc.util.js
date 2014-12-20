!function (global) {
    'use strict';

    var cmcc = function () {
        console.log("全宇宙最大的奥秘就在我这里——你们这群蠢货！")
    };


    cmcc.version = '1.0.0';


    cmcc.DOM = {};

    cmcc.DOM.createSuperModal = function($target) {
        var modal = $('#superModal');

        if (modal.length === 0) {
            $target.after('<div id="superModal" class="modal fade hide"></div>');
            return $('#superModal')
        } else return modal;
    };


    cmcc.Util = {};

    cmcc.Util.triggerModal = function (event) {
        var options = event.data;

        if (typeof options.target !== 'undefined') {
            $(options.target).modal({
                backdrop: (typeof options.backdrop === 'undefined') ? true : options.backdrop,
                show: (typeof options.show === 'undefined') ? true : options.show
            });
        } else {
            throw new ReferenceError('找不到 target，无法调用 Bootstrap.modal');
        }
    };

    cmcc.Util.getUrlVars = function () {
        var vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
            function (matched, key, val) {
                vars[key] = val
            });
        return vars;
    };

    cmcc.Util.getMyId = function () {
        // return $.cookie('userId', Number)
        return parseInt(global.$userId, 10);
    };


    cmcc.Message = {};

    cmcc.Message.processOperation = {
        praise: function (e) {
            var praiseType = $(e.target).data('reftype');

            $.ajax(sysPath + '/mobile/praise', {
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    refId: e.data.itemId,
                    refType: praiseType
                }),
                type: 'post',
                success: function (rawData) {
                    console.log('done', rawData);
                }
            })
        },
        comment: function (e) {
            var commentForm = $('#commentForm'),
                itemId = e.data.itemId;

            commentForm.show().find('#commentContent').focus().end()
                .on('submit', function (e) {
                    var formData;
                    e.preventDefault();

                    formData = $(e.target).serializeJSON();
                    formData['refType'] = parseInt(formData['commentType'], 10);
                    formData.refId = formData.rootId = itemId;
                    delete formData['commentType'];
                    
                    $.ajax(sysPath + '/mobile/comment', {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify(formData),
                        type: 'post',
                        success: function (rawData) {
                            debugger
                        }
                    })
                })
        },
        forward: function (e) {
            console.log(this, e.data.itemId, e.target);
        }
    }


    cmcc.User = {};

    cmcc.User.simpleUsers = function (rawData) {
        var data = {
            users: []
        };

        $.each(rawData.userList, function (k, v) {
            data.users.push({ id: v.id, name: v.userName })
        });

        return data;
    };

    cmcc.User.simpleGroups = function (rawData) {
        var data = {
            groups: [{ id: 0, name: ""}]
        };

        $.each(rawData.parent, function (k, v) {
            if (v.memberCount <= 1) {
                data.groups.push({ id: v.id, name: v.teamName })
            }
        });

        return data;
    };


    cmcc.Group = {
        defaultPageNumber: 1,
        defaultPageSize: 10
    };

    cmcc.Group.getCurrentId = function () {
        return $.cookie('currentTeamId', Number)
    };

    cmcc.Group.refreshCurrentGroup = function () {
        $('#groupsList').find('a').filter(function () {
            return $(this).data('id') === cmcc.Group.getCurrentId();
        }).trigger('click');
    };

    cmcc.Group.reGroupList = function (rawData) {
        var reGroupedList = {
            firstLevel: [],
            firstEmptyLevel: [],
            firstLevelGroup: [],
            children: []
        };

        $.each(rawData.parent, function (key, val) {
            // 若一级下的成员数目为 0，则可能是数据库直接插入的，否则应为 1，即创建者
            if (val.memberCount <= 1) {
                // 若没有子群组，则页面显示 “没有子群组”
                if (val.childCount !== 0) {
                    reGroupedList.firstLevel.push(val)
                } else if (val.childCount === 0) {
                    reGroupedList.firstEmptyLevel.push(val)
                }
            } else {
                // 若没有子群组，且成员数目 > 1，则为一级群组而不是分类
                reGroupedList.firstLevelGroup.push(val)
            }
        });

        $.each(rawData.child, function (key, val) {
            reGroupedList.children.push(val)
        });

        return reGroupedList;
    };

    cmcc.Group.reGroupDetail = function (rawData) {
    	var title=rawData.teamVo.title;
    	var t=rawData.teamVo.titles.split(',')
    	var roles=[];
    	for(var i=0;i<t.length;i++){
    		if(t[i].length>0){
    			var t2=t[i].split(':');
    			if(t2.length>1){
	    			var str='{"key":"'+t2[0]+'","value":"'+t2[1]+'"}';
	    			roles.push($.parseJSON(str));
    			}
    		}
    	}
//    	for (var key in title){
//    		var str='{"key":"'+key+'","value":"'+title[key]+'"}';
//    		roles.push($.parseJSON(str));
//    	};
        return {
            header: {
                groupName: rawData.teamVo.teamName,
                ownerName: rawData.teamVo.createName,
                ownerId: rawData.teamVo.createId,
                currentId: cmcc.Util.getMyId(),
                isMember: rawData.teamVo.isTeamMember
            },

            detail: {
            	version: rawData.teamVo.version,
                groupId: rawData.teamVo.teamId,
                groupName: rawData.teamVo.teamName,
                ownerId: rawData.teamVo.createId,
                ownerName: rawData.teamVo.createName,
                createdAt: rawData.teamVo.createDate,
                parentId: rawData.teamVo.parentId,
                parentName: rawData.teamVo.parentName,
                isMember: rawData.teamVo.isTeamMember,
                currentId: cmcc.Util.getMyId(),
                count: {
                    stream: rawData.teamVo.streamCount,
                    member: rawData.teamVo.memberCount,
                    images: rawData.teamVo.imageCount,
                    attach: rawData.teamVo.attachmentCount
                },
                options: {
                    isJoinable: rawData.teamVo.isOpen,
                    isWritable: rawData.teamVo.isWrite
                },
//                roles: {
//                    chairman: rawData.teamVo.title.chairman,
//                    literaly: rawData.teamVo.title.literaly,
//                    calligraphy: rawData.teamVo.title.calligraphy,
//                    communication: rawData.teamVo.title.communication,
//                    literaly1: rawData.teamVo.title.literaly1,
//                    sports: rawData.teamVo.title.sports,
//                    calligraphy1: rawData.teamVo.title.calligraphy1,
//                    communication1: rawData.teamVo.title.communication1,
//                    secretary: rawData.teamVo.title.secretary,
//                    deputy: rawData.teamVo.title.deputysecretary,
//                    liaison: rawData.teamVo.title.liaison,
//                    studies: rawData.teamVo.title.studies,
//                    recreation: rawData.teamVo.title.recreation,
//                    livelihood: rawData.teamVo.title.livelihood,
//                    studies1: rawData.teamVo.title.studies1,
//                    studies2: rawData.teamVo.title.studies2,
//                    recreation1: rawData.teamVo.title.recreation1,
//                    recreation2: rawData.teamVo.title.recreation2,
//                    livelihood1: rawData.teamVo.title.livelihood1,
//                    livelihood2: rawData.teamVo.title.livelihood2,
//                    safety: rawData.teamVo.title.safety,
//                    leader1: rawData.teamVo.title.leader1,
//                    leader1_: rawData.teamVo.title.leader1_,
//                    leader2: rawData.teamVo.title.leader2,
//                    leader2_: rawData.teamVo.title.leader2_,
//                    leader3: rawData.teamVo.title.leader3,
//                    leader3_: rawData.teamVo.title.leader3_,
//                    leader4: rawData.teamVo.title.leader4,
//                    leader4_: rawData.teamVo.title.leader4_
//                }
				roles: roles
            }
        }
    };

    cmcc.Group.simpleGroupMembers = function (rawData) {
        var resultArray = [];

        $.each(rawData, function (idx, val) {
            var userName = (typeof val.userInfo === 'undefined') ?
                           val.userName :
                           val.userInfo.userName;
            resultArray.push({id: val.id, name: userName})
        });

        return resultArray;
    };

    cmcc.Group.stringifyRoles = function (obj) {
        var str = '';

        for (var k in obj) {
            if (obj[k] === '无') {
                obj[k] = null;
                str += k + ':' + obj[k] + ','
            }
        }

        return str
    }


    cmcc.Photo = {};

    cmcc.Photo.getMyAlbum = function (rawData) {
        var arr = [];

        $.each(rawData.folders, function () {
            if (this.folderType === '3') arr.push(this)
        });

        return { folders: arr }
    };

    cmcc.Photo.renderHtml = function (tpl, data, target) {
        var render = template.compile(tpl);
        var html = render(data);
        $('ul', target).html(html).listview('refresh')
    };


    // for RequireJS and SeaJS
    if (typeof define === 'function') {
        define(function () {
            return cmcc
        })
    }

    // for NodeJS
    if (typeof module !== 'undefined' && typeof exports === 'undefined') {
        module.exports = cmcc
    }

    global.cmcc = cmcc

}(this);

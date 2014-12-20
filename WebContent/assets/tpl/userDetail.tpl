                <div class="span2">
                    <div class="avatar">
                        <img src="{{baseUrl}}/{{u.userImgUrl}}"/>
                        {{if currUserId == u.id}}
                        <button type="button" class="btn btn-primary" onclick="javascript: window.location.href='{{baseUrl}}/mobile/webUser/toUpdateUser'">
                            <i class="fa fa-pencil fa-fw"></i>
                            	编辑资料
                        </button>
                        {{/if}}
                        {{if currUserId != u.id}}
                        <button type="button" class="btn btn-primary" onclick="javascript: window.location.href='{{baseUrl}}/mobile/search/stream/fromUserInfo/{{u.id}}'">
                            <i class="fa fa-pencil fa-fw"></i>
                            	Ta的消息
                        </button>
                        {{/if}}
                    </div>
                </div>
                <div class="span5">
                    <dl class="dl-horizontal detail">
                        <dt>姓名</dt>
                        <dd>{{u.userName}}&nbsp;</dd>
                        <dt>出生年月</dt>
                        <dd>{{u.birthdayForContacts}}&nbsp;</dd>
                        <hr/>
                        <dt>所属支部</dt>
                        <dd>{{u.defalutTeamName}} &nbsp;</dd>
                        <dt>组号</dt>
                        <dd>{{groupName}} &nbsp;</dd>
                        <hr/>
                        <dt>入党日期</dt>
                        <dd>{{u.joinDate}} &nbsp;</dd>
                        <dt>转正日期</dt>
                        <dd>{{u.turnDate}} &nbsp;</dd>
                        <hr/>
                        <dt>单位一</dt>
                        <dd>{{u.org}} &nbsp;</dd>
                        <dt>单位二</dt>
                        <dd>{{u.oldDept}} &nbsp;</dd>
                        <dt>学历</dt>
                        <dd>{{u.education}} &nbsp;</dd>
                        <dt>房间号</dt>
                        <dd>{{u.roomNum}} &nbsp;</dd>
                        <hr/>
                        <dt>地址一</dt>
                        <dd>{{u.address}} &nbsp;</dd>
                        <dt>地址二</dt>
                        <dd>{{u.address2}} &nbsp;</dd>
                        <dt>手机一</dt>
                        <dd>{{u.phoneNumber}} &nbsp;</dd>
                        <dt>手机二</dt>
                        <dd>{{u.workPhone}} &nbsp;</dd>
                        <dt>学历</dt>
                        <dd>{{u.education}} &nbsp;</dd>
                    </dl>
                </div>
                <div class="span5">
                    <dl class="dl-horizontal detail">
                        <dt>性别</dt>
                        <dd>
                        	{{if u.gender == 1}}
                        		男
                        	{{else if u.gender == 0}}
                        		女
                        	{{/if}}&nbsp;
						</dd>
                        <dt>民族</dt>
                        <dd>{{u.nation}}&nbsp;</dd>
                        <hr/>
                        <dt>班内职务</dt>
                        <dd>{{u.classTitle}}&nbsp;</dd>
                        <dt>俱乐部职务</dt>
                        <dd>{{clubTitleName}}&nbsp;</dd>
                        <hr/>
                        <dt>行政职级</dt>
                        <dd>{{u.title}}&nbsp;</dd>
                        <dt>&nbsp;</dt>
                        <dd>&nbsp;</dd>
                        <hr/>
                        <dt>职务</dt>
                        <dd>{{u.orgTitle}}&nbsp;</dd>
                        <dt>职务</dt>
                        <dd>{{u.oldDeptTitle}}&nbsp;</dd>
                        <dt>学位</dt>
                        <dd>{{u.degree}}&nbsp;</dd>
                        <dt>房间电话</dt>
                        <dd>{{u.roomPhone}}&nbsp;</dd>
                        <hr/>
                        <dt>邮编</dt>
                        <dd>{{u.postcode1}}&nbsp;</dd>
                        <dt>邮编</dt>
                        <dd>{{u.postcode2}}&nbsp;</dd>
                        <dt>电子邮件一</dt>
                        <dd><a href="mailto:{{u.email}}">{{u.email}}</a>&nbsp;</dd>
                        <dt>学位</dt>
                        <dd>{{u.degree}} &nbsp;</dd>
                    </dl>
                </div>

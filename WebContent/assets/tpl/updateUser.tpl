<div class="span12">
	<form >
	<header class="wrapper-header">
		<h4 class="page-title"><i class="fa fa-user fa-fw fa-lg"></i> 编辑资料</h4>
	</header>

	<div class="row">
		<div class="span2">
			<div class="avatar">
				<img src="{{baseUrl}}/{{u.userImgUrl}}" alt="{{u.userName}}">
				<a class="btn btn-primary" href="{{baseUrl}}/mobile/webUser/toUpdateUserImg">
				<i class="fa fa-pencil fa-fw"></i>
					更换头像
				</a>
			</div>
		</div>
		<div class="span5">
			<input type="hidden" id="id" name="id" value="{{u.id}}"/>
                    <dl class="dl-horizontal detail">
                        <dt>姓名</dt>
                        <dd><input type="text" name="userName" value="{{u.userName}}"/></dd>
                        <dt>出生日期</dt>
                        <dd><input type="date" name="birthday" value="{{u.birthday}}" /></dd>
                        <hr/>
                        <dt>所属支部</dt>
                        <dd><select name="defaultTeam" id="defaultTeam">
                            <option value="">请选择...</option>
                            {{if defaultTeam !== ''}}
                            {{each defaultTeam as t}}
                            	<option value="{{t.id}}" {{if u.defaultTeam === t.id}}selected="selected"{{/if}}>{{t.teamName}}</option>
                            {{/each}}
                            {{/if}}
                        </select></dd>
                        <dt>组号</dt>
                        <dd><select name="groupNumber" id="groupNumber">
                            <option value="">请选择...</option>
                            <option value="1" {{if u.groupNumber === 1}}selected="selected"{{/if}}>第一组</option>
                            <option value="2" {{if u.groupNumber === 2}}selected="selected"{{/if}}>第二组</option>
                            <option value="3" {{if u.groupNumber === 3}}selected="selected"{{/if}}>第三组</option>
                            <option value="4" {{if u.groupNumber === 4}}selected="selected"{{/if}}>第四组</option>
                        </select></dd>
                        <hr/>
                        <dt>单位一</dt>
                        <dd><input type="text" name="org" value="{{u.org}}"/></dd>
                        <dt>单位二</dt>
                        <dd><input type="text" name="oldDept" value="{{u.oldDept}}"/></dd>
                        <dt>学历</dt>
                        <dd><input type="text" name="education" value="{{u.education}}"/></dd>
                        <hr/>
                        <dt>地址一</dt>
                        <dd><input type="text" name="address" value="{{u.address}}"/></dd>
                        <dt>地址二</dt>
                        <dd><input type="text" name="address2" value="{{u.address2}}"/></dd>
                        <dt>手机一</dt>
                        <dd><input type="text" name="phoneNumber" value="{{u.phoneNumber}}"/></dd>
                        <dt>手机二</dt>
                        <dd><input type="text" name="workPhone" value="{{u.workPhone}}"/></dd>
                    </dl>
                </div>
                <div class="span5">
                    <dl class="dl-horizontal detail">
                        <dt>性别</dt>
                        <dd><select name="gender">
                        	<option value="">请选择...</option>
                            <option value="1" {{if u.gender ===1}}selected{{/if}}>男</option>
                            <option value="0" {{if u.gender ===0}}selected{{/if}}>女</option>
                        </select></dd>
                        <dt>民族</dt>
                        <dd><input type="text" name="nation" value="{{u.nation}}" /></dd>
                        <hr/>
                        <dt>班内职务</dt>
                        <dd><select name="classTitle">
                             <option value="">请选择...</option>
                                <option value="1" {{if u.classTitle === 1}}selected{{/if}}>书记</option>
                                <option value="2" {{if u.classTitle === 2}}selected{{/if}}>副书记</option>
                                <option value="3" {{if u.classTitle === 3}}selected{{/if}}>中组部联络员</option>
                                <option value="4" {{if u.classTitle === 4}}selected{{/if}}>学习委员</option>
                                <option value="5" {{if u.classTitle === 5}}selected{{/if}}>文体委员</option>
                                <option value="6" {{if u.classTitle === 6}}selected{{/if}}>生活委员</option>
                                <option value="7" {{if u.classTitle === 7}}selected{{/if}}>学习委员助理1</option>
                                <option value="8" {{if u.classTitle === 8}}selected{{/if}}>学习委员助理2</option>
                                <option value="9" {{if u.classTitle === 9}}selected{{/if}}>文体委员助理1</option>
                                <option value="10" {{if u.classTitle === 10}}selected{{/if}}>文体委员助理2</option>
                                <option value="11" {{if u.classTitle === 11}}selected{{/if}}>生活委员助理1</option>
                                <option value="12" {{if u.classTitle === 12}}selected{{/if}}>生活委员助理2</option>
                                <option value="13" {{if u.classTitle === 13}}selected{{/if}}>安全员</option>
                                <option value="14" {{if u.classTitle === 14}}selected{{/if}}>一组组长</option>
                                <option value="15" {{if u.classTitle === 15}}selected{{/if}}>一组副组长</option>
                                <option value="16" {{if u.classTitle === 16}}selected{{/if}}>二组组长</option>
                                <option value="17" {{if u.classTitle === 17}}selected{{/if}}>二组副组长</option>
                                <option value="18" {{if u.classTitle === 18}}selected{{/if}}>三组组长</option>
                                <option value="19" {{if u.classTitle === 19}}selected{{/if}}>三组副组长</option>
                                <option value="20" {{if u.classTitle === 20}}selected{{/if}}>四组组长</option>
                                <option value="21" {{if u.classTitle === 21}}selected{{/if}}>四组副组长</option>
                        </select></dd>
                        <dt>俱乐部职务</dt>
                        <dd><select name="clubTitle">
                            <option value="">请选择...</option>
                            <option value="1" {{if u.clubTitle === 1}}selected{{/if}}>主任</option>
                            <option value="2" {{if u.clubTitle === 2}}selected{{/if}}>文体协会会长</option>
                            <option value="3" {{if u.clubTitle === 3}}selected{{/if}}>书画协会会长</option>
                            <option value="4" {{if u.clubTitle === 4}}selected{{/if}}>通讯协会会长</option>
                            <option value="5" {{if u.clubTitle === 5}}selected{{/if}}>文体协会理事</option>
                            <option value="6" {{if u.clubTitle === 6}}selected{{/if}}>体育协会理事</option>
                            <option value="7" {{if u.clubTitle === 7}}selected{{/if}}>书画协会理事</option>
                            <option value="8" {{if u.clubTitle === 8}}selected{{/if}}>通讯协会理事</option>
                        </select></dd>
                        <hr/>
                        <dt>职务</dt>
                        <dd><input type="text" name="orgTitle" value="{{u.orgTitle}}"/></dd>
                        <dt>职务</dt>
                        <dd><input type="text" name="oldDeptTitle" value="{{u.oldDeptTitle}}"/></dd>
                        <dt>学位</dt>
                        <dd><input type="text" name="degree" value="{{u.degree}}"/></dd>
                        <hr/>
                        <dt>邮编</dt>
                        <dd><input type="text" name="postcode1" value="{{u.postcode1}}"/></dd>
                        <dt>邮编</dt>
                        <dd><input type="text" name="postcode2" value="{{u.postcode2}}"/></dd>
                        <dt>电子邮件一</dt>
                        <dd><input type="text" name="email" value="{{u.email}}"/></dd>
                        <dt>修改密码</dt>
                        <dd><a href="#myModal" role="button" class="btn" data-toggle="modal">修改密码</a></dd>
                    </dl>
                    <div class="wrapper-submit pull-right">
                        <button type="button" class="btn btn-success">
                            <i class="fa fa-check fa-fw"></i>
                           		 确认修改
                        </button>
                        <button type="button" class="btn btn-inverse">
                            <i class="fa fa-times fa-fw"></i>
                            	取消修改
                        </button>
                    </div>
                </div>
	</div>
	</form>
</div>
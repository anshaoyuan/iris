
{{each userList as uu}}
{{if uu.ul != ''}}
	<a href="#{{uu.firstLetter}}">{{uu.firstLetter}}</a>
	<hr />
	<ul class="row contacts-list">
	{{each uu.ul as u}}
		<li class="span4 list-item" style="width: 300px">
	    <div class="pull-left list-avatar">
	        <a href="{{baseUrl}}/user/toUserDetail/{{u.id}}"><img src="{{baseUrl}}/{{u.userImgUrl}}"/></a>
	    </div>
	    <div class="pull-left list-detail">
	        <div><a href="{{baseUrl}}/user/toUserDetail/{{u.id}}"><strong>{{u.userName}}</strong></a></div>
	        <div>
	            {{u.phoneNumber}}&nbsp;
	            <a class="btn btn-link btn-small" href="{{baseUrl}}/mobile/stream/topub-sms/{{u.phoneNumber}}">
	            <i class="fa fa-mobile fa-lg"></i>
	                	发短信
	            </a>
	        </div>
	        <div style="font-size: 14px;" title="{{u.org}}">{{u.shortOrg}}&nbsp;</div>
	        <div title="{{u.orgTitle}}">{{u.shortOrgTitle}}&nbsp;</div>
	    </div>
		</li>
    {{/each}}
    </ul>
{{/if}}
{{/each}}
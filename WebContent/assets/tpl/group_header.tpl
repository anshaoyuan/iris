<h2>
    {{groupName}} <small>群主：{{ownerName}}</small>
    {{if currentId === ownerId}}
    <button type="button" id="editBtn" class="btn btn-inverse pull-right">
        <i class="fa fa-edit fa-fw"></i>
        编辑群组
    </button>
    {{/if}}
</h2>

<ul id="groupNavUl" class="nav nav-tabs">
    <li id="groupDetailNavLi" class="active"><a href="#grpInf" data-toggle="tab">详情</a></li>
    {{if isMember === 1}}
    <li><a href="#grpMsg" data-toggle="tab">消息</a></li>
    <li><a href="#grpMem" data-toggle="tab">成员</a></li>
    {{/if}}
</ul>
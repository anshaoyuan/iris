{{each streamList as stream}}
<li class="media item">
<a class="pull-left" href="{{baseUrl}}/user/toUserDetail/{{stream.createBy}}">
    <img class="media-object" width="75" height="75" src="{{baseUrl}}/{{stream.userImgUrl}}" alt="{{stream.createByName}}" />
    {{stream.createByName}}
</a>
<div class="pull-left" style="margin: 80px 0 0 13px; width: 30px; position: absolute;">
{{if stream.annexation === 'A'}}
	<img src="{{baseUrl}}/assets/img/attachment.png" width="20" height="20" title="附件" />
{{else if stream.annexation === 'B'}}
	<img src="{{baseUrl}}/assets/img/date.png" width="20" height="20" title="约会"/>
{{else if stream.annexation === 'C'}}
	<img src="{{baseUrl}}/assets/img/vote.png" width="20" height="20" title="投票"/>
{{else if stream.annexation === 'AB' || stream.annexation === 'BA'}}
	<img src="{{baseUrl}}/assets/img/attachment.png" width="20" height="20" title="附件" />
	<img src="{{baseUrl}}/assets/img/date.png" width="20" height="20" title="约会"/>
{{else if stream.annexation === 'AC' || stream.annexation === 'CA'}}
	<img src="{{baseUrl}}/assets/img/attachment.png" width="20" height="20" title="附件" />
	<img src="{{baseUrl}}/assets/img/vote.png" width="20" height="20" title="投票"/>
{{/if}}
{{if stream.parentId !== null && stream.parentId !== ''}}
	<img src="{{baseUrl}}/assets/img/transport.png" width="20" height="20" title="转发"/>
{{/if}}
</div>
<div class="media-body">
    <h4 class="media-heading">
    <a href="{{baseUrl}}/mobile/stream/detail/{{stream.id}}">{{stream.streamTitle}}</a></h4>
	<span class="pull-right"></span>
    <p class="date">
        <small>发表于：{{stream.createDate}}</small>
    </p>
<p>
	{{stream.streamText}}
</p>

<div class="read-more">
    <a href="{{baseUrl}}/mobile/stream/detail/{{stream.id}}" class="pull-right">进入全文<i class="fa fa-angle-double-right fa-fw"></i></a>
</div>
</div>

<div class="media-footer">
    <hr/>
    <ul class="inline pull-left">
        <li>
            <a href="javascript:void(0);" class="stream_praise" data-streamid="{{stream.id}}" title={{stream.praisePeople}}>
                <i class="fa fa-thumbs-o-up fa-fw"></i>
                赞 <small>{{stream.praiseCount}}</small>
            </a>
        </li>
        <li class="divider"><i class="fa fa-ellipsis-v fa-fw"></i></li>
        <li>
            <a href="{{baseUrl}}/mobile/stream/detail/{{stream.id}}" class="stream_comment" data-streamid="{{stream.id}}">
                <i class="fa fa-comments-o fa-fw"></i>
                	评论 <small class="stream_comment_count_{{stream.id}}">{{stream.commentCount}}</small>
            </a>
        </li>
        <li class="divider"><i class="fa fa-ellipsis-v fa-fw"></i></li>
        <li>
            <a href="{{baseUrl}}/mobile/stream/totransmit/{{stream.id}}" class="stream_share" data-streamid="{{stream.id}}">
                <i class="fa fa-retweet fa-fw"></i>
                分享 <small>{{stream.transpondCount}}</small>
            </a>
        </li>
    </ul>
</div>
<hr />
<div id="commentList_{{type}}_{{stream.id}}"></div>
</li>
{{/each}}

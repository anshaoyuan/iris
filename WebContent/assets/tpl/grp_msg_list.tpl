{{if list.length === 0}}
<div class="well well-small text-center">目前还没有任何消息</div>
{{else}}
<ul class="media-list messages">
    {{each list as val idx}}
    <li class="media item">
        <a class="pull-left" href="{{sysPath}}/user/toUserDetail/{{val.createBy}}" data-user-id="{{val.createBy}}">
            <img class="media-object" src="{{sysPath}}/{{val.userImgUrl}}"/>
            {{val.createByName}}
        </a>

        <div class="media-body">
            <h4 class="media-heading">
                <a href="{{sysPath}}/mobile/stream/detail/{{val.id}}" data-stream-id="{{val.id}}" target="_blank">{{val.streamTitle}}</a>
                {{if val.isAdmin !== 0}}
                <span class="label label-important pull-right">置顶</span>
                {{/if}}
            </h4>

            <p>
                <small class="date">发表于：{{val.createDate}}</small>
            </p>
            <p>
            	{{val.streamText}}
            </p>
            <div class="read-more">
             	<a href="{{sysPath}}/mobile/stream/detail/{{val.id}}" class="pull-right">进入全文<i class="fa fa-angle-double-right fa-fw"></i></a>
            </div>
		</div>
		 <div class="media-footer">
		 <hr/>
            <ul class="inline pull-left streamDeawithlLinkGroup">
                <li>
                	<a class="streamDeawithlLink" href="javascript:void(0)" data-type="praise" data-streamid="{{val.id}}">
                		 <i class="fa fa-thumbs-o-up fa-fw"></i>
                		  赞
                		<small>{{val.praiseCount}}</small>
                	</a>
                </li>
                <li class="divider">
                 	<i class="fa fa-ellipsis-v fa-fw"></i>
                </li>
                <li>
                	<a class="" href="{{sysPath}}/mobile/stream/detail/{{val.id}}" data-type="comment">
                	<i class="fa fa-comments-o fa-fw"></i>
                	评论
                    <small class="stream_comment_count_{{val.id}}">{{val.commentCount}}</small>
                    </a>
                 </li>
                <li class="divider">
                	<i class="fa fa-ellipsis-v fa-fw"></i>
                </li>
                <li>
                	<a class="streamDeawithlLink" href="{{sysPath}}/mobile/stream/totransmit/{{val.id}}" data-type="" data-streamid="{{val.id}}>
                	<i class="fa fa-retweet fa-fw"></i>
                                                      分享
                    <small>{{val.transpondCount}}</small>
                   </a>
                 </li>
            </ul>
        </div>
    </li>
    <hr/>
    {{/each}}
</ul>
{{/if}}
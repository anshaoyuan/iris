{{each commentList as comment}}
<div class="media comments first">
	{{echo comment.parentCommentStr}}
    <div class="media-body-wrapper">
        <a class="pull-left" href="#">
            <img class="media-object" src="{{baseUrl}}/{{comment.userImgUrl}}" alt="{{comment.createByName}}">
           {{comment.createByName}}
        </a>

        <div class="media-body1">
            <div class="media-meta">
                <div class="date pull-left"><small>{{comment.createDate}}</small></div>
                <div class="floor pull-right"><small>#{{comment.floor}}</small></div>
            </div>
            {{echo comment.content}}
        </div>

        <div class="media-footer">
            <ul class="inline pull-right">
                <li><a href="javascript:void(0);" data-commentid={{comment.id}} class="btn btn-link btn-small comment-praise"><i class="fa fa-thumbs-o-up fa-fw"></i>赞 <small>{{comment.praiseCount}}</small></a></li>
                <li><a href="javascript:void(0);" data-commentid={{comment.id}} data-streamid={{streamId}} class="btn btn-link btn-small comment-comment"><i class="fa fa-comments-o fa-fw"></i>评论 </a></li>
            </ul>
        </div>
        <div class="addCommentDivInput"></div>
    </div>
</div>
{{/each}}
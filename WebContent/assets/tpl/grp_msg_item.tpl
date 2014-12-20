<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal">&times;</button>
    <h4>{{streamTitle}}</h4>

    <div>
        <small class="muted">
            发表：
            <a href="../../../user/toUserDetail/{{createBy}}">{{createByName}}</a>
            /
            日期：
            {{createDate}}
        </small>
    </div>
</div>
<div class="modal-body">
    {{==streamContent}}

    <h4 class="page-header">评论：</h4>

    <form id="commentForm" class="hide">
        <div class="control-group">
            <label for="commentContent" class="control-label">发表评论：</label>

            <div class="controls">
                <textarea id="commentContent" name="content" rows="5" class="input-block-level"></textarea>
                <input name="commentType" type="hidden" value="1"/>
                <button type="submit" class="btn btn-success span2 pull-right">
                    <i class="icon-pencil icon-white"></i>
                    发表
                </button>
            </div>
        </div>
    </form>
</div>
<div class="modal-footer">
    <button class="btn btn-praise" data-type="praise" data-refid="{{id}}" data-reftype="1">
        <i class="icon-thumbs-up"></i>
        好评
        <span class="label">{{praiseCount}}</span>
    </button>
    <button class="btn" data-type="comment">
        <i class="icon-comment"></i>
        评论
        <span class="label">{{commentCount}}</span>
    </button>
    <button class="btn" data-type="forward">
        <i class="icon-share-alt"></i>
        转发
        <span class="label">{{transpondCount}}</span>
    </button>
</div>
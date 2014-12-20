{{each imageList as comment index}}
    <li data-comment-id="{{comment.id}}">
        <h3 data-user-id="{{comment.userId}}">{{comment.userName}}</h3>

        <p>{{comment.commentContent}}</p>

        <p class="ui-li-aside"><strong>{{comment.createDate}}</strong></p>
    </li>
{{/each}}
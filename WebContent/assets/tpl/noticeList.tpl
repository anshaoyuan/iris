{{each noticeList as n}}
<li class="media item">
<div class="media-body">
    <h4 class="media-heading">
    <a href="{{baseUrl}}/mobile/stream/detail/{{n.id}}">{{n.noticeTitle}}</a></h4>
	<span class="pull-right"></span>
    <p class="date">
        <small>{{n.createDate}}</small>
    </p>
<p>
	{{n.noticeContent}}
</p>
</div>
</li>
{{/each}}

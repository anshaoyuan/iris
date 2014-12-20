{{if folders.length === 0}}
<li>暂时还没有相册哦！</li>
{{else}}
{{each folders}}
<li><a href="#photoList" data-id="{{$value.id}}">{{$value.folderName}}</a></li>
{{/each}}
{{/if}}
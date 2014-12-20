{{if type === 'own'}}
    {{if userFolder.length === 0}}
        <li>暂时还没有文件夹哦！</li>
    {{else}}
        {{each userFolder}}
            <li><a href="#docList" data-id="{{$value.id}}">{{$value.folderName}}</a></li>
        {{/each}}
    {{/if}}
{{else}}
    {{if adminFoler.length === 0}}
        <li>暂时还没有文件夹哦！</li>
    {{else}}
        {{each adminFoler}}
            <li><a href="#docList" data-id="{{$value.id}}">{{$value.folderName}}</a></li>
        {{/each}}
    {{/if}}
{{/if}}
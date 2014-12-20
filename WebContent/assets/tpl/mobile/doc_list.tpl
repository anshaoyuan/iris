{{each docList}}
    <li data-id={{$value.id}}>
        <a href="{{baseUrl}}/mobile/document/toPreviewPage/{{$value.id}}" target="_blank">{{$value.resourceName}}</a>
        <small>{{$value.createDate}}</small>
    </li>
{{/each}}
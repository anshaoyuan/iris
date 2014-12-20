{{each menu}}
<li><a href="{{$value.uri}}">{{$value.name}}</a></li>
{{if $index !== menu.length - 1}}
<li class="divider-vertical"></li>
{{/if}}
{{/each}}
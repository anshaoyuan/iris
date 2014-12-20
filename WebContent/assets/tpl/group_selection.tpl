{{each groups}}
    {{if $index === 0 }}
    <option value="0"></option>
    {{else}}
    <option value="{{$value.id}}">{{$value.name}}</option>
    {{/if}}
{{/each}}
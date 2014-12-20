<div id="treeWrapper">
    {{if firstLevel}}
        {{each firstLevel}}
            <div data-role="collapsible" data-theme="a" data-content-theme="a">
                <h2>{{$value.teamName}}</h2>
                <ul data-role="listview">
                    {{each children as value index}}
                    {{if value.parentId === $value.id}}
                        <li>
                            <a href="#grpList" data-id="{{value.id}}">{{value.teamName}}</a>
                        </li>
                    {{/if}}
                    {{/each}}
                </ul>
            </div>
        {{/each}}
    {{/if}}

    {{if firstEmptyLevel}}
        {{each firstEmptyLevel}}
            <div data-role="collapsible" data-theme="a" data-content-theme="a">
                <h2>{{$value.teamName}}</h2>
                <ul data-role="listview">
                    <li>当前分类下暂时没有群组</li>
                </ul>
            </div>
        {{/each}}
    {{/if}}

    {{if firstLevelGroup}}
        <ul data-role="listview" data-inset="true" data-theme="a" class="ui-icon-alt">
            {{each firstLevelGroup}}
                <li>
                    <a href="#grpList" data-id="{{$value.id}}">{{$value.teamName}}</a>
                </li>
            {{/each}}
        </ul>
    {{/if}}
</div>
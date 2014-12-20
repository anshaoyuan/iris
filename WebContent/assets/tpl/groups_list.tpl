<button data-target="#newGroupModal" data-toggle="modal"
	class="btn btn-primary btn-large btn-block">
	<i class="fa fa-plus fa-fw"></i> 创建我的同学圈
</button>
{{each firstLevel}}
<div class="accordion-group">
    <div class="accordion-heading">
        <a data-id="{{$value.id}}" data-toggle="collapse" class="accordion-toggle first-level {{if $index !== 0}}collapsed{{/if}}" href="#parent{{$value.id}}">
            <i class="icon-{{if $index !== 0}}plus{{else}}minus{{/if}}"></i> {{$value.teamName}}
        </a>
    </div>
    <div id="parent{{$value.id}}" class="accordion-body collapse {{if $index === 0}}in{{/if}}">
        <div class="accordion-inner">
            <ul class="nav nav-pills nav-stacked">
                {{each children as value index}}
                {{if value.parentId === $value.id}}
                <li><a data-id="{{value.id}}" class="is-group" href="#"><i class="icon-chevron-right"></i> {{value.teamName}}</a></li>
                {{/if}}
                {{/each}}
            </ul>
        </div>
    </div>
</div>
{{/each}}

{{each firstEmptyLevel}}
<div class="accordion-group">
    <div class="accordion-heading">
        <a data-id="{{$value.id}}" data-toggle="collapse" class="accordion-toggle first-level {{if $index !== 0}}collapsed{{/if}}" href="#parent{{$value.id}}">
            <i class="icon-{{if $index !== 0}}plus{{else}}minus{{/if}}"></i> {{$value.teamName}}
        </a>
    </div>
    <div id="parent{{$value.id}}" class="accordion-body collapse {{if $index === 0}}in{{/if}}">
        <div class="accordion-inner">
            <ul class="nav nav-pills nav-stacked">
                <li>当前分类下暂时没有群组</li>
            </ul>
        </div>
    </div>
</div>
{{/each}}

{{each firstLevelGroup}}
<div class="accordion-group">
    <div class="accordion-heading">
        <a data-id="{{$value.id}}" class="accordion-toggle is-group" href="#">
            <i class="icon-chevron-right"></i> {{$value.teamName}}
        </a>
    </div>
</div>
{{/each}}



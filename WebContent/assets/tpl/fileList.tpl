{{each fileList as f}}
<div class="item text-center" id="file_{{f.id}}">
    <div class="cover">
        <a class="inner" href="{{baseUrl}}/{{f.resourceUri}}" data-fileid={{f.id}} title="{{f.resourceName}}"><i class="fa fa-file-text-o fa-5x"></i><br/>{{f.shortName}}</a>
    </div>
    <div class="action">
        {{if isCurrUser === '1'}}
        	<a class="btn btn-link btn-small delFile" href="javascript:void(0);" data-fileid={{f.id}}><i class="fa fa-times fa-fw"></i> 删除</a>
        {{/if}}
    </div>
</div>
{{/each}}
{{if isNull}}
<div class="item text-center">
暂无文件
</div>
{{/if}}
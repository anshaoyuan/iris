{{each fileList as f}}
<div class="item text-center" id="file_{{f.id}}" style="width: 100px;">
    <div class="cover">
        <a class="inner" href="{{baseUrl}}/{{f.resourceUri}}"><i class="fa fa-file-text-o fa-5x"></i><br/>{{f.resourceName}}</a>
    </div>
    <div class="action">
    <small>
        <a href="{{baseUrl}}/mobile/document/toPreviewPage/{{f.id}}" target="_blank"><i class="fa fa-eye fa-fw"></i> 预览</a>
        {{if isAdmin === '0'}}
        	<a class="delFile" href="javascript:void(0);" data-fileid={{f.id}}><i class="fa fa-times fa-fw"></i> 删除</a>
        {{/if}}
        </small>
    </div>
</div>
{{/each}}
{{if isNull}}
<div class="item text-center">
暂无文件
</div>
{{/if}}
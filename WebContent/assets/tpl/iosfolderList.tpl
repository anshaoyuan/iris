{{each userFolder as d}}
{{if isAdmin }}
<div class="item text-center" id="folder_{{d.id}}">
	    <div class="cover">
	        <!--这个链接进入文件夹-->
	        <a href="{{baseUrl}}/mobile/document/toIosFileList/{{d.id}}" class="inner"><i class="fa fa-folder-open fa-5x"></i><br/>{{d.folderName}}</a>
	    </div>
	</div>
{{else if d.isDefault !== '1'}}
	<div class="item text-center" id="folder_{{d.id}}">
	    <div class="cover">
	        <!--这个链接进入文件夹-->
	        <a href="{{baseUrl}}/mobile/document/toIosFileList/{{d.id}}" class="inner"><i class="fa fa-folder-open fa-5x"></i><br/>{{d.folderName}}</a>
	    </div>
	    <div class="action">
		    <small>
		        <a class="modifyFolder" data-folerid={{d.id}} href="javascript:void(0);" ><i class="fa fa-pencil fa-fw"></i> 改名</a>
		        <a class="delFolder" data-folerid={{d.id}} href="javascript:void(0);"><i class="fa fa-times fa-fw"></i> 删除</a>
	        </small>
	    </div>
	</div>
{{/if}}
{{/each}}

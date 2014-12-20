{{each userFolder as d}}
{{if isAdmin }}
<div class="item text-center" id="folder_{{d.id}}">
	    <div class="cover">
	        <!--这个链接进入文件夹-->
	        <a href="{{baseUrl}}/console/document/toFileList/{{d.id}}" class="inner"><i class="fa fa-folder-open fa-5x"></i><br/>{{d.folderName}}</a>
	    </div>
	    <div class="action">
	        <a class="btn btn-link modifyFolder" data-folerid={{d.id}} href="javascript:void(0);" ><i class="fa fa-pencil fa-fw"></i> 改名</a>
	    </div>
	</div>
{{/if}}
{{/each}}

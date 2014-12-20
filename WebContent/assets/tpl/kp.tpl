
		
		<ul class="nav nav-pills">
		{{each wholePathList as p index}}
		  <li>
		    <a href="javascript:void(0);" class="t_index isfolder" data-wholePath="{{p.wholeCurrentPath}}">{{p.path}}</a>
		  </li>
		  {{/each}}
		</ul>
        <table class="table file-list">
          <thead>
          <tr>
            <th scope="col">&nbsp;</th>
            <th scope="col">文件名</th>
            <th scope="col">大小</th>
            <th scope="col">操作</th>
            <th scope="col">修改日期</th>
          </tr>
          </thead>
          <tbody>
          {{if dataFlag==1}}
          {{each metaList as m index}}
          <tr>
            <td class="file-check" scope="row">&nbsp;</td>
            {{if m.fileType == 'folder'}}
	            <td class="file-name type-folder"><a href="javascript:void(0);" class="t_folder isfolder" data-parentPath="{{m.parentPath}}" data-wholeCurrentPath="{{m.wholeCurrentPath}}">{{m.fileName}}</a></td>
	            <td class="file-size"></td>
	            <td class="file-size"></td>
            {{else}}
            	<td class="file-name type-file">
            	<a href="javascript:void(0);" hname='{{m.fileName}}' class="t_file"
					rel="popover" data-placement="right"
					data-parentPath="{{m.parentPath}}"
					data-wholeCurrentPath="{{m.wholeCurrentPath}}">{{m.fileName}}
					</a>
            	</td>
	            <td class="file-size">{{m.fileSize}} kb</td>
	            <td class="file-size" data-fileName="{{m.fileName}}" data-wholeCurrentPath="{{m.wholeCurrentPath}}">
	            	<div class="btn-group">
	                <button class="btn btn-primary btn-mini">操作</button>
	                <button class="btn btn-primary btn-mini dropdown-toggle loadingkpMenu" data-toggle="dropdown"><span class="caret"></span></button>
	                <ul class="dropdown-menu">
	                  <li><img width="15" height="15" src="{{baseUrl}}/assets/img/mobile/loading.gif">获取数据中.....</li>
	                </ul>
	              </div>
	            </td>
            {{/if}}
            <td class="file-date">{{m.modifyTime}}</td>
          </tr>
          {{/each}}
          {{else}}
          <td class="file-check" scope="row">&nbsp;</td>
				<td colspan="3">没有数据..</td>
			{{/if}}
          </tbody>
        </table>

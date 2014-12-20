<form id="formEditTeam" class="form-horizontal" action="#">
    <div class="control-group">
        <label class="control-label" for="teamName">群组名称：</label>

        <div class="controls">
            <input type="text" name="teamName" id="teamName" value="{{groupName}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="parentId">所属分类：</label>

        <div class="controls">
            <select name="parentId" id="parentId" data-placeholder="请选择群组成员">
                {{if parentId === 0}}
                <option value="0">没有分类（顶级群组）</option>
                {{/if}}
                {{each parents}}
                <option value="{{$value.id}}" {{if parentId === $value.id}}selected{{/if}}>
                    {{$value.teamName}}{{if parentId === $value.id}}（当前分类）{{/if}}
                </option>
                {{/each}}
            </select>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="memberIds">选择成员：</label>

        <div class="controls">
            <select id="memberIds" name="userList" class="span3" multiple>
                {{each users}}
                    <option value="{{$value.id}}"
                        {{each members as val idx}}
                        {{if val.id === $value.id}}selected{{/if}}
                        {{/each}}
                        >{{$value.name}}</option>
                {{/each}}
            </select>
        </div>
    </div>

    <hr/>

    <div class="control-group">
        <label class="control-label" for="isJoinable">允许自由加入群组？</label>

        <div class="controls">
            <label class="radio">
                <input type="radio" name="isOpen" id="isJoinable" value="1" {{if options.isJoinable ===1}}checked{{/if}}>
                是，所有人都可以加入本群组
            </label>
            <label class="radio">
                <input type="radio" name="isOpen" id="unJoinable" value="0" {{if options.isJoinable ===0}}checked{{/if}}>
                不，只有我自己可以添加成员
            </label>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="isWritable">允许给群组发消息？</label>

        <div class="controls">
            <label class="radio">
                <input type="radio" name="isWrite" id="isWritable" value="1" {{if options.isWritable ===1}}checked{{/if}}>
                是，所有人都可以给群组发消息
            </label>
            <label class="radio">
                <input type="radio" name="isWrite" id="unWritable" value="0" {{if options.isWritable ===0}}checked{{/if}}>
                不，只有群组成员才可以发消息
            </label>
        </div>
    </div>

    <div class="page-header">
        <h5 class="text-info text-center">学员俱乐部名单：</h5>
    </div>

    <div class="control-group">
        <label class="control-label" for="chairman">主任：</label>

        <div class="controls">
            <input type="text" name="roles[chairman]" id="chairman" value="{{if roles.chairman}}{{roles.chairman}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="literaly">文体协会会长：</label>

        <div class="controls">
            <input type="text" name="roles[literaly]" id="literaly" value="{{if roles.literaly}}{{roles.literaly}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="calligraphy">书画协会会长：</label>

        <div class="controls">
            <input type="text" name="roles[calligraphy]" id="calligraphy" value="{{if roles.calligraphy}}{{roles.calligraphy}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="communication">通讯协会会长：</label>

        <div class="controls">
            <input type="text" name="roles[communication]" id="communication" value="{{if roles.communication}}{{roles.communication}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="literaly1">文体协会理事：</label>

        <div class="controls">
            <input type="text" name="roles[literaly1]" id="literaly1" value="{{if roles.literaly1}}{{roles.literaly1}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="sports">体育协会理事：</label>

        <div class="controls">
            <input type="text" name="roles[sports]" id="sports" value="{{if roles.sports}}{{roles.sports}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="calligraphy1">书画协会理事：</label>

        <div class="controls">
            <input type="text" name="roles[calligraphy1]" id="calligraphy1" value="{{if roles.calligraphy1}}{{roles.calligraphy1}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="communication1">通讯协会理事：</label>

        <div class="controls">
            <input type="text" name="roles[communication1]" id="communication1" value="{{if roles.communication1}}{{roles.communication1}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="page-header">
        <h5 class="text-info text-center">党支部委员会：</h5>
    </div>

    <div class="control-group">
        <label class="control-label" for="secretary">书记：</label>

        <div class="controls">
            <input type="text" name="roles[secretary]" id="secretary" value="{{if roles.secretary}}{{roles.secretary}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="deputy">副书记：</label>

        <div class="controls">
            <input type="text" name="roles[deputy]" id="deputy" value="{{if roles.deputy}}{{roles.deputy}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="liaison">中组部联络员：</label>

        <div class="controls">
            <input type="text" name="roles[liaison]" id="liaison" value="{{if roles.liaison}}{{roles.liaison}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="studies">学习委员：</label>

        <div class="controls">
            <input type="text" name="roles[studies]" id="studies" value="{{if roles.studies}}{{roles.studies}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="recreation">文体委员：</label>

        <div class="controls">
            <input type="text" name="roles[recreation]" id="recreation" value="{{if roles.recreation}}{{roles.recreation}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="livelihood">生活委员：</label>

        <div class="controls">
            <input type="text" name="roles[livelihood]" id="livelihood" value="{{if roles.livelihood}}{{roles.livelihood}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="studies1">学习委员助理：</label>

        <div class="controls">
            <input type="text" name="roles[studies1]" id="studies1" value="{{if roles.studies1}}{{roles.studies1}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="studies2">学习委员助理：</label>

        <div class="controls">
            <input type="text" name="roles[studies2]" id="studies2" value="{{if roles.studies2}}{{roles.studies2}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="recreation1">文体委员助理：</label>

        <div class="controls">
            <input type="text" name="roles[recreation1]" id="recreation1" value="{{if roles.recreation1}}{{roles.recreation1}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="recreation2">文体委员助理：</label>

        <div class="controls">
            <input type="text" name="roles[recreation2]" id="recreation2" value="{{if roles.recreation2}}{{roles.recreation2}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="livelihood1">生活委员助理：</label>

        <div class="controls">
            <input type="text" name="roles[livelihood1]" id="livelihood1" value="{{if roles.livelihood1}}{{roles.livelihood1}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="livelihood2">生活委员助理：</label>

        <div class="controls">
            <input type="text" name="roles[livelihood2]" id="livelihood2" value="{{if roles.livelihood2}}{{roles.livelihood2}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="safety">安全员：</label>

        <div class="controls">
            <input type="text" name="roles[safety]" id="safety" value="{{if roles.safety}}{{roles.safety}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="leader1">一组组长：</label>

        <div class="controls">
            <input type="text" name="roles[leader1]" id="leader1" value="{{if roles.leader1}}{{roles.leader1}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="leader1_">一组副组长：</label>

        <div class="controls">
            <input type="text" name="roles[leader1_]" id="leader1_" value="{{if roles.leader1_}}{{roles.leader1_}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="leader2">二组组长：</label>

        <div class="controls">
            <input type="text" name="roles[leader2]" id="leader2" value="{{if roles.leader2}}{{roles.leader2}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="leader2_">二组副组长：</label>

        <div class="controls">
            <input type="text" name="roles[leader2_]" id="leader2_" value="{{if roles.leader2_}}{{roles.leader2_}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="leader3">三组组长：</label>

        <div class="controls">
            <input type="text" name="roles[leader3]" id="leader3" value="{{if roles.leader3}}{{roles.leader3}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="leader3_">三组副组长：</label>

        <div class="controls">
            <input type="text" name="roles[leader3_]" id="leader3_" value="{{if roles.leader3_}}{{roles.leader3_}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="leader4">四组组长：</label>

        <div class="controls">
            <input type="text" name="roles[leader4]" id="leader4" value="{{if roles.leader4}}{{roles.leader4}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <label class="control-label" for="leader4_">四组副组长：</label>

        <div class="controls">
            <input type="text" name="roles[leader4_]" id="leader4_" value="{{if roles.leader4_}}{{roles.leader4_}}{{else}}无{{/if}}"/>
        </div>
    </div>

    <div class="control-group">
        <div class="well well-large">
            <button id="submitEdit" type="submit" class="btn btn-success btn-large btn-block">提交修改</button>
            <button id="cancelEdit" type="button" class="btn btn-large btn-block">取消修改</button>
            <hr/>
            <button id="dismissTeam" type="button" data-teamid="{{id}}" class="btn btn-danger btn-large btn-block">解散群组</button>
        </div>
    </div>

</form>
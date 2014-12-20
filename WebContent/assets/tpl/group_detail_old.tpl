<dl class="dl-horizontal">
    <dt>群组所属分类：</dt>
    {{if parentName}}
    <dd>{{parentName}}</dd>
    {{else}}
    <dd>该群组暂无分类</dd>
    {{/if}}
    <dt>群组创建时间：</dt>
    <dd>{{createdAt}}</dd>

    <hr/>

    <dt>我是群组的成员吗？</dt>
    <dd>
        {{if isMember === 0}}
            您还不是群组的成员，
            {{if options.isJoinable === 0}}
            并且该群组 <strong>不允许</strong> 新成员加入
            {{else}}
            您可以 <button id="joinTeam" class="btn btn-small btn-success" data-userid="{{currentId}}" data-teamid="{{groupId}}">加入</button> 该群组
            {{/if}}
        {{else}}
            {{if currentId !== ownerId}}
            您已经是群组的成员， 您可以 <button id="quitTeam" class="btn btn-small btn-warning" data-userid="{{currentId}}" data-teamid="{{groupId}}">退出</button> 该群组
            {{else}}
            您是群组的管理员，可以将本群组 <button id="transferTeam" class="btn btn-small btn-danger" data-userid="{{ownerId}}" data-teamId="{{groupId}}">移交</button> 给别人
            {{/if}}
        {{/if}}
    </dd>

    <div class="well hide">
        <form id="transferTeamForm">
            <div class="control-group">
                <label class="control-label" for="selectNewOwner">请选择将要移交的目标用户：</label>
                <div class="controls">
                    <select id="selectNewOwner" class="input-block-level" name="createId"></select>
                </div>
            </div>
            <div class="control-group text-right">
                <a class="btn" href="#">取消</a>
                <button class="btn btn-success" type="submit">提交</button>
            </div>
        </form>
    </div>

    <dt>能给群组发消息吗？</dt>
    <dd>
        {{if options.isWritable === 0}}
            <span class="text-warning"><strong>不可以</strong></span>
        {{else}}
            <span class="text-success"><strong>可以</strong></span>
        {{/if}}
    </dd>

    {{if isMember !== 0}}

    <div class="page-header">
        <h5 class="text-info text-center">学员俱乐部名单：</h5>
    </div>

    <dt>主任：</dt>
    <dd>{{if roles.chairman}}{{roles.chairman}}{{else}}无{{/if}}</dd>

    <dt>文体协会会长：</dt>
    <dd>{{if roles.literaly}}{{roles.literaly}}{{else}}无{{/if}}</dd>

    <dt>书画协会会长：</dt>
    <dd>{{if roles.calligraphy}}{{roles.calligraphy}}{{else}}无{{/if}}</dd>

    <dt>通讯协会会长：</dt>
    <dd>{{if roles.communication}}{{roles.communication}}{{else}}无{{/if}}</dd>

    <dt>文体协会理事：</dt>
    <dd>{{if roles.literaly1}}{{roles.literaly1}}{{else}}无{{/if}}</dd>

    <dt>体育协会理事：</dt>
    <dd>{{if roles.sports}}{{roles.sports}}{{else}}无{{/if}}</dd>

    <dt>书画协会理事：</dt>
    <dd>{{if roles.calligraphy1}}{{roles.calligraphy1}}{{else}}无{{/if}}</dd>

    <dt>通讯协会理事：</dt>
    <dd>{{if roles.communication1}}{{roles.communication1}}{{else}}无{{/if}}</dd>

    <div class="page-header">
        <h5 class="text-info text-center">党支部委员会：</h5>
    </div>

    <dt>书记：</dt>
    <dd>{{if roles.secretary}}{{roles.secretary}}{{else}}无{{/if}}</dd>

    <dt>副书记：</dt>
    <dd>{{if roles.deputy}}{{roles.deputy}}{{else}}无{{/if}}</dd>

    <dt>中组部联络员：</dt>
    <dd>{{if roles.liaison}}{{roles.liaison}}{{else}}无{{/if}}</dd>

    <dt>学习委员：</dt>
    <dd>{{if roles.studies}}{{roles.studies}}{{else}}无{{/if}}</dd>

    <dt>文体委员：</dt>
    <dd>{{if roles.recreation}}{{roles.recreation}}{{else}}无{{/if}}</dd>

    <dt>生活委员：</dt>
    <dd>{{if roles.livelihood}}{{roles.livelihood}}{{else}}无{{/if}}</dd>

    <dt>学习委员助理：</dt>
    <dd>{{if roles.studies1}}{{roles.studies1}}{{else}}无{{/if}}</dd>

    <dt>学习委员助理：</dt>
    <dd>{{if roles.studies2}}{{roles.studies2}}{{else}}无{{/if}}</dd>

    <dt>文体委员助理：</dt>
    <dd>{{if roles.recreation1}}{{roles.recreation1}}{{else}}无{{/if}}</dd>

    <dt>文体委员助理：</dt>
    <dd>{{if roles.recreation2}}{{roles.recreation2}}{{else}}无{{/if}}</dd>

    <dt>生活委员助理：</dt>
    <dd>{{if roles.livelihood1}}{{roles.livelihood1}}{{else}}无{{/if}}</dd>

    <dt>生活委员助理：</dt>
    <dd>{{if roles.livelihood2}}{{roles.livelihood2}}{{else}}无{{/if}}</dd>

    <dt>安全员：</dt>
    <dd>{{if roles.safety}}{{roles.safety}}{{else}}无{{/if}}</dd>

    <dt>一组组长：</dt>
    <dd>{{if roles.leader1}}{{roles.leader1}}{{else}}无{{/if}}</dd>

    <dt>一组副组长：</dt>
    <dd>{{if roles.leader1_}}{{roles.leader1_}}{{else}}无{{/if}}</dd>

    <dt>二组组长：</dt>
    <dd>{{if roles.leader2}}{{roles.leader2}}{{else}}无{{/if}}</dd>

    <dt>二组副组长：</dt>
    <dd>{{if roles.leader2_}}{{roles.leader2_}}{{else}}无{{/if}}</dd>

    <dt>三组组长：</dt>
    <dd>{{if roles.leader3}}{{roles.leader3}}{{else}}无{{/if}}</dd>

    <dt>三组副组长：</dt>
    <dd>{{if roles.leader3_}}{{roles.leader3_}}{{else}}无{{/if}}</dd>

    <dt>四组组长：</dt>
    <dd>{{if roles.leader4}}{{roles.leader4}}{{else}}无{{/if}}</dd>

    <dt>四组副组长：</dt>
    <dd>{{if roles.leader4_}}{{roles.leader4_}}{{else}}无{{/if}}</dd>

    {{/if}}
</dl>

<li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
        {{name}}
        <i class="caret"></i>
    </a>
    <ul class="dropdown-menu">
        {{if secretaryId !== null}}
        <li><a data-id="{{secretaryId}}" href="#"><i class="icon-star"></i> 切换领导身份</a></li>
        <li class="divider"></li>
        {{/if}}
        <li><a href="#"><i class="icon-user"></i> 个人资料</a></li>
        <li><a href="#"><i class="icon-cog"></i> 系统设置</a></li>
        <li><a href="{{sysPath}}/logoutCas"><i class="icon-off"></i> 退出登陆</a></li>
    </ul>
</li>
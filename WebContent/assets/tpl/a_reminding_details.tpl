<ul class="media-list">
    {{each reminding}}
    {{if $value.type === "birthday"}}
    <li id="reminding{{$index}}" class="media well" data-type="{{$value.type}}">
        <div class="media-body">
            <h5 class="media-heading">
                <i class="icon-user"></i> 生日提醒<small class="pull-right">10 分钟前</small>
            </h5>
            <p>距离 <a href="/admin/users/{{$value.event.id}}"> {{$value.event.name}} </a> 的生日（{{$value.event.date}}）还有 <strong class="text-warning">{{$value.remainingDays}}</strong> 天。</p>
        </div>
    </li>
    {{else if $value.type === "festival"}}
    <li id="reminding{{$index}}" class="media well" data-type="{{$value.type}}">
        <div class="media-body">
            <h5 class="media-heading">
                <i class="icon-calendar"></i> 节日提醒<small class="pull-right">10 分钟前</small>
            </h5>
            <p>今天是 <strong class="text-warning">{{$value.event.name}}</strong>，别忘了祝福大家元旦快乐。</p>
        </div>
    </li>
    {{else if $value.type === "service"}}
    <li id="reminding{{$index}}" class="media well" data-type="{{$value.type}}">
        <div class="media-body">
            <h5 class="media-heading">
                <i class="icon-bell"></i> 请求服务<small class="pull-right">10 分钟前</small>
            </h5>
            <p><a href="/admin/users/{{$value.event.id}}">{{$value.event.name}}</a> 请求管理员的帮助，请及时和他取得联系。</p>
        </div>
    </li>
    {{/if}}
    {{/each}}
</ul>

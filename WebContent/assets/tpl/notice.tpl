<li id="topCarousel" class="carousel slide media alert">
    <ol class="carousel-indicators">
        {{each data as val idx}}
            <li data-target="#topCarousel" data-slide-to="{{idx}}"{{if idx === 0}} class="active"{{/if}}></li>
        {{/each}}
    </ol>

    <div class="carousel-inner noticeDetail">
        {{each data as val idx}}
            <div class="{{if idx === 0}}active {{/if}}item">
                <div class="pull-left">
                <span class="label label-important">
                    {{if val.birthday === undefined}}
                        公告
                    {{else}}
                        生日
                    {{/if}}
                </span>
                </div>

                <div class="media-body">
                    {{if val.birthday === undefined}}
                    <h4 class="media-heading">{{val.noticeTitle}}</h4>
                    <p>{{val.noticeContent}}</p>
                    <p class="date pull-right"><small>{{val.createDate}}</small></p>
                    {{else}}
                    <h4 class="media-heading">祝贺 {{val.userName}} 同学在本月过生日！</h4>
                    <p class="date pull-right"><small>2013年12月</small></p>
                    {{/if}}
                </div>
            </div>
        {{/each}}
    </div>
</li>
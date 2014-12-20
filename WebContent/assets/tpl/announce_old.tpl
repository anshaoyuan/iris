<div id="announceCarousel" class="carousel slide">
    <ol class="carousel-indicators">
        {{each list as val idx}}
        <li data-target="#announceCarousel" data-slide-to="{{idx}}"
            {{if idx === 0}}class="active"{{/if}}></li>
        {{/each}}
    </ol>
    <div class="carousel-inner">
        {{each list as val idx}}
        <div class="{{if idx === 0}}active {{/if}}item">
            <h5>{{val.noticeTitle}}</h5>

            <p>{{val.noticeContent}}</p>
            <small class="muted">{{val.createDate.split(' ')[0]}}</small>
        </div>
        {{/each}}
    </div>
</div>
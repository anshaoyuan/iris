<div id="weatherCarousel" class="carousel slide">
    <ol class="carousel-indicators">
        {{each list.dayList}}
        <li data-target="#weatherCarousel" data-slide-to="{{$index}}"
            {{if $index === 0}}class="active"{{/if}}></li>
        {{/each}}
    </ol>
    <div class="carousel-inner">
        {{each list.dayList as val idx}}
        <div class="{{if idx === 0}}active {{/if}}item">
            <div class="text-center">
                <img class="image" alt="{{val.weather}}" style="margin: auto"
                     src="{{path}}/{{val.img1}}"/>

                <p class="text-center type">{{val.weather}}</p>
            </div>
            <div>
                <p><small class="muted">{{val.date}}</small></p>

                <p><strong class="city">{{list.city}}</strong> <span class="wind">{{val.wind}}</span></p>

                <p><strong class="temp">{{val.temp}}</strong></p>
            </div>
        </div>
        {{/each}}
    </div>
</div>
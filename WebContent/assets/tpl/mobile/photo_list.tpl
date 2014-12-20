{{each imageList as image}}
<li>
    <a href="#photoView" data-path="{{urlPrefix}}{{image.mobileUri}}" data-imageid="{{image.id}}" data-transition="flip">
        <img src="{{urlPrefix}}{{image.minUri}}" alt="{{image.name}} / {{image.dateFmt}}"/>
    </a>
</li>
{{/each}}
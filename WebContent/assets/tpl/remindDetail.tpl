{{each remindList as remind}}  
  <div class="article-body stream-body stream-expand">
	<div class="old-stream-lxj" style="position:relative;">
	    <a href="{{baseUrl}}{{remind.linkHtml}}" data-id="{{remind.id}}">{{remind.sendName}} 于 {{remind.sendTime}} {{remind.description}}</a>
			</div>	    
	    <div class="vote-container"></div>
	    <div class="schedule-container"></div>	    
	  <blockquote class="forward">
	  
	    <div class="original-vote-container"></div>
	    <div class="original-schedule-container"></div>
	    
	  </blockquote>
	  
	</div>
{{/each}}
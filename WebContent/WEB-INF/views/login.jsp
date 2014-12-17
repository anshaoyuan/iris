<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"> 
        <title>iris</title>
        <meta name="generator" content="Bootply" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">
        
        <!--[if lt IE 9]>
          <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->

        <!-- CSS code from Bootply.com editor -->
        
        <style type="text/css">
            .modal-footer {   border-top: 0px; }
        </style>
    </head>
    
    <!-- HTML code from Bootply.com editor -->
    
    <body  >
        
        <!--login modal-->
<div id="loginModal" class="modal show" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
  <div class="modal-content">
      <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
          <h1 class="text-center">Login</h1>
      </div>
      <div class="modal-body">
          <div class="form col-md-12 center-block" onsubmit=" reutrn false">
            <div class="form-group">
              <input type="text" name="username" class="form-control input-lg" placeholder="Email">
            </div>
            <div class="form-group">
              <input type="password" name="password" class="form-control input-lg" placeholder="Password">
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-lg btn-block">Sign In</button>
              <span class="pull-right"><a href="#">Register</a></span><span><a href="#">Need help?</a></span>
            </div>
          </div>
      </div>
      <div class="modal-footer">
          <div class="col-md-12">
          <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
		  </div>	
      </div>
  </div>
  </div>
</div>
        


        <!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

        
        <!-- JavaScript jQuery code from Bootply.com editor -->
        
        <script type='text/javascript'>
        
        $(document).ready(function() {
        	$(".btn-block").on("click",function(){
        		var username = $("input[name='username']").val();
        		var password = $("input[name='password']").val();
        		$.ajax({
        			url:"/iris/weblogin",
        			ContentType:'application/json',
        			data:{"username":username,"password":password},
        			dataType:"json",
        			type:"post",
        			success:function(data){
        				alert("success");
        			}
        		});
        	});
            
        
        });
        
        </script>
        
    </body>
</html>
angular.module('vsDirective').directive('jcropDirective',[function(){
    return {
        restrict : 'E',
        priority : 1000,
        template : '<table><tr><td><img class="jcrop-src"></td><td><div class="jcrop-preview-pane"><div class="jcrop-preview-container"><img class="jcrop-dist"></div></div></td></tr></table>',
        replace : true,
        scope : {
            src : '=',
            option : '='
        },
        link : function($scope,$element,attr){
            var boundx,boundy;
            var $preview = $element.find('img.jcrop-dist');
            var $img = $element.find('img.jcrop-src');

            var $previewContainer = $element.find('.jcrop-preview-pane .jcrop-preview-container');
            var xsize = $previewContainer.width();
            var ysize = $previewContainer.height();

            $scope.$watch('src',function(newVal,oldVal){
                if(newVal){
                    $img.attr('src',newVal);
                    $preview.attr('src',newVal);
                }
            });

            $img.on('load',function(){
	            var tempImg = new Image();
	            tempImg.src = $img.attr('src');
	            tempImg.onload = function () {
		            $img.width(tempImg.width);
		            $img.height(tempImg.height);

	                $img.next().remove();
	                $img.data('Jcrop',null);
	                $img.Jcrop({
	                    onSelect : updatePreview,
	                    onChange : updatePreview,
	                    aspectRatio : xsize / ysize
	                },function(){
	                    var bounds = this.getBounds();
	                    boundx = bounds[0];
	                    boundy = bounds[1];
	                });
	            }
            });

            function updatePreview(c){
                if(parseInt(c.w) > 0){
                    $scope.option.h = c.h;
                    $scope.option.w = c.w;
                    $scope.option.x = c.x;
                    $scope.option.x2 = c.x2;
                    $scope.option.y = c.y;
                    $scope.option.y2 = c.y2;
                    var rx = xsize / c.w;
                    var ry = ysize / c.h;

                    $preview.css({
                        width : Math.round(rx * boundx) + "px",
                        height : Math.round(ry * boundy) + "px",
                        marginLeft : "-" + Math.round(rx * c.x) + "px",
                        marginTop : "-" + Math.round(ry * c.y) + "px"
                    });

                };
            };
        }
    };
}]);
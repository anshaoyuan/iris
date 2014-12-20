{{if list.code === '10006'}}
<h4 class="text-center"> {{list.msg}} </h4>
{{else}}
<table class="table table-striped stock">
    <thead>
    <tr>
        <th>股票名称</th>
        <th>昨日收盘</th>
        <th>今日开盘</th>
        <th>当前价格</th>
    </tr>
    </thead>
    <tbody>
    {{each list.voList as val idx}}
    <tr id="stock{{idx + 1}}">
        <td>{{val.sharesName}}</td>
        <td>{{val.yestodayClosePrice}}</td>
        <td>{{val.todayOpenPrice}}</td>
        {{if val.currentPrice > val.todayOpenPrice}}
        <td class="text-success">{{val.currentPrice}}</td>
        {{else if val.currentPrice < val.todayOpenPrice}}
        <td class="text-error">{{val.currentPrice}}</td>
        {{else}}
        <td>{{val.currentPrice}}</td>
        {{/if}}
    </tr>
    {{/each}}
    </tbody>
</table>
{{/if}}
<div class="addStock">
    <button class="btn btn-block btn-add-stock">
        <i class="icon-plus"></i>
        添加股票
    </button>
    <form id="addStockForm" class="hide">
        <div class="control-group">
            <label class="control-label" for="sharesCodes">输入股票代码（用,分隔多个）：</label>
            <div class="controls">
                <input id="sharesCodes" type="text" name="sharesCodes" class="input-block-level" />
                <button type="submit" class="btn btn-success btn-confirm">
                    <i class="icon-ok icon-white"></i>
                    确定
                </button>
                <button type="button" class="btn btn-inverse btn-cancle">
                    <i class="icon-remove icon-white"></i>
                    取消
                </button>
            </div>
        </div>
    </form>
</div>

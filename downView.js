window.onload = function (){
    // 1.获取评论数据
    // 1-1.获取评论列表元素
    let reviewList = document.querySelectorAll('div#cm_cr-review_list > div');
    // 1-2.获取评论日期、评分、评论用户、评论内容元素
    let rDateList = document.querySelectorAll('span.a-size-base.a-color-secondary.review-date');
    let scoreList = document.querySelectorAll('i[data-hook] > span.a-icon-alt');
    let rUserList = document.querySelectorAll('span.a-profile-name');
    let rContentList = document.querySelectorAll('span.a-size-base.review-text.review-text-content > span');
    
    // 2.使用对象数组存储评论数据
    // 2-1.对象构造函数
    function reviewObj(rDate,score,rUser,rContent){  //
        this.rDate = rDate;
        this.score = score;
        this.rUser = rUser;
        this.rContent = rContent;    
    }
    // 2-2.创建对象数组
    let JSONData =[];
    // 2-3.对象数组添加对象
    for(var i = 0 ;i <reviewList.length-1;i++){
        //2-3-1.拼接评论日期
        rDateStr = rDateList[i+2].innerText+'';
        yearStr = rDateStr.slice(0,(rDateStr.indexOf('年')));
        monthStr = rDateStr.slice((rDateStr.indexOf('年'))+1,(rDateStr.indexOf('月')));
        dayStr = rDateStr.slice((rDateStr.indexOf('月'))+1,(rDateStr.indexOf('日')));
        rDateStr = yearStr+'-'+monthStr+'-'+dayStr;
        //2-3-2.截取评分
        scoreStr = scoreList[i+3].innerText+'';
        scoreStr = scoreStr.slice(0,3);
        //2-3-3.获取评论用户
        rUserStr = rUserList[i+2].innerText+'';
        //2-3-4.获取评论内容
        rContentStr = rContentList[i].innerText+'';
        //2-3-5.创建对象存储数据
        JSONData[i] = new reviewObj(rDateStr,scoreStr,rUserStr,rContentStr);  
    }
    
    // 3.添加下载按钮
    // 3-1.创建下载按钮
    let btn = document.createElement('a');
    // btn.setAttribute("href", csvString);
    btn.setAttribute("download", "data.csv");
    btn.innerText = '下载评论'
    // 3-2.设置按钮的样式
    function setStyle(dom, styles={}){
        Object.keys(styles).map(key => {
            dom.style[key] = styles[key]
        })
        return dom
    }
    btn = setStyle(btn, {
        // 'class' : 'download',
        'position': 'fixed',
        'top': '10px',
        'left': '10px',
        'width': '80px',
        'line-height': '30px',
        'text-align': 'center',
        'font': '16px "微软雅黑"',
        'backgroundColor': 'rgba(255,164,28,.5)',
        'color': '#fff',
        'padding': '0,auto',
        'z-index': '9999999999',
        // 'backgroundColor': 'yellow' // 注意的是，样式名不能有下划线，要合并在一起改为首字母大写列如：  background-color  =>  backgroundColor
    })
    // 3-3.追加按钮
    document.body.appendChild(btn);

    // 4.创建对象数组转CSV函数
    function JSONToCSVConvertor(JSONData, ShowLabel) {
        var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        // 4-1.是否显示表头
        if (ShowLabel) {
            var row = "";
            for (var index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        // 4-2.遍历对象数组，获取对象属性值并组成字符串
        for (var i = 0; i < arrData.length; i++) {
            var row = "";
            for (var index in arrData[i]) {
                // var arrValue = arrData[i][index] == null ? "" : '="' + arrData[i][index] + '"';
                var arrValue = arrData[i][index] == null ? "" : arrData[i][index];
                row += arrValue + ',';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        if (CSV == '') {
            alert('您好，页面中无可下载的评论数据，请刷新后再试！');
            return;
        }
        
        var fileName = "Result";
        // var uri = 'data:application/csv;charset=utf-8,' + escape(CSV); //encodeURIComponent
        var uri = 'data:application/csv;charset=utf-8,' + encodeURIComponent(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    // 5.下载按钮绑定事件
    btn.addEventListener('click',function(){
        JSONToCSVConvertor(JSONData, true);
    })
    
}
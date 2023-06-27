/**
 * 后台创题功能
 */
const fullScores = 100;
var min = 0;
var max = 1;
var amount = 100;
var passScores = 90;
var symbols = ['+', '-', '*'];
var QuesArr = [];

var a = localStorage.getItem('amount');
document.querySelector('.stu-amou').innerText = a;
var d = localStorage.getItem('difficulty');
document.querySelector('.stu-diff').innerText = d;
//加载设置页面的数据
document.querySelector('#title-name').innerText = localStorage.getItem('name');
// var amount = 50;
var judgeStyle = localStorage.getItem('judge');
switch(a){
    case '200道':amount = 200;break;
    case '100道':amount = 100;break;
    case '50道':amount = 50;break;
    case '20道':amount = 20;break;
    case '10道':amount = 10;break;
    default:amount=50; 
}

switch(d){
    case '困难':min=500,max=900;break;
    case '中等':min=100,max=499;break;
    case '默认':min=10,max=99;break; 
    case '简单':min=1,max=9;break;
    default:min=10,max=99;
}

var singleScores = fullScores / amount;

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function Ques(){
    this.id = 0;
    this.quesStr = "";
    this.inputAns = 0;
    this.rightAns = 0;
    this.isRight = false;
    this.symbArr = ['','',''];
    this.numArr = [0,0,0,0];


    // num长度必须比sym长度多1
}

for(var i=0;i<amount;i++){
    q = new Ques();
    q.id = i+1;
    //得到题目的运算符
    for(var j=0;j<q.symbArr.length;j++){
        q.symbArr[j] = symbols[getRandom(0,q.symbArr.length-1)];
        console.log(q)
    
    }
    //得到题目的数字
    for(var k=0;k<q.numArr.length;k++){
        q.numArr[k] = getRandom(min,max);

    }
    //将题目拼接成字符串
    for (var n=0; n<q.numArr.length; n++) {
        q.quesStr += q.numArr[n];
        if (n == q.numArr.length - 1)
            break;
        q.quesStr += q.symbArr[n];
    }
    q.rightAns = eval(q.quesStr);
    QuesArr[i] = q;
}

/**
 * JS与HTML的交互功能
 * 
 *  <li>
        <h3>第<span>1</span>题</h3>
        <p class="ques">214*454+634-463=?</p>
        <p class="answer">请在此输入你的答案：
            <input type="text">
        </p>
    </li>
 */

//获取ul元素
var quesList = document.querySelector('.content');
var quesLeftList = document.querySelector('.ques-list')

var lisArr = [];
var h3Arr = [];
var quesArr = [];
var answArr = [];
var inputArr = [];
var leftLisArr = [];
var leftLiArr = [];

//创建li元素
for(var i=0;i<amount;i++){
    //各种创建元素
    var lis = document.createElement('li');
    quesList.appendChild(lis);
    var h3 = document.createElement('h3');
    lis.appendChild(h3);
    var ques = document.createElement('p');ques.classList.add('ques');

    var answ = document.createElement('p');answ.classList.add('answer');

    lis.appendChild(ques);
    lis.appendChild(answ);
    var input = document.createElement('input');
    answ.innerText = "请在此输入你的答案：";
    answ.appendChild(input);

    h3.innerText = "第" + (i+1) + "题";
    ques.innerText = QuesArr[i].quesStr;

    //左边部分的按钮区域
    var leftLis = document.createElement('li');
    var leftLi = quesLeftList.appendChild(leftLis);
    leftLi.innerText = (i+1);

    lisArr[i] = lis;
    h3Arr[i] = h3;
    quesArr[i] = ques;
    answArr[i] = answ;
    inputArr[i] = input;
    leftLisArr[i] = leftLis;


}

/**
 * 等待时间的高级功能
 */
    //左侧部分的按钮与右侧部分进行互动

    //左侧按钮点击后
    for(let i=0;i<amount;i++){
        leftLisArr[i].addEventListener('click',function(){
            //排他思想
            // for(var j=0;j<amount;j++){
            //     leftLisArr[j].classList.remove('li-current');
            // }
            // //改变自己的颜样式
            // this.classList.add('li-current');
            //滚动过去
            window.scroll(0,lisArr[i].offsetTop - 100);
        })
    }

    for(let i=0;i<amount;i++){
        //监听每个框框，如果填了内容就变色
        inputArr[i].addEventListener('blur',function(){
            if(this.value == ''){
                leftLisArr[i].classList.remove('li-finish');
            }else{
                leftLisArr[i].classList.add('li-finish');
            }
        })
    }


/**
 * 点击提交后
 */
    function afterSubmit(){
       
            for(var i=0;i<amount;i++){
                inputArr[i].disabled = 'true';
                submit.disabled = 'true';
                if(parseInt(inputArr[i].value) == QuesArr[i].rightAns){
                    QuesArr[i].isRight = true;
                    if(judgeStyle != "during"){
                        currentScores += singleScores;
                    }
                }
            }

            for(var i=0;i<amount;i++){
                if(!QuesArr[i].isRight){
                    leftLisArr[i].style.backgroundColor = 'red';
                    leftLisArr[i].style.border = 'none';

                    leftLisArr[i].style.color = 'white';  

                    lisArr[i].style.border = 'red solid 1px';
                }
            }

            if(currentScores >=90){
                s.style.color = 'green';
                alert("您的最终成绩：" + currentScores + "分，成绩合格");
            }else{
                s.style.color = 'red';
                alert("您的最终成绩：" + currentScores + "分，成绩不合格");
            }
            s.innerText = currentScores + '分';
            s.style.display = 'block';
            clearInterval(countDown);



    }
    
    var submit = document.querySelector('.submit');
    var s = document.querySelector('.final-score');
    var currentScores = 0;

    submit.addEventListener('click',function(){
        var isConfirm = confirm('确定要提交试卷吗？');
        if(isConfirm){
            afterSubmit();
        }
        
    })

    /**
     * 倒计时功能
     */

    var minute = document.querySelector('.minute'); // 分钟的黑色盒子
    var second = document.querySelector('.second'); // 秒数的黑色盒子
    var minSecond = document.querySelector('.min-second'); // 毫秒的黑色盒子

    var m = localStorage.getItem('timeLimit');
    var sec = 0;
    var minSec = 0;
    var countDown = setInterval(function(){
        if(minSec==0 && sec >0){
            sec--;
            minSec+=99;
        }else if(minSec==0 && min>0){
            m--;
            sec+=59;
            minSec+=99;
        }

        if(sec==0 && m >0){
            m--;
            sec+=59;
        }

        minSec--;

        minute.innerText = (m>=10?m:'0'+m);
        second.innerText = (sec>=10?sec:'0'+sec);
        minSecond.innerText = (minSec>=10?minSec:'0'+minSec);


        if(m==0&&sec==0&&minSec==0){
            clearInterval(countDown);
            alert("时间到，系统已自动问您提交试卷");
            afterSubmit();
        }

    },10)

    var coverConfirm = document.querySelector('.cover-confirm');
    var cover = document.querySelector('.total-cover');
    var words = cover.querySelector('p');
    var box = document.querySelector('.message-box');


    //模拟测试边做边判题系统
   
    if(judgeStyle=="during"){
        s.style.display = 'block';
        for(let j=0;j<amount;j++){
            //监听每个框框，失去焦点或输入enter就判题
            inputArr[j].addEventListener('blur',function(){
                if(this.value == '')
                    return;
                this.disabled = true;
                if(parseInt(inputArr[j].value) == QuesArr[j].rightAns){
                    QuesArr[j].isRight = true;
                }
                if(!QuesArr[j].isRight){
                    leftLisArr[j].style.backgroundColor = 'red';
                    leftLisArr[j].style.border = 'none';
                    leftLisArr[j].style.color = 'white';
                    lisArr[j].style.border = 'red solid 1px';
                    //弹出学习指南


                    words.innerHTML = "第" + (j+1) + "题：" + QuesArr[j].quesStr + "的答案应该为：" + QuesArr[j].rightAns;
                    cover.style.visibility = 'visible';
                    box.classList.add('appear-scale');
                }else{
                    currentScores += singleScores;
                }
                s.innerText = currentScores + '分';
            })

            inputArr[j].addEventListener('focus', function(){
                inputArr[j].addEventListener('keyup', function(e) {
                    console.log(e.keyCode);
                    this.value = this.value.replace(/[^1234567890-]/g,'');
                    switch(e.keyCode){
                        case 13:
                            inputArr[j].blur();
                            if(j+1<amount){
                                inputArr[j+1].focus();
                            }
                            break;
                        case 40:
                            if(j+1<amount){
                                inputArr[j+1].focus();
                            }
                            break;
                        case 38:
                            if(j-1>=0){
                                inputArr[j-1].focus();
                            }
                            break;                      
                    }
                })
            })



        }
    }

    coverConfirm.addEventListener('click',function(){
        cover.style.visibility = 'hidden';
        box.classList.remove('appear-scale');
    })
    
9
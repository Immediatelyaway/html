
    
/**
 * TIP鼠标获得焦点后的样式更改
 */

var examName = document.querySelector('.exam-name');
var examNameTip = document.querySelector('.exam-name-tip');



examName.onblur = function(){
    if(this.value !== ''){
        examNameTip.style.visibility = 'hidden';
    }else{
        examNameTip.style.visibility = 'visible';
    }
}

/**
 * 获取创建考试的信息
 */
var creationInfo = {
    name:'',
    amount : 50,
    difficulty : 1,
    judge : 'after',
    timeLimit: 0
}

var examAmou = document.querySelector('#exam-amount');
var examDiff = document.querySelector('#exam-difficulty');
var judgeStyle = document.getElementsByName('judgeStyle');
var time = document.querySelector('.exam-timeLimit')
var created = document.querySelector('.confirm');

time.addEventListener('focus', function(){
    time.addEventListener('keyup', function(e) {
        console.log(e.keyCode);
                          
    })
})

created.addEventListener('click',function(){
    if(examName.value == ''){
        examNameTip.style.color = 'red';
        examName.style.backgroundColor = 'rgba(255,0,0,0.5)';
        setTimeout(function(){
            examName.style.backgroundColor = 'white';
        },1500)
        return;
    }

    if(!/^\d+$/.test(time.value)){
        time.value == '';
        time.style.backgroundColor = 'rgba(255,0,0,0.5)';
        setTimeout(function(){
            time.style.backgroundColor = 'white';
        },1500)
        return;
    }
    if(!((parseInt(time.value)>=1 && parseInt(time.value)<=999))){
        time.style.backgroundColor = 'rgba(255,0,0,0.5)';
        setTimeout(function(){
            time.style.backgroundColor = 'white';
        },1500)
        return;
    }
    time.value = parseInt(time.value);
    creationInfo.name = examName.value;
    creationInfo.amount = examAmou.value;
    creationInfo.difficulty = examDiff.value;
    for(var i=0;i<judgeStyle.length;i++){
        if(judgeStyle[i].checked){
            creationInfo.judge = judgeStyle[i].value;
            break;
        }
    }
    creationInfo.timeLimit = time.value;

    localStorage.setItem('name',creationInfo.name);
    localStorage.setItem('difficulty',creationInfo.difficulty);
    localStorage.setItem('amount',creationInfo.amount);
    localStorage.setItem('judge',creationInfo.judge);
    localStorage.setItem('timeLimit',creationInfo.timeLimit);
    window.location.href = './exam.html';
})



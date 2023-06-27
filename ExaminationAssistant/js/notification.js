var cover = document.querySelector('.total-cover');
var title = document.querySelector('.title');
var words = document.querySelector('.words');
var messageList = document.querySelector('.info').querySelectorAll('li');
var confirm = document.querySelector('.cover-confirm');
var box = document.querySelector('.message-box');

for(var i=0;i<messageList.length;i++){
    messageList[i].addEventListener('click',function(e){
        var t = this.querySelector('h5');
        var p = this.querySelector('p');
        title.innerHTML = t.innerHTML;
        words.innerHTML = p.innerHTML;
        cover.style.visibility = 'visible';
        box.classList.add('appear-scale');
    })
}

confirm.addEventListener('click',function(){
    cover.style.visibility = 'hidden';
    box.classList.remove('appear-scale');

})


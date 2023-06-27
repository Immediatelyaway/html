/**
 * 账户处扩展动画
 */
var arrow = document.querySelector('#arrow');
var list = document.querySelector('.address-list');

arrow.addEventListener('mouseover',function(){
    list.style.visibility = 'visible';
    list.style.opacity = '1';
    list.style.transform = 'translateY(-15px)';

})

document.addEventListener('mousedown', (e) => {
    if (e.target!=list) {
        list.style.visibility = 'hidden';
        list.style.opacity = '0';
        list.style.transform = 'translateY(0)';
    }
})
    
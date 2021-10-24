const slider3 = new rSlider({
    target: '#slider3',
    values: {min: 0, max: 500},
    step: 1,
    range: true,
    set: [10, 100],
    scale: true,
    labels: false,
    // onChange: valFunc
});
const slider4 = new rSlider({
    target: '#slider4',
    values: {min: 0, max: 26},
    step: 1,
    range: true,
    set: [4, 14],
    scale: true,
    labels: false,
    // onChange: valFunc
});

const nmInputs = document.querySelectorAll('.container input[type="number"]');
function calculated(){

}


nmInputs.forEach((item,idx) => {
    item.addEventListener('input',function(){
        let curr = item.value;
        let currSib = item.nextElementSibling ? item.nextElementSibling.value : item.previousElementSibling.value;
        let itemMax = item.getAttribute('max');
        let itemMin = item.getAttribute('min');
        let maxLength = itemMax.length;
        let numSib = parseInt(currSib);
        let numMax = parseInt(itemMax);
        let numMin = parseInt(itemMin);
        let numCurr = parseInt(curr);
        let firstNm = Array.from(item.value)[0];
        let toFirst = parseInt(firstNm);
        let valLength = item.value.length;

        if(toFirst === 0){
            item.value = item.value.substr(0, 1);
        }
        if(item.classList.contains('lf-val')){
            if(numCurr > numSib || curr > numMax){
                item.value = item.value.substr(0, maxLength - 1);
            }else if(valLength > maxLength){
                item.value = item.value.substr(0, maxLength);
            }
        }else{
            if(curr > numMax){
                item.value = item.value.substr(0, maxLength - 1);
            }
        }
        let itemParent = item.parentElement.parentElement.querySelector('.rs-container').offsetWidth;

        
    });

});
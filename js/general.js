const body = document.body;
// rg-side-list datas
const rgSideList = document.querySelector('.rg-side-list');
const dataAdd = rgSideList.getAttribute('data-add');
const dataAdded = rgSideList.getAttribute('data-added');
const dataCurrency = rgSideList.getAttribute('data-currency');
const gelSymbol = '&#8382;';
const dollarSymbol = '&#0036;';
// select header items
const logoItem = document.querySelector('.logo');
const bellItem = document.querySelector('.bell-svg');
const basketItem = document.querySelector('.basket-svg');
const userItem = document.querySelector('.user-svg');
const flagItem = document.querySelector('.flag-svg');
// appending svgs to header items
logoItem.insertAdjacentHTML('afterbegin',logoSvg);
bellItem.insertAdjacentHTML('afterbegin',bellSvg);
basketItem.insertAdjacentHTML('afterbegin',basketSvg);
userItem.insertAdjacentHTML('afterbegin',userSvg);
flagItem.insertAdjacentHTML('afterbegin',flagSvg);
userItem.insertAdjacentHTML('beforeend',arrowSvg);

// basket red count element
const basketCount = document.createElement('span');
basketCount.textContent = 0;
basketCount.classList.add('basket-count');
basketItem.insertAdjacentElement('beforeend',basketCount);

// append not found svg
const notFound = document.querySelector('.not-found');
const notFoundSvg = document.querySelector('.found-svg');
notFoundSvg.insertAdjacentHTML('afterbegin',notfoundSvg);


// select dom sorting li's
const domLi = document.querySelectorAll('.dom-sorting ul li');
const sortDomUl = document.querySelector('.rg-side-list');
domLi.forEach((item,idx) => {
    item.insertAdjacentHTML('beforeend',sortSvg);
    item.addEventListener('click',function(){
        let typos = item.classList;
        // check if any siblings has active class and remove it
        item.parentElement.querySelector('.active-sort') ?
        item.parentElement.querySelector('.active-sort').classList.remove('active-sort') :
        null;
        item.classList.add('active-sort');
        // individual type
        if(typos.contains('due-price')){
            sortDomUl.classList.add('flex-col');
        }
    });
});


const prodCateg = document.querySelector('.prod-categ');
const prodZone = document.querySelector('.prod-dom-zone');
const prodUl = document.createElement('div');
const prodUlTwo = document.createElement('div');
prodUl.classList.add('prod-list');
prodUlTwo.classList.add('prod-list');

function basketCircle (curr){
    let bsCount = document.querySelector('.basket-count');
    let bsCountNum = parseInt(bsCount.innerHTML);
    curr.classList.contains('green-basket') ?
    bsCount.innerHTML = ++bsCountNum :
    bsCount.innerHTML = --bsCountNum;
}

// green basket click and counter increase
let grIncrease = (item) => {
    let itemParent = item.parentElement;
    let prevSib = itemParent.previousElementSibling;
    basketCircle(item);
    itemParent.classList.add('noned');
    prevSib.classList.add('inline-flexy');
};
let getDeacrease = (item) => {
    // let itemParent = item.parentElement;
    let nextSib = item.nextElementSibling;
    basketCircle(item);
    item.classList.remove('inline-flexy');
    nextSib.classList.remove('noned');
};

// add categories and domain zones
function labelAdd (item,id,name,divs){
    let ids = id;
    let prodLabel = document.createElement('label');
    let prodInput = document.createElement('input');
    let prodSpan = document.createElement('span');
    let prodDiv = document.createElement('div');
    prodLabel.setAttribute('data-id',ids);
    prodDiv.textContent = name;
    prodInput.setAttribute('type','checkbox');
    prodLabel.insertAdjacentElement('afterbegin',prodInput);
    prodLabel.insertAdjacentElement('beforeend',prodSpan);
    prodLabel.insertAdjacentElement('beforeend',prodDiv);
    prodSpan.innerHTML = checkSvg;
    divs.insertAdjacentElement('beforeend',prodLabel);

    
    prodInput.addEventListener('change',function(){
        let toppestparent = this.parentElement.parentElement.parentElement;
        let currParent = this.parentElement.getAttribute('data-id');
        let vidy = this.parentElement.querySelector('div').textContent;
        let snItems = document.querySelectorAll('.single-item');
        let snItemText = document.querySelectorAll('.single-item .single-left-item div');
        if(this.checked){
            if(toppestparent.classList.contains('prod-categ')){
                snItems.forEach((item,idx) => {
                    let itemId = item.getAttribute('data-id');
                    if(itemId.indexOf(currParent)){
                        item.classList.add('noned');
                    }
                });
            }else{
                snItemText.forEach((item,idx) => {
                    let itemText = item.textContent;
                    if(itemText.indexOf(vidy)){
                        snItems[idx].classList.add('noned');
                    }
                });
            }
        }else{
            if(toppestparent.classList.contains('prod-categ')){
                snItems.forEach((item,idx) => {
                    let itemId = item.getAttribute('data-id');
                    if(itemId.indexOf(currParent)){
                        item.classList.remove('noned');
                    }
                });
            }else{
                snItemText.forEach((item,idx) => {
                    let itemText = item.textContent;
                    if(itemText.indexOf(vidy)){
                        snItems[idx].classList.remove('noned');
                    }
                });
            }
        }
    });

}
// add items to right side element
function products(domainName,domainExtension,price,categories,listParent){
    // convert lari to dollar
    let priceLari = price;
    let priceDollar = priceLari / dataCurrency;
    let finalCurr = priceDollar.toFixed(2);

    let singleItem = document.createElement('div');
    let inSingleItem = document.createElement('div');
    let singleLeft = document.createElement('div');
    let singleRight = document.createElement('div');

    singleItem.setAttribute('data-price',price);
    singleItem.setAttribute('data-id',categories);
    inSingleItem.classList.add('in-single-item');

    // sdefining datas for sorting elements
    singleItem.style.order = price;

    // left side element children
    let lfSpan = document.createElement('span');
    let lfDiv = document.createElement('div');
    lfSpan.innerHTML = arrowSvg;
    lfDiv.textContent = domainName + domainExtension;
    singleLeft.insertAdjacentElement('beforeend',lfSpan);
    singleLeft.insertAdjacentElement('beforeend',lfDiv);
    //right side element children
    let forBoth = document.createElement('div');
    let beforeAdd = document.createElement('div');
    let afterAdd = document.createElement('div');

        // after add markup
        let afterAddSpan = document.createElement('span');
        let afterAddPar = document.createElement('p');
        afterAddSpan.insertAdjacentHTML('beforeend',checkSvg);
        afterAddPar.textContent = dataAdded;
        // before adding markup
        let twoCurr = document.createElement('div');
        let gelCurr = document.createElement('div');
        let dollarCurr = document.createElement('span');
        dollarCurr.classList.add('dollar-currency');
        gelCurr.classList.add('gel-currency');
        twoCurr.classList.add('two-currency');
        dollarCurr.innerHTML = finalCurr + dollarSymbol;
        gelCurr.innerHTML = priceLari + gelSymbol; 
        twoCurr.insertAdjacentElement('beforeend',gelCurr);
        twoCurr.insertAdjacentElement('beforeend',dollarCurr);
        beforeAdd.insertAdjacentElement('beforeend',twoCurr);
        // create basket item
        let greenBasket = document.createElement('div');
        let grBsSvg = document.createElement('div');
        let grBsSpan = document.createElement('span');
        grBsSvg.innerHTML = basketSvg;
        grBsSpan.textContent = dataAdd;
        grBsSpan.classList.add('green-basket-text');
        grBsSvg.classList.add('green-basket-svg');
        greenBasket.classList.add('green-basket');
        greenBasket.insertAdjacentElement('beforeend',grBsSpan);
        greenBasket.insertAdjacentElement('beforeend',grBsSvg);
        beforeAdd.insertAdjacentElement('beforeend',greenBasket);

    afterAdd.classList.add('after-add');
    beforeAdd.classList.add('before-add');
    forBoth.classList.add('for-both-rg');

        // add in after added parent
        afterAdd.insertAdjacentElement('beforeend',afterAddSpan);
        afterAdd.insertAdjacentElement('beforeend',afterAddPar);
        forBoth.insertAdjacentElement('beforeend',afterAdd);
        forBoth.insertAdjacentElement('beforeend',beforeAdd);

    singleLeft.classList.add('single-left-item');
    singleRight.classList.add('single-right-item');
    singleItem.classList.add('single-item');
    singleItem.insertAdjacentElement('beforeend',inSingleItem);
    inSingleItem.insertAdjacentElement('beforeend',singleLeft);
    inSingleItem.insertAdjacentElement('beforeend',singleRight);
    singleRight.insertAdjacentElement('beforeend',forBoth);
    listParent.insertAdjacentElement('beforeend',singleItem);

    greenBasket.addEventListener('click',function(){
        grIncrease(this);
    });
    afterAdd.addEventListener('click',function(){
        getDeacrease(this);
    });

}



const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
        let datas = JSON.parse(xhttp.responseText);
        const catNames = datas.categories;
        const prodZones = datas.domainList;
        catNames.forEach((item,idx) => {
            labelAdd(item,item.id,item.name,prodUl);
        });
        prodZones.forEach((item,idx) => {
            let domExt = item.domainExtension;
            let domCateg = item.categories;
            labelAdd(item,item.categories,item.domainExtension,prodUlTwo);
            products(datas.domainList[idx].domainName,datas.domainList[idx].domainExtension,datas.domainList[idx].price,datas.domainList[idx].categories,rgSideList);
        });
        prodCateg.insertAdjacentElement('beforeend',prodUl);
        prodZone.insertAdjacentElement('beforeend',prodUlTwo);
    }
};
xhttp.open("GET", "../domainList.json", true);
xhttp.send();

// mark up for mobile resolution
const cloneNav = document.querySelector('.header-menu').cloneNode(true);
const mobileNav = document.createElement('nav');
const navexit = document.createElement('span');
navexit.classList.add('nav-exit');
navexit.innerHTML = exitSvg;
mobileNav.classList.add('mobile-nav');
mobileNav.insertAdjacentElement('beforeend',cloneNav);
body.insertAdjacentElement('afterbegin',mobileNav);
body.insertAdjacentElement('afterbegin',navexit);

const burgerMenu = document.createElement('span');
burgerMenu.classList.add('burger-menu');
burgerMenu.innerHTML = burgerSvg;
logoItem.insertAdjacentElement('beforebegin',burgerMenu);

const blankBack = document.createElement('div');
blankBack.classList.add('blank-back');
body.insertAdjacentElement('beforeend',blankBack);

burgerMenu.addEventListener('click',function(){
    mobileNav.classList.add('transforming');
    navexit.classList.add('transforming');
    navexit.style.right = '20px';
    blankBack.classList.add('blocky');
});

function exitNav(){
    mobileNav.classList.remove('transforming');
    navexit.classList.remove('transforming');
    navexit.style.right = '0';
    blankBack.classList.remove('blocky');
}

blankBack.addEventListener('click',function(){
    exitNav();
});
navexit.addEventListener('click',function(){
    exitNav();
});



// mobile sorting button
const bothSorts = document.createElement('div');
const selectSort = document.createElement('select');
const fullslider = document.querySelector('.full-background');
const pushingTo = [];
domLi.forEach((item,idx) => {
    let tx = item.textContent;
    pushingTo.push(tx);
});

const lfSort = document.createElement('div');
const lfSortTx = document.createElement('p');
const sortireba = document.querySelector('.dom-sorting>span').textContent;
const withoutDec = sortireba.replace(':','');
const leftSortSvg = document.createElement('span');

pushingTo.unshift(sortireba);

pushingTo.forEach((item,idx) => {
    let opt = document.createElement('option');
    opt.textContent = item;
    selectSort.insertAdjacentElement('beforeend',opt);
});

lfSortTx.textContent = withoutDec;
leftSortSvg.innerHTML = filterSvg;
lfSort.classList.add('left-sorting');
lfSortTx.classList.add('left-sorting-text');
leftSortSvg.classList.add('left-sorting-svg');
bothSorts.classList.add('both-sorting');

lfSort.insertAdjacentElement('beforeend',lfSortTx);
lfSort.insertAdjacentElement('beforeend',leftSortSvg);
bothSorts.insertAdjacentElement('beforeend',lfSort);
bothSorts.insertAdjacentElement('beforeend',selectSort);

fullslider.insertAdjacentElement('afterend',bothSorts);


// mobile sorting markup
const filterBtn = document.createElement('button');
const btnDiv = document.createElement('div');
const searchTx = document.querySelector('.lf-side').getAttribute('data-search-text');
const filterTx = document.querySelector('.lf-side').getAttribute('data-filter-text');
const lfSideFilter = document.querySelector('.lf-side');
const lfSideFilterDorm = document.querySelector('.lf-side form');
const hdFilterSvg = document.createElement('span');
const srtHeader = document.createElement('div');
const srtHeaderTx = document.createElement('div');

hdFilterSvg.innerHTML = exitSvg;
srtHeaderTx.textContent = filterTx;
filterBtn.textContent = searchTx;

srtHeader.classList.add('sort-header');
srtHeaderTx.classList.add('header-filter-tx');
hdFilterSvg.classList.add('filter-exit');
btnDiv.classList.add('btn-div');
btnDiv.insertAdjacentElement('beforeend',filterBtn);
srtHeader.insertAdjacentElement('beforeend',srtHeaderTx);
srtHeader.insertAdjacentElement('beforeend',hdFilterSvg);
lfSideFilter.insertAdjacentElement('afterbegin',srtHeader);
lfSideFilterDorm.insertAdjacentElement('beforeend',btnDiv);


hdFilterSvg.addEventListener('click',function(){
    this.parentElement.parentElement.classList.add('noned');
    body.classList.remove('hide-it');
});
lfSort.addEventListener('click',function(){
    lfSideFilter.classList.remove('noned');
    lfSideFilter.style.display = 'block';
    body.classList.add('hide-it');
});

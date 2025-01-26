
const getApiData = async () =>{
    // Here is URL for tourist spots in Taipei provided by Taipei City Government
    let src = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1";
    let response = await fetch(src);
    let data = await response.json();
    let results = data.data.results;
    return results;
}
const setPromoData = (apidata) =>{
    console.log("setPromoData");
    let imgDiv = document.querySelectorAll('.clip-img-s');
    imgDiv.forEach( async(div, i) => {
        indexArr[0] = i;
        let data = apidata[indexArr[0]];
        let filelist = data.filelist;
        let regex = /https:.+?\.jpg/i;
        let imgUrl = filelist.match(regex)[0];
        let newH4 = document.createElement('h4');
        let newImg = document.createElement('img');
        let title = document.createTextNode(data.stitle);
        newH4.appendChild(title);
        newImg.src = imgUrl;
        newImg.width = 80;
        div.appendChild(newImg);
        div.parentNode.insertBefore(newH4, div.nextSibling);
    })
}
const setItemData = (apidata) =>{
    console.log("setItemData");
    let item = document.querySelectorAll('.item');
    item.forEach( async(div) => {
        indexArr[0] += 1;
        let data = apidata[indexArr[0]];
        let filelist = data.filelist;
        let regex = /https:.+?\.jpg/i;
        let imgUrl = filelist.match(regex)[0];
        let newImg = document.createElement('img');
        let newDiv = document.createElement('div');
        let title = document.createTextNode(data.stitle);
        newImg.className = 'item-img';
        newImg.src = imgUrl;
        newDiv.className = 'item-title single-ellipsis';
        newDiv.appendChild(title);
        div.appendChild(newImg);
        div.appendChild(newDiv);
    })
}
const loadmore = (apidata) =>{
    console.log("loadmore");
    for(let i = 0; i < 10; i++){
        indexArr[0] += 1;
        let section = document.querySelector('.box-b');
        let data = apidata[indexArr[0]];
        let filelist = data.filelist;
        let regex = /https:.+?\.jpg/i;
        let imgUrl = filelist.match(regex)[0];
        let newParentDiv = document.createElement('div');
        let newMark = document.createElement('img');
        let newImg = document.createElement('img');
        let newDiv = document.createElement('div');
        let title = document.createTextNode(data.stitle);
        newParentDiv.className = "item";
        newMark.className = 'item-mark';
        newMark.src = 'star.png';
        newMark.width = 30;
        newImg.className = 'item-img';
        newImg.src = imgUrl;
        newDiv.className = 'item-title single-ellipsis';
        newParentDiv.appendChild(newMark);
        newParentDiv.appendChild(newImg);
        newDiv.appendChild(title);
        newParentDiv.appendChild(newImg);
        newParentDiv.appendChild(newDiv);
        section.insertBefore(newParentDiv, null);
        if (indexArr[0] > (apidata.length - 2)){
            btnload.style.display = "none";
            break
        }
    }
}
const toggleDropdown = (e) =>{
    console.log(e);
    dropOption.style.display = "none";
    dropdown.style.display = "block";
}
const toggleClose = () =>{
    dropOption.style.display = "block";
    dropdown.style.display = "none";
}

const indexArr = [0];
const btnload = document.querySelector('#loadmore');
const dropOption = document.querySelector('.dropOption');
const dropdown = document.querySelector('.dropdown');
const btnX = document.querySelector('.btn-x');

window.addEventListener('load', async(event) => {
    // console.log(event.currentTarget);  // window
    // console.log(this.localStorage);  // logs the localStorage of window
    // console.log(event.currentTarget === this); // logs `true`
    const apidata = await getApiData();
    setPromoData(apidata);
    setItemData(apidata);
}); 

btnload.addEventListener('click', async(event) => {
    // console.log(event.currentTarget);  // btnload element
    // console.log(this.localStorage);  // logs the localStorage of window
    // console.log(event.currentTarget === this); // logs `false`
    const apidata = await getApiData();
    console.log("click loadmore btn 2");
    loadmore(apidata);
});   

if (dropOption) {
    dropOption.addEventListener('click', toggleDropdown);
}
if (btnX) {
    btnX.addEventListener('click', toggleClose);
}

// window.addEventListener('load', toggleDropdown)
/*
const onclick1 = function(e) {  
    console.log("onclick1");
    console.log(e); // undefined
}
btnload.addEventListener('click', onclick1);
*/


// btnload.addEventListener("click", function(){ 
//     console.log("click btnload 1"); 
// });

// const handleClick = function() {
//     console.log("click element.");
// }
// btnload.addEventListener("click", handleClick);
// btnload.addEventListener("click", null);

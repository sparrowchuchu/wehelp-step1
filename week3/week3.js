
const getApiData = async () =>{
    try{
        // console.log("getApiData");
        // Here is URL for tourist spots in Taipei provided by Taipei City Government
        let src = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1";
        let response = await fetch(src);  // 回傳promise
        let data = await response.json();  // 回傳promise
        //  以上兩行 code 等於以下註解
        /*
        let data = await fetch(src).then( (response) => {
            return response.json();
        });
        */
        let results = data.data.results;
        return results;
    }catch(err){
        console.log("error: ", err);
    }
}
const saveToSessionStorage = (apidata) =>{
    // console.log("saveToSessionStorage");
    apidataStr = JSON.stringify(apidata);
    console.log('typeof apidataStr: ', typeof apidataStr);
    sessionStorage.setItem("apidataStr", apidataStr);
}
const loadFromSessionStorage = () =>{
    // console.log("loadFromSessionStorage");
    let apidataStr = sessionStorage.getItem("apidataStr");
    let apidata = JSON.parse(apidataStr);
    return apidata;
}
const setApiIndex = (index) =>{
    // console.log("setApiIndex ", index);
    sessionStorage.setItem("index", index);
}
const getApiIndex = () =>{
    // console.log("getApiIndex");
    let index = sessionStorage.getItem("index");
    return index;
}
const setPromoData = (apidata) =>{
    // console.log("setPromoData");
    let imgDiv = document.querySelectorAll('.clip-img-s');
    imgDiv.forEach( (div) => {
        let index = Number(getApiIndex());
        let data = apidata[index];
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
        setApiIndex(index + 1);
    })
}
const setItemData = (apidata) =>{
    // console.log("setItemData");
    let item = document.querySelectorAll('.item');
    item.forEach( (div) => {
        let index =  Number(getApiIndex());
        let data = apidata[index];
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
        setApiIndex(index + 1);
    });
}
const loadmore = (apidata) =>{
    // console.log("loadmore");
    for(let i = 0; i < 10; i++){
        let index =  Number(getApiIndex());
        let section = document.querySelector('.box-b');
        let data = apidata[index];
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
        if (index > (apidata.length - 2)){
            btnload.style.display = "none";
            break
        }
        setApiIndex(index + 1);
    }
}
const toggleDropdown = (e) =>{
    // console.log(e);
    dropOption.style.display = "none";
    dropdown.style.display = "block";
}
const toggleClose = () =>{
    dropOption.style.display = "block";
    dropdown.style.display = "none";
}

const btnload = document.querySelector('#loadmore');
const dropOption = document.querySelector('.dropOption');
const dropdown = document.querySelector('.dropdown');
const btnX = document.querySelector('.btn-x');

window.addEventListener('load', async(event) => {
    setApiIndex(0);
    if(!sessionStorage.getItem("apidataStr")){
        let apidata = await getApiData();
        saveToSessionStorage(apidata);
    }
    let apidata = loadFromSessionStorage();
    setPromoData(apidata);
    setItemData(apidata);
    btnload.addEventListener('click', (event) => {
        // console.log("click loadmore btn");
        loadmore(apidata);
    });  
}); 

dropOption.addEventListener('click', toggleDropdown);
btnX.addEventListener('click', toggleClose);






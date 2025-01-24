const getApiData = async (i) =>{
    // Here is URL for tourist spots in Taipei provided by Taipei City Government
    let src = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1";
    let response = await fetch(src);
    let data = await response.json();
    let results = data.data.results;
    let title = results[i].stitle;
    let filelist = results[i].filelist;
    let regex = /https:.+?\.jpg/i;
    let imgUrl = filelist.match(regex)[0];
    return [title, imgUrl, results.length];
}
const getPromoData = () =>{
    let imgDiv = document.querySelectorAll('.clip-img-s');
    imgDiv.forEach( async(div, i) => {
        indexArr[0] = i;
        let data = await getApiData(indexArr[0]);
        let newH4 = document.createElement('h4');
        let newImg = document.createElement('img');
        let title = document.createTextNode(data[0]);
        newH4.appendChild(title);
        newImg.src = data[1];
        newImg.width = 80;
        div.appendChild(newImg);
        div.parentNode.insertBefore(newH4, div.nextSibling);
    })
}
const getItemData = () =>{
    let item = document.querySelectorAll('.item');
    item.forEach( async(div) => {
        indexArr[0] += 1;
        let data = await getApiData(indexArr[0]);
        let newImg = document.createElement('img');
        let newDiv = document.createElement('div');
        let title = document.createTextNode(data[0]);
        newImg.className = 'item-img';
        newImg.src = data[1];
        newDiv.className = 'item-title single-ellipsis';
        newDiv.appendChild(title);
        div.appendChild(newImg);
        div.appendChild(newDiv);
    })
}
const loadmore = async () =>{
    // console.log("loadmore");
    for(let i = 0; i < 10; i++){
        indexArr[0] += 1;
        let section = document.querySelector('.box-b');
        let data = await getApiData(indexArr[0]);
        let newParentDiv = document.createElement('div');
        let newMark = document.createElement('img');
        let newImg = document.createElement('img');
        let newDiv = document.createElement('div');
        let title = document.createTextNode(data[0]);
        newParentDiv.className = "item";
        newMark.className = 'item-mark';
        newMark.src = 'star.png';
        newMark.width = 30;
        newImg.className = 'item-img';
        newImg.src = data[1];
        newDiv.className = 'item-title single-ellipsis';
        newParentDiv.appendChild(newMark);
        newParentDiv.appendChild(newImg);
        newDiv.appendChild(title);
        newParentDiv.appendChild(newImg);
        newParentDiv.appendChild(newDiv);
        section.insertBefore(newParentDiv, null);
        if (indexArr[0] > (data[2] - 2)){
            btnload.style.display = "none";
            break
        }
    }
}
const toggleDropdown = () =>{
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

document.addEventListener('DOMContentLoaded ', getPromoData());
document.addEventListener('DOMContentLoaded ', getItemData());
btnload.addEventListener('click', loadmore);
dropOption.addEventListener('click', toggleDropdown);
btnX.addEventListener('click', toggleClose);







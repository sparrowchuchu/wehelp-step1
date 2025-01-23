async function getApiData(i){
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

function getPromoData(indexArr){
    this.indexArr = indexArr;
    let imgDiv = document.querySelectorAll('.clip-img-s');
    imgDiv.forEach( async(div, i) => {
        indexArr[0] = i;
        // console.log('indexArr[0]', indexArr[0]);
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

function getItemData(indexArr){
    this.indexArr = indexArr;
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

async function loadmore(){
    console.log("loadmore");
    for(let i = 0; i < 10; i++){
        indexArr[0] += 1;
        let section = document.querySelector('.box-b');
        let data = await getApiData(indexArr[0]);
        let newParentDiv = document.createElement('div');
        let newImg = document.createElement('img');
        let newDiv = document.createElement('div');
        let title = document.createTextNode(data[0]);
        newParentDiv.className = "item";
        newImg.className = 'item-img';
        newImg.src = data[1];
        newDiv.className = 'item-title single-ellipsis';
        newParentDiv.appendChild(newImg);
        newDiv.appendChild(title);
        newParentDiv.appendChild(newImg);
        newParentDiv.appendChild(newDiv);
        section.insertBefore(newParentDiv, null);
        if (indexArr[0] > (data[2] - 2)){
            console.log(indexArr[0], data[2]);
            btnload.style.display = "none";
            break
        }
    }
}


const indexArr = [0];
const btnload = document.querySelector('#loadmore');

document.addEventListener('DOMContentLoaded ', getPromoData(indexArr));
document.addEventListener('DOMContentLoaded ', getItemData(indexArr));
btnload.addEventListener('click', loadmore);



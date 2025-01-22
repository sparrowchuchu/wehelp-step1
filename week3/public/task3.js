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
    return [title, imgUrl];
}

function getPromoData(){
    let imgDiv = document.querySelectorAll('.clip-img-s');
    imgDiv.forEach( async(div, i) => {
        let data = await getApiData(i);
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

function getItemData(){
    let item = document.querySelectorAll('.item');
    console.log(item);
    item.forEach( async(div, i) => {
        let data = await getApiData(i + 3);
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

document.addEventListener('load', getPromoData());
document.addEventListener('load', getItemData());
// document.addEventListener('DOMContentLoaded', getPromoData());


// let temp = getApiData(1);



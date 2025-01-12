/*
There is a number sequence: 0, 4, 8, 7, 11, 15, 14, 18, 22, 21, 25, …
Find out the nth term in this sequence.
*/
function getNumber(index){
    let reduce = Math.floor(index/3);
    let add = index - reduce;
    console.log(add*4 - reduce)
}

getNumber(1); // print 4
getNumber(5); // print 15
getNumber(10); // print 25
getNumber(30); // print 70



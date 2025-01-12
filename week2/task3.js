function func(...data){
    let mid = [];
    data.forEach(name => {
        if (name.length >=4){
            mid.push(name[2]);
        } else{
            mid.push(name[1]);
        }
    });
    // console.log(mid);
    let unique = mid.filter(item => mid.indexOf(item) === mid.lastIndexOf(item));
    // console.log(unique);
    if (unique.length === 0) {
        console.log("沒有");
    } else {
        unique.forEach(u => {
            console.log(data[mid.indexOf(u)]);
        });
    }
}


func("彭大牆", "陳王明雅", "吳明");  // print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花");  // print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花");  // print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆");  // print 夏曼藍波安




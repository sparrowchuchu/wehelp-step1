let booking = {
    "John": Array.from({ length: 24 }, (_, index) => index + 1),
    "Bob": Array.from({ length: 24 }, (_, index) => index + 1),
    "Jenny": Array.from({ length: 24 }, (_, index) => index + 1)
  };
  
  function book(consultants, hour, duration, criteria) {
    // 將 criteria 與 consultant 建立 list
    let order = consultants.map(consultant => {
      return { [criteria]: consultant[criteria], name: consultant.name };
    });
  
    // 依據 criteria 排序
    if (criteria === "price") {
      order.sort((a, b) => a[criteria] - b[criteria]);  // 小到大
    } else if (criteria === "rate") {
      order.sort((a, b) => b[criteria] - a[criteria]);  // 大到小
    }
  
    // 嘗試依照順序找可用的顧問
    for (let i = 0; i < order.length; i++) {
      let consultantName = order[i].name;
      let availableHours = booking[consultantName];
      let endHour = hour + duration - 1;
  
      // 檢查顧問是否有足夠的時間
      if (availableHours.every(h => h >= hour && h <= endHour)) {
        // 預定時間並更新顧問的空閒時間
        for (let j = 0; j < duration; j++) {
          availableHours.splice(availableHours.indexOf(hour + j), 1);
        }
  
        console.log(consultantName);
        return;
      }
    }
  
    console.log("No Service");
  }
  
  const consultants = [
    { name: "John", rate: 4.5, price: 1000 },
    { name: "Bob", rate: 3, price: 1200 },
    { name: "Jenny", rate: 3.8, price: 800 }
  ];
  
  // 測試案例
  book(consultants, 15, 1, "price");  // Jenny
  book(consultants, 11, 2, "price");  // Jenny
  book(consultants, 10, 2, "price");  // John
  book(consultants, 20, 2, "rate");   // John
  book(consultants, 11, 1, "rate");   // Bob
  book(consultants, 11, 2, "rate");   // No Service
  book(consultants, 14, 3, "price");  // John
  
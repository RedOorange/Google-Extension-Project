chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  let goodsUrl = changeInfo.url.slice(0, 24);
  let priceUrl = changeInfo.url.slice(0, 33);

  if (tab) {
    if (goodsUrl === 'https://book.kongfz.com/') {
          chrome.scripting
          .executeScript({
            target : {tabId : tabId},
            func : getISBN,
          })
          .then((ISBN) => 
            opennewTab(ISBN)
          )
      }
      if(priceUrl === 'https://search.kongfz.com/product'){
       
      
          chrome.scripting
          .executeScript({
            target : {tabId : tabId},
            func : getPrice,
          })

      }
  }
})


function getPrice(){
  
  var sum = 0;
  var num = 0;

  let intervalId = setInterval(() => {
    if (document.querySelectorAll("#listBox > div:nth-child(n) > div.item-other-info > div.first-info.clearfix > div.f_right.red.price > span.bold").length > 0) {
      clearInterval(intervalId);
      tect2()
      
    }else{
     
    }
  }, 200);


  
   
      function tect2(){
        
        var lu = '鲁安格斯'
        var da = '大喜阅'
        var yi = '栾奕崇光'
        var ai = '埃利奥'
        var meng = '亿梦春田'
        var shi = '鲁是特'
        var zong = '纵列風'
        var ling = '灵感飞驰'
        var jing = '靖鮟大君'
        var jian = '鍵の君'
        var tian = '卖家超过10天未登录'
        var elements = document.querySelectorAll("#listBox > div:nth-child(n) > div.item-info > div.info-bottom-box > div.user-info > div:nth-child(1) > a.user-info-link > span")
        elements.forEach((shop) => { 
          if (shop.innerHTML.includes(lu) || shop.innerHTML.includes(da) || shop.innerHTML.includes(yi) || shop.innerHTML.includes(ai) || shop.innerHTML.includes(meng) || shop.innerHTML.includes(shi) || shop.innerHTML.includes(zong) || shop.innerHTML.includes(ling) || shop.innerHTML.includes(jing) || shop.innerHTML.includes(jian) || shop.innerHTML.includes(tian)) {
            console.log("黄色")
            shop.style.backgroundColor = "yellow";
          }
        })
       
        var component = document.querySelectorAll("#listBox > div:nth-child(n)") // Replace 'componentId' with the actual ID or selector of the component
                                                   
                let price4 = 0
              component.forEach((Price) => { 
              
              Price.addEventListener('click', function() {
                console.log(Price.style.backgroundColor)
                if(price4 < 4){
                  if(Price.style.backgroundColor == 'lightgreen'){
                    Price.style.backgroundColor = ''
                    price4--
                  }else{
                    Price.style.backgroundColor = 'lightgreen';
                    price4++
                  }
                 
                  if(price4 == 4){
                    component.forEach((Price) => { 
                      if(Price.style.backgroundColor == 'lightgreen'){
                       
                        getEndNum(parseFloat(Price.getAttribute('price')))
                      }
                    })
                  }
                }
              });
            })
      }
      
    




  function getEndNum(Price){
    
    sum += Price;
    num++;
   
    if(num == 4){
      var avg = sum / 4;
			if (avg < 9) {
				avg = 9;
			}
			if (avg >= 100) {
				avg *= 1.15;
			}
			var temp = (avg.toString().indexOf('.') > -1) ? (avg.toString().length - avg.toString().indexOf('.') - 1) : 0;
			if (temp <= 2) {
				for (let index = temp - 1; index > -1; index--) {
					avg = round(avg, index);
				}
			} else {
				avg = Math.round(avg);
			}
      function round(number, precision) {
        return Math.round( + number + 'e' + precision) / Math.pow(10, precision);
      }
      
      navigator.clipboard.writeText(avg)
      chrome.runtime.sendMessage({ condition: true });
    }
  }
}




function opennewTab(ISBNCode){
  var ISBNCode1 = ISBNCode
    chrome.tabs.update({url: "https://search.kongfz.com/product_result/?key="+ISBNCode1[0].result[0]+"&status=0&_stpmt=eyJzZWFyY2hfdHlwZSI6ImFjdGl2ZSJ9&order=1&ajaxdata=4&quality=95h&quaselect=2"});
}

function getISBN() {
  var ISBN;
  const regex = /\d{13}/;
  if(document.querySelector("body > div.main-box > div.main.content > div.main-top.clear-fix > div.major-function-box.clear-fix > div.major-function > div.base-info > div.keywords-define.keywords-define-1000.clear-fix > ul:nth-child(1) > li:nth-child(3) > span.keywords-define-txt")){
    var ISBN1 =  document.querySelector("body > div.main-box > div.main.content > div.main-top.clear-fix > div.major-function-box.clear-fix > div.major-function > div.base-info > div.keywords-define.keywords-define-1000.clear-fix > ul:nth-child(1) > li:nth-child(3) > span.keywords-define-txt").innerHTML; 
  }else if(document.querySelector("body > div.main-box > div.main.content > div.main-bot.clear-fix > div.right-block > ul > li.item-detail-page > div.major-info.clear-fix > div.major-info-main > div.major-info-text > div > ul.detail-list1 > li:nth-child(5) > span")){
    var ISBN1 = document.querySelector("body > div.main-box > div.main.content > div.main-bot.clear-fix > div.right-block > ul > li.item-detail-page > div.major-info.clear-fix > div.major-info-main > div.major-info-text > div > ul.detail-list1 > li:nth-child(5) > span").innerHTML;
  }else if(document.querySelector("body > div.main-box > div.main.content > div.main-bot.clear-fix > div.right-block > ul > li.item-detail-page > div.major-info.clear-fix > div.major-info-main > div.major-info-text > div > ul.detail-list1 > li:nth-child(4) > span")){
    var ISBN1 = document.querySelector("body > div.main-box > div.main.content > div.main-bot.clear-fix > div.right-block > ul > li.item-detail-page > div.major-info.clear-fix > div.major-info-main > div.major-info-text > div > ul.detail-list1 > li:nth-child(4) > span").innerHTML;
  }else if(document.querySelector("body > div.main-box > div.main.content > div.main-bot.clear-fix > div.right-block > ul > li.item-detail-page > div.major-info.clear-fix > div.major-info-main > div.major-info-text > div > ul.detail-list2 > li:nth-child(1) > span")){
    var ISBN1 = document.querySelector("body > div.main-box > div.main.content > div.main-bot.clear-fix > div.right-block > ul > li.item-detail-page > div.major-info.clear-fix > div.major-info-main > div.major-info-text > div > ul.detail-list2 > li:nth-child(1) > span")
  }
    ISBN = ISBN1.match(regex);
    console.log(ISBN)
  return ISBN
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.condition === true) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "hello_extensions.png",
      title: "价格成功复制",
      message: "请注意核实是否正确"
    });
  }
});





let nameSpan = document.querySelector("#name");
let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");
// 个性化欢迎信息设置函数
function setUserName() {
    let myName = prompt('请输入你的名字。');
    if (!myName || myName === null) {
      setUserName();
    } else {
      localStorage.setItem('name', myName);
      myHeading.innerHTML = 'txl X' + myName;
    }
  }


  // 初始化代码：在页面初次读取时进行构造工作：
if (!localStorage.getItem('name')) {
    setUserName();
  } else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent =  storedName+'x TXL';
  }
  
  // 为按钮设置 onclick 事件处理器：
  myButton.onclick = function() {
    setUserName();
  };
  nameSpan.onclick = function () {
    let storedName = localStorage.getItem('name') || '某人';
    if (nameSpan.textContent === "唐馨凌") {
      nameSpan.textContent = "王琛";
      myHeading.textContent = "王琛x " + storedName; // 修改标题
    } else {
      nameSpan.textContent = "唐馨凌";
      myHeading.textContent = "唐馨凌x " + storedName; // 修改标题
    }
  };
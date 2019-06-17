function makePost() {
  var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(1);
  var queryList = queryString.split("&");
  
  var titleArea = document.getElementsByClassName("postspec-title-area")[0];
  var h1 = document.createElement("h1");
  h1.innerHTML = queryList[0].split("=")[1];
  titleArea.appendChild(h1);

  var postInfos = document.getElementsByClassName("postspec-info");
  postInfos[0].innerHTML = queryList[1].split("=")[1];
  postInfos[1].innerHTML = queryList[2].split("=")[1];

  var contentArea = document.getElementsByClassName("postspec-content")[0];
  contentArea.innerHTML = queryList[3].split("=")[1];
}

function makeStr(input) {
  if (input < 10) {
    return "0" + input.toString();
  } else {
    return input.toString();
  }
}

function addComment() {
  var name = document.getElementsByClassName("postspec-comment-name-input")[0].value;
  var content = document.getElementsByClassName("postspec-comment-content-input")[0].value;

  if (name.length == 0) {
    alert("작성자명을 입력해주세요.");
    return;
  } else if (content.length == 0) {
    alert("내용을 입력해주세요.");
    return;
  }

  var tableBody = document.getElementsByClassName("postspec-comment-body")[0];
  var tr = document.createElement("tr");
  tr.setAttribute("class", "postspec-comment-row");

  var td1 = document.createElement("td");
  td1.innerText = name;
  td1.setAttribute("class", "postspec-comment-name");

  var td2 = document.createElement("td");
  td2.innerText = content;
  td2.setAttribute("class", "postspec-comment-content");

  var td3 = document.createElement("td");
  var date = new Date();
  var dateStr = makeStr(date.getFullYear()) + "-" + makeStr(date.getMonth()+1) + "-" + makeStr(date.getDate())
                + " " + makeStr(date.getHours()) + ":" + makeStr(date.getMinutes()) + ":" + makeStr(date.getSeconds()); 
  td3.innerText = dateStr;
  td3.setAttribute("class", "postspec-comment-date");

  tr.append(td1);
  tr.append(td2);
  tr.append(td3);

  tableBody.appendChild(tr);

  document.getElementsByClassName("postspec-comment-name-input")[0].value = "";
  document.getElementsByClassName("postspec-comment-content-input")[0].value = "";
}

window.onload = function() {
  makePost();
}
var jsonData = [
  {
    "title": "안녕하세요!",
    "name": "에부부",
    "date": "2019-06-08 12:04:02"
  },

  {
    "title": "좋은 정보 알려드립니다.",
    "name": "베부부",
    "date": "2019-06-07 11:34:11"
  },

  {
    "title": "요즘 트렌드가",
    "name": "Admin",
    "date": "2019-06-07 02:15:13"
  },

  {
    "title": "혹시 삼성 주식 사신분 있나요?",
    "name": "베부부",
    "date": "2019-06-02 08:55:45"
  },

  {
    "title": "이 사이트 뭐하는 사이트인가요",
    "name": "크와아악",
    "date": "2019-06-02 07:00:01"
  },

  {
    "title": "심심해요",
    "name": "Peaceholic",
    "date": "2019-06-01 14:59:59"
  },

  {
    "title": "자꾸 떨어지네요...",
    "name": "Jjung7",
    "date": "2019-05-30 18:36:18"
  },

  {
    "title": "카카오 주식 빨리 사놔야할듯",
    "name": "Bismute",
    "date": "2019-05-29 01:00:01"
  },

  {
    "title": "으아아아아",
    "name": "지크",
    "date": "2019-05-29 00:02:09"
  },

  {
    "title": "광고 하나만 할게요",
    "name": "noname",
    "date": "2019-05-27 23:56:03"
  },

  {
    "title": "엔씨 빨리 빼길 잘했네요ㅎㅎ",
    "name": "단타충",
    "date": "2019-05-26 21:08:00"
  },

  {
    "title": "반가워요!",
    "name": "Admin",
    "date": "2019-05-26 19:07:57"
  }
];

function makeTable(pageNum) {
  var tableBody = document.getElementsByClassName("community-board-body")[0];
  tableBody.innerHTML = "";
  var page = pageNum;
  var numRow = 10;
  var numPages = jsonData.length/numRow + 1;

  for (var i=numRow*(page-1); i<numRow*page; ++i) {
    if (i >= jsonData.length) {
      break;
    }

    var jsonObj = jsonData[i];

    var tr = document.createElement("tr");
    tr.setAttribute("class", "community-board-row");

    var td1 = document.createElement("td");
    td1.innerText = jsonObj.title;
    td1.setAttribute("class", "community-board-title");

    if (i == 0) {
      td1.setAttribute("onclick", "location.href='postspec.html'")
    }

    var td2 = document.createElement("td");
    td2.innerText = jsonObj.name;
    td2.setAttribute("class", "community-board-name");

    var td3 = document.createElement("td");
    td3.innerText = jsonObj.date;
    td3.setAttribute("class", "community-board-date");

    tr.append(td1);
    tr.append(td2);
    tr.append(td3);

    tableBody.appendChild(tr);
  }

  var pageSection = document.getElementsByClassName("community-pages")[0];
  pageSection.innerHTML = "";
  var outerDiv = document.createElement("div");

  for (var i=1; i<=numPages; ++i) {
    var innerDiv = document.createElement("div");
    innerDiv.setAttribute("class", "community-page-element");
    innerDiv.setAttribute("onclick", "makeTable(" + i.toString() + ")");

    if (i == page) {
      innerDiv.setAttribute("style", "font-weight: bold");
    }

    innerDiv.innerText = i.toString();
    outerDiv.appendChild(innerDiv);
  }

  pageSection.appendChild(outerDiv);
}

window.onload = function() {
  makeTable(1);
}
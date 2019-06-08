function News(link, title) {
  this.link = link;
  this.title = title;

  this.getThumbnailImage = function() {
    if(this.link.indexOf("investing.com") != -1)
      return 'https://d18-invdn-com.akamaized.net/company_logo/8b99f7bb3946d63bb3ff9377040dbd0a.jpg';
    if(this.link.indexOf("biz.chosun") != -1)
      return 'https://jpassets.jobplanet.co.kr/production/uploads/company/logo/93969/large_K-010.png';
    if(this.link.indexOf('fnnews.com') != -1)
      return 'http://www.journalist.or.kr/data/photos/20171251/art_1513751331.jpg';
    if(this.link.indexOf('news.donga') != -1)
      return 'http://web.donga.com/damg/ci.php?file=dongailbo.jpg';
    if(this.link.indexOf('nocutnews.co.kr'))
      return 'https://kmug.co.kr/data/file/data/data_icon_1303718909_%EA%B7%B8%EB%A6%BC_2.png';
    if(this.link.indexOf('mk.co.kr'))
      return 'http://mblogthumb1.phinf.naver.net/MjAxNzA0MDZfMjAg/MDAxNDkxNDU0Mjc5MjU3.ENWzpBelFqCGRt2sCvKncJs78RPFWjq7AY_LIgcLQcwg.9hwHvES51C1y81NV74pLse44YdZEG4oNbpW194r0f60g.JPEG.bestofall95/%EB%A7%A4%EC%9D%BC%EA%B2%BD%EC%A0%9C_mbn.jpg?type=w800';
    if(this.link.indexOf('hani.co.kr'))
      return 'data:image/png;base64,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';
    return 'https://google.com/logos/doodles/2019/2019-womens-world-cup-day-1-5386703364161536-l.png';
  }
}

var viewOption = 'simple'; // simple or detail
var currentPage = 0;
var endPage = 0;
var countPerPage = 6;
var news = [];

// server role
var mockupLinks = [
    "https://kr.investing.com/news/economy-news/article-183381",
    "https://kr.investing.com/news/stock-market-news/article-189845",
    "http://biz.chosun.com/site/data/html_dir/2019/06/03/2019060301106.html",
    "http://m.fnnews.com/news/201906021733292749",
    "http://biz.chosun.com/site/data/html_dir/2019/06/02/2019060201025.html",
    "http://news.donga.com/list/3/01/20190602/95809407/2",
    "http://biz.chosun.com/site/data/html_dir/2019/06/02/2019060200406.html",
    "https://kr.investing.com/news/stock-market-news/article-189199",
    "https://kr.investing.com/news/stock-market-news/article-189100",
    "https://kr.investing.com/news/stock-market-news/article-189058",
    "https://www.nocutnews.co.kr/news/5160255",
    "https://www.mk.co.kr/news/economy/view/2019/05/369424/",
    "http://biz.chosun.com/site/data/html_dir/2019/05/31/2019053100670.html",
    "https://kr.investing.com/news/stock-market-news/article-188446",
    "http://www.hani.co.kr/arti/economy/economy_general/896033.html",
    "https://www.nocutnews.co.kr/news/5159459",
    "https://kr.investing.com/news/economy-news/article-188047",
    "https://kr.investing.com/news/stock-market-news/article-187894",
    "https://www.mk.co.kr/news/stock/view/2019/05/363517/",
    "http://biz.chosun.com/site/data/html_dir/2019/05/29/2019052901847.html",
    "http://biz.chosun.com/site/data/html_dir/2019/05/29/2019052900845.html",
    "http://biz.chosun.com/site/data/html_dir/2019/05/29/2019052900012.html"
];

var mockupTitles = [
    "[초점]코스피 2050 깨지면 무조건 사라…IT·헬스케어 유망",
    "이주열 韓경제, 글로벌 충격 대응력 높여야…정책 개선 필요",
    "삼성엔지니어링, 중동 사업 계약 해지로 7232억원대 중재신청 피소",
    "年 2700억 번 日 인뱅..겨우 적자탈출한 한국",
    "현대차, 중국 판매 코나EV에 中 배터리 탑재…보조금 받기 위한 ‘고육지책’",
    "‘IATA 서울 연차총회’ 개막…대한민국, 세계 항공업계 중심으로 우뚝",
    "LG전자, 에티오피아 청년들 사회진출 돕는다…정보통신·가전 수리기술 전수",
    "중기부·대검·대한상의·중기중앙회, 상생과 공존 ‘공정경제’ 협약",
    "[인터뷰] 민병두 정무위원장 \"공매도 폐지 곤란...선진 시장에선 일반적 투자기법\"",
    "[종목이슈] '회사분할' 현대중공업..시장은 주가상승으로 화답",
    "포스코, WTP제품과 기술력으로 글로벌 에너지강재 시장 공략",
    "우리은행, 7년 연속 '한국 최우수 자금관리 은행' 수상",
    "LG유플러스 대학생 서포터즈 ‘유대감’, 유니브엑스포 참가",
    "[주목! 이 리포트} 화웨이 제재가 한국 업체들에 미칠 영향",
    "“미국 월풀이 우릴 불렀다” LG 세탁기, 미 현지 생산으로 '관세장벽'도전",
    "포스코, 공급사 납품 자재에 대해 선급금 지급 '상생'",
    "빚내 버티는 도소매·숙박음식점…대출 증가 금융위기 이후 최고",
    "KOSPI/KOSDAQ 추가상장 일정. 5월30일 목요일",
    "에이블씨엔씨, 신금투와 손잡고 100억원 자사주 취득…주가부양 의지",
    "현대글로비스, 中 최대 자동차 물류기업 창지우그룹과 업무협약 체결",
    "LG전자, 벡터연구소 창립멤버 ‘다린 그라함' 영입...AI 인재 경쟁 박차",
    "애경, 아시아나항공 인수 속도낸다…삼성증권 등과 논의 시작"
];

// API server role
function loadDetailNews(page) {
  news = [];
  endPage = Math.floor((mockupLinks.length - 1) / countPerPage);
  if(page < 0 || page > endPage)
    return;

  for(var i = page*countPerPage; i < (page+1)*countPerPage; i++) {
    if(i >= mockupLinks.length || i >= mockupTitles.length) break;
    news.push(new News(mockupLinks[i], mockupTitles[i]));
  }
}

function loadSimpleNews() {
  news = [];
  for(var i in mockupLinks) {
    news.push(new News(mockupLinks[i], mockupTitles[i]));
  }
}
////

function changeViewOption(option) {
  viewOption = option;

  $('#news-simple > ul').empty();
  $('#news-detail').empty();
  if(viewOption === 'simple') {
    loadSimpleNews();
    for(var i in news) {
      $('#news-simple > ul').append('<li><a href="'+news[i].link+'" target="_blank">'+news[i].title+'</a></li>');
    }
  } else {
    loadDetailNews(currentPage);
    drawDetailNews();
  }

  $('.news-head-option-item').removeClass('selected');
  $('#news-head-'+option+'-option').addClass('selected');
}

function drawDetailNews() {
  $('#news-detail').empty();
  $("#news-page-container").empty();
  for(var i in news) {
    $('#news-detail').append('<div class="news-card">' +
        '  <div>' +
        '    <a href="'+news[i].link+'" target="_blank">' +
        '      <img class="news-card-img" src="' + news[i].getThumbnailImage() + '" alt="Card image cap">' +
        '    </a>' +
        '  </div>' +
        '  <div class="news-card-body">' +
        '    <a href="'+news[i].link+'" target="_blank">' +
        '      <p class="news-card-text">'+news[i].title+'</p>' +
        '    </a>' +
        '  </div>' +
        '</div>');
  }

  // draw page
  for(var i = 0; i <= endPage; i++) {
    $("#news-page-container").append('<span '+((i==currentPage) ? 'class="selected"' : '')+' onclick="changePage('+i+')">'+(i+1)+'</span>');
  }
}

function changePage(page) {
  currentPage = page;
  loadDetailNews(currentPage);
  drawDetailNews();
}

$(document).ready(function() {
  // changeViewOption('simple');
  changeViewOption('detail');
});

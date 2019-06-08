// Set height of container
let header_bottom = document.getElementById('footer').offsetTop;
let footer_top = document.getElementById('header').getBoundingClientRect().height;
let chart = document.getElementById('chart');
let chart_section = document.getElementsByClassName('chart-section')[0];
let chart_section_first = chart_section.firstElementChild;
let chart_section_first_top = chart_section_first.getBoundingClientRect().height;
let stock_list = document.getElementsByClassName('stock-list')[0];
stock_list.style.height = (header_bottom - footer_top).toString() + 'px';
chart.style.height = (header_bottom - chart_section_first_top - footer_top).toString() + 'px';
chart_section.style.height = (header_bottom - footer_top).toString() + 'px';

let newChartFunction = undefined;

document.addEventListener('DOMContentLoaded', () => {
  $('.stock-list p').click(() => {
    newChartFunction();
  });
});

function changeList(type) {
  let domestic = document.getElementById('domestic');
  let foreign = document.getElementById('foreign');
  if(type === 'domestic') {
    domestic.style.display = 'block';
    foreign.style.display = 'none';
  } else if(type === 'foreign') {
    domestic.style.display = 'none';
    foreign.style.display = 'block';
  }
}

document.getElementById('stock-list-group').addEventListener('change', e => {
  changeList(e.target.value);
});

document.querySelectorAll('.stock-list ul li').forEach((li, k, arr) => {
  li.addEventListener('click', e => {
    newChartFunction();
    let text = e.target.innerText;
    /*
    if(text.length > 5) {
      text = text.substring(0, 5);
      text += '...';
    }
    */
    document.getElementById('cur-stock').innerText = text;
  });
});

am4core.ready(function() {

// Themes begin
  am4core.useTheme(am4themes_moonrisekingdom);
  am4core.useTheme(am4themes_animated);
// Themes end

  let chart = am4core.create("chart", am4charts.XYChart);
  chart.paddingRight = 20;

  chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;

  let series = chart.series.push(new am4charts.CandlestickSeries());
  series.dataFields.dateX = "date";
  series.dataFields.valueY = "close";
  series.dataFields.openValueY = "open";
  series.dataFields.lowValueY = "low";
  series.dataFields.highValueY = "high";
  series.simplifiedProcessing = true;
  series.tooltipText = "Open:{openValueY.value} 원\nLow:{lowValueY.value} 원\nHigh:{highValueY.value} 원\nClose:{valueY.value} ";

  chart.cursor = new am4charts.XYCursor();

// a separate series for scrollbar
  let lineSeries = chart.series.push(new am4charts.LineSeries());
  lineSeries.dataFields.dateX = "date";
  lineSeries.dataFields.valueY = "close";
// need to set on default state, as initially series is "show"
  lineSeries.defaultState.properties.visible = false;

// hide from legend too (in case there is one)
  lineSeries.hiddenInLegend = true;
  lineSeries.fillOpacity = 0.5;
  lineSeries.strokeOpacity = 0.5;

  let scrollbarX = new am4charts.XYChartScrollbar();
  scrollbarX.series.push(lineSeries);
  chart.scrollbarX = scrollbarX;

  let interval = null;
  let lastDate = null;
  function getRandomIntWon(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let val = Math.floor(Math.random() * (max - min + 1)) + min;
    val = Math.floor(val / 100) * 100;
    return val;
  }

  function getData(formattedDate, baseData) {
    let min = Math.ceil(-1);
    let max = Math.floor(1);
    let val = Math.floor(Math.random() * (max - min + 1)) + min;
    let range_small = -1000 + (val === -1 ? -1000 : 0);
    let range_big = 1000 + (val === 1 ? 1000 : 0);
    return {
      'date': formattedDate,
      'open': baseData,
      'high': baseData + getRandomIntWon(range_small, range_big),
      'low': baseData + getRandomIntWon(range_small, range_big),
      'close': baseData + getRandomIntWon(range_small, range_big)
    }
  }

  function generateData(startDate, endDate) {
    let toCustomFormat = d => {
      return `${d.getFullYear()}-${('0' + (d.getMonth() + 1).toString()).slice(-2)}-${('0' + d.getDate().toString()).slice(-2)}`;
    };

    let sd = new Date(startDate);
    let ed = new Date(endDate);

    let newData = [];
    let formattedDate = toCustomFormat(sd);
    let baseData = 10000;
    while(formattedDate <= toCustomFormat(ed)) {
      let data = getData(formattedDate, baseData);
      newData.push(data);
      sd = new Date(sd.setDate(sd.getDate() + 1));
      formattedDate = toCustomFormat(sd);
      baseData = data.close;
    }
    lastDate = sd;
    return newData;
  }

  function toNewChart(name) {
    if(typeof(interval) === 'number') {
      clearInterval(interval);
      interval = null;
    }

    let toCustomFormat = d => {
      return `${d.getFullYear()}-${('0' + (d.getMonth() + 1).toString()).slice(-2)}-${('0' + d.getDate().toString()).slice(-2)}`;
    };

    chart.data = generateData('2019-05-01', '2019-06-13');
    let lastData = chart.data[chart.data.length - 1];
    let start = document.getElementById('cur-stock-start');
    let high = document.getElementById('cur-stock-highest');
    let low = document.getElementById('cur-stock-lowest');
    let end = document.getElementById('cur-stock-end');

    start.innerText = lastData.open;
    high.innerText = lastData.high;
    low.innerText = lastData.low;
    end.innerText = lastData.close;

    interval = setInterval(() => {
      let newData = chart.data;
      let data = getData(toCustomFormat(lastDate), chart.data[chart.data.length - 1].close);
      newData.push(data);
      newData.splice(0, 1);
      chart.data = newData;
      lastDate = new Date(lastDate.setDate(lastDate.getDate() + 1));

      start.innerText = data.open;
      high.innerText = data.high;
      low.innerText = data.low;
      end.innerText = data.close;
    }, 10000);
  }

  toNewChart();
  newChartFunction = toNewChart;
});

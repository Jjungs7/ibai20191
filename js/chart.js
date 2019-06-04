// Set height of container
let header_bottom = document.getElementById('footer').offsetTop;
let footer_top = document.getElementById('header').getBoundingClientRect().height;
let chart = document.getElementById('chart');
let stock_list = document.getElementsByClassName('chart-section')[0];
let stock_list_section = stock_list.firstElementChild;
let stock_list_section_top = stock_list_section.getBoundingClientRect().height;
chart.style.height = (header_bottom - stock_list_section_top - footer_top).toString() + 'px';
stock_list.style.height = (header_bottom - footer_top).toString() + 'px';

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
  series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";

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
  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getData(formattedDate, baseData) {
    return {
      'date': formattedDate,
      'open': baseData,
      'high': baseData + getRandomFloat(-3.0, 3.0),
      'low': baseData + getRandomFloat(-3.0, 3.0),
      'close': baseData + getRandomFloat(-3.0, 3.0)
    }
  }

  function generateData(startDate, endDate) {
    let toCustomFormat = d => {
      return `${d.getFullYear()}-${('0' + (d.getMonth() + 1).toString()).slice(-2)}-${('0' + d.getDate().toString()).slice(-2)}`;
    };

    let getDateDiff = (date1, date2) => {
      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    let sd = new Date(startDate);
    let ed = new Date(endDate);

    let newData = [];
    let formattedDate = toCustomFormat(sd);
    let baseData = 130.00;
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
    interval = setInterval(() => {
      let newData = chart.data;
      let data = getData(toCustomFormat(lastDate), chart.data[chart.data.length - 1].close);
      newData.push(data);
      newData.splice(0, 1);
      chart.data = newData;
      lastDate = new Date(lastDate.setDate(lastDate.getDate() + 1));
    }, 10000);
  }

  toNewChart();

  document.addEventListener('DOMContentLoaded', () => {
    $('.stock-list p').click(() => {
      toNewChart();
    });
  });
});

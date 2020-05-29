define(["../lib/echarts.min", "./utils", "./config"], (echarts, Utils) => {
  return function (layout) {
    class Chart {
      constructor(layout) {
        if (!Chart.instance) {
          this.measureInfo = layout.qHyperCube.qMeasureInfo;
          this.qDimensionInfo = layout.qHyperCube.qDimensionInfo;

          this.dataPages = layout.qHyperCube.qDataPages[0].qMatrix;

          this.option = {};
          this.itemMaxLength = 0;
          //数据总数
          this.total = 0;

          this.measureDataList = [];
          this.meaureNameList = [];
          Chart.instance = this;
        }
        return Chart.instance;
      }

      getItemData(index) {
        return this.dataPages.map(item => {
          return {
            name: item[0].qText,
            value: Utils.myIsNum(item[index + 1].qNum) ? item[index + 1].qNum : 0,
            // value: item[index + 1].qNum,
            dataItem: item[index + 1]
          };
        });
      }

      setTitle() {
        this.option.title = [{
          show: true,
          padding: 20,
          text: layout.SmartWharfPie.pieTitle,
          textStyle: {
            color: layout.SmartWharfPie.fontColor.color,
            fontSize: layout.SmartWharfPie.titleFontSize,
            fontFamily: layout.SmartWharfPie.fontFamily,
            fontWeight: layout.SmartWharfPie.fontWeight
          },
          x: 'center',
        }, {
          show: layout.subTitle,
          text: "*数据集中包含无法在此图标中显示的负值或零值。",
          textStyle: {
            color: layout.SmartWharfPie.fontColor.color,
            fontSize: layout.SmartWharfPie.titleFontSize,
            fontFamily: layout.SmartWharfPie.fontFamily,
            fontWeight: layout.SmartWharfPie.fontWeight
          },
          x: 'center',
          y: 'bottom'
        }]
      }

      setLegend() {
        this.option.legend = {
          type: 'scroll',
          orient: 'vertical',
          y: 'center',
          left: layout.SmartWharfPie.legendHorizontalPosition + '%',
          itemWidth: 8 + layout.SmartWharfPie.fontSize - 7,
          itemHeight: 3 + layout.SmartWharfPie.fontSize - 7,
          align: 'left',
          pageIconColor: 'yellow',
          show: layout.SmartWharfPie.turnLegend,
          textStyle: {
            color: layout.SmartWharfPie.fontColor.color,
            fontSize: layout.SmartWharfPie.fontSize,
            fontFamily: layout.SmartWharfPie.fontFamily
          },

          formatter: name => {

            for (let i = 0; i < this.dataPages.length; i++) {
              if (name == this.getItemData(0)[i].name) {
                let padEndStr = name.padEnd(name.length + (this.itemMaxLength - name.length) * 2 + 4, '\u{2002}');
                console.log(padEndStr);

                let value = Utils.myIsNum(this.getItemData(0)[i].value) ? this.getItemData(0)[i].value : 0;

                let total = Utils.myIsNum(this.total) ? this.total : 0;

                let numPercent = total && total > 0 ? (value / total * 100).toFixed(2) : 0;
                console.log(numPercent);
                return padEndStr + numPercent + '%';
              }
            }
          }
        }
      }

      setTooltip() {
        this.option.tooltip = {
          show: true,
          trigger: 'item',
          formatter(params) {
            var str = params.marker + "" + params.name + "</br>" +
              "数量：" + params.data.value + "</br>" +
              "占比：" + params.percent + "%";
            return str;
          }
        }
      }

      setSeries() {

        var ArrColor = [];
        var mColor = layout.SmartWharfPie.arrColor;
        if (mColor == 'color1') {
          ArrColor = ['#D77728', '#33AFDE', '#5ABB41', '#8462D8', '#EF4C49', '#AB1869', '#FFE150', '#f845f1', '#99afff'];
        } else if (mColor == 'color2') {
          ArrColor = ['#332288', '#117733', '#44AA99', '#88CCEE', '#CC6677', '#DDCC77', '#AA4499', '#f845f1', '#99afff'];
        } else {
          ArrColor = ['#f845f1', '#99afff', '#5045f6', '#45dbf7', '#44aff0', '#6db044', '#ad46f3', '#118ef8', '#fbc123'];
        }

        var qhyperCube = layout.qHyperCube;

        //度量名称列表
        // var meaureNameList = [];
        //度量数据列表
        // var measureDataList = [];

        //数据项名称列表
        var itemList = [];
        $.each(this.measureInfo, (q, v) => {
          var measureName = v.qFallbackTitle;
          this.meaureNameList.push(measureName);
          var data = [];
          this.dataPages.forEach((c, j) => {
            this.total += c[q + 1].qNum;
            itemList.push(c[0].qText);
            var temp = {
              // 数据项的名称
              name: c[0].qText,
              // 数据项值8
              value: c[q + 1].qNum,
              qText: c[q + 1].qText,
              labelLine: {
                show: Utils.myIsNum(c[q + 1].qNum) && c[q + 1].qNum > 0 && layout.SmartWharfPie.showLabel && layout.SmartWharfPie.labelPosition == 'out',
                length: 5,
              },
              itemStyle: {
                normal: {
                  borderWidth: 0.5,
                  borderColor: 'black',
                }
              },
              label: {
                show: Utils.myIsNum(c[q + 1].qNum) && c[q + 1].qNum > 0 && layout.SmartWharfPie.showLabel,
                color: layout.SmartWharfPie.fontColor.color,
                fontSize: layout.SmartWharfPie.fontSize,
                fontFamily: layout.SmartWharfPie.fontFamily,
                position: layout.SmartWharfPie.labelPosition == 'out' ? 'outside' : 'inside',
                distance: 0.1,
                textBorderWidth: 0,
                textShadowBlur: 0,
                formatter: '{b}'
              }
            }

            data.push(temp);
          });
          this.measureDataList[measureName] = data;
        });
        //数组中最长字符串的项
        var itemLengthMax = itemList.reduce((a, b) => {
          return b.length > a.length ? b : a;
        });
        //数组中最长字符串的项的长度
        this.itemMaxLength = itemLengthMax.length;

        this.option = {
          backgroundColor: layout.SmartWharfPie.bgColor,
          color: ArrColor,
          xAxis: {
            show: false
          },
          yAxis: {
            show: false
          },
          dataZoom: [{
            type: 'inside'
          }]
        };

        var series = [];
        $.each(this.meaureNameList, (i, measureName) => {
          var serie = {
            type: 'pie',
            center: layout.SmartWharfPie.turnLegend ? [layout.SmartWharfPie.pieHorizontalCenterPosition + '%', layout.SmartWharfPie.pieVerticalCenterPosition + '%'] : ['50%', '60%'],
            data: this.measureDataList[measureName],
            radius: layout.SmartWharfPie.radiusRange,
            name: layout.SmartWharfPie.pieTitle
          };
          series.push(serie);
        });

        this.option.series = series;
      }

      getOption() {
        this.setSeries();
        this.setTitle();
        this.setLegend();
        this.setTooltip();
        return this.option;
      }
    }

    return new Chart(layout);
  }
});
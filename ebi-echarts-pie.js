/*globals define*/
define([
  "qlik",
  "jquery",
  "./props/properties",
  "./js/chart",
  "./lib/echarts.min",
  "./js/utils",
  "css!./style.css"
], function (qlik, $, props, Chart, echarts, Utits) {
  'use strict';
  return {
    initialProperties: {
      qHyperCubeDef: {
        qDimensions: [],
        qMeasures: [],
        qInitialDataFetch: [{
          qWidth: 10, //dimension + measure length
          qHeight: 50 //row length
        }]
      }
    },
    definition: props, //图形配置项
    support: {
      snapshot: true, //是否可以截图
      export: true, //是否可以导出图片、PDF
      exportData: true //是否可以导出数据
    },
    mounted($element) {
      console.log("mounted......");
      this.options.id = Utits.guid();
      $element
        .children("div")
        .append(
          `<div id='${this.options.id}' class="ebi-ehcarts-pie" style='width:100%;height:100%;box-sizing:border-box'></div>
          <div id='text${this.options.id}' class="ebi-ehcarts-pie-text">未显示图表，因为它仅包含负值或零值。</div>`
        );
      this.ecInstance = echarts.init(document.getElementById(this.options.id));
    },
    prePaint(layout) {
      console.log("prePaint........");
      // console.log(this, layout);
      var chart = new Chart(layout);

      let flag = []
      chart.dataPages.map(item => {
        if (Utits.myIsNum(item[1].qNum)) {
          if (item[1].qNum == 0) {
            flag.push("0")
          } else {
            flag.push("num");
          }
        } else {
          flag.push("NaN");
        }
      });

      var divOut = document.getElementById(this.options.id);
      //未显示图表，因为它仅包含负值或零值。
      if (!flag.includes("num")) {
        $(`#text${this.options.id}`).removeClass("hide").css({
          background: layout.SmartWharfPie.bgColor,
          color: layout.SmartWharfPie.fontColor.color,
          fontSize: layout.SmartWharfPie.titleFontSize,
          fontFamily: layout.SmartWharfPie.fontFamily,
          fontWeight: layout.SmartWharfPie.fontWeight
        }).prev().addClass("hide");
      } else {
        $(`#text${this.options.id}`).addClass("hide").prev().removeClass("hide");
        if (flag.includes("num") && (flag.includes("NaN") || flag.includes("0"))) {
          console.log("*数据集中包含无法在此图标中显示的负值或零值")
          layout.subTitle=true;
        }
        var option = chart.getOption(this);
        this.ecInstance.setOption(option);
      }


    },
    paint: function ($element, layout) {
      console.log("paint....... ");
      // //$element 图形所在的盒子

      this.ecInstance.resize();
    },
    beforeDestroy() {
      console.log("beforeDestroy........");
      this.ecInstance.dispose();
      this.ecInstance = null;
    }
  };
});
define([], function () {

  var pieTitle = {
    ref: "SmartWharfPie.pieTitle",
    label: "标题",
    type: "string",
    defaultValue: "在这里设置标题"
  };

  var titleFontSize = {
    label(data) {
      return `字体大小(${data.SmartWharfPie.titleFontSize}px)`;
    },
    ref: "SmartWharfPie.titleFontSize",
    type: "number",
    component: "slider",
    defaultValue: 12,
    min: 6,
    max: 24
  };

  var fontWeight = {
    label: "字体加粗",
    ref: "SmartWharfPie.fontWeight",
    type: "string",
    component: "buttongroup",
    options: [
      {
        value: "normal",
        label: "常规"
      },
      {
        value: "bold",
        label: "加粗"
      }
    ],
    defaultValue: "normal"
  };

  var fontFamily = {
    type: "string",
    component: "dropdown",
    label: "字体样式",
    ref: "SmartWharfPie.fontFamily",
    options: [
      {
        value: "serif",
        label: "serif"
      },
      {
        value: "monospace",
        label: "monospace"
      },
      {
        value: "Arial",
        label: "Arial"
      },
      {
        value: "Courier New",
        label: "Courier New"
      },
      {
        value: "Microsoft YaHei",
        label: "Microsoft YaHei"
      },
    ],
    defaultValue: "Microsoft YaHei"
  };

  var fontColor = {
    ref: "SmartWharfPie.fontColor",
    label: "字体颜色",
    component: "color-picker",
    type: "integer",
    defaultValue: {
      color: "#ffffff",
      index: "-1"
    }
  };

  var fontSize = {
    label(data) {
      return `字体大小(${data.SmartWharfPie.fontSize}px)`;
    },
    ref: "SmartWharfPie.fontSize",
    type: "number",
    component: "slider",
    defaultValue: 9,
    min: 5,
    max: 20
  };

  var bgColor = {
    ref: "SmartWharfPie.bgColor",
    label: "背景色",
    type: "string",
    defaultValue: "#212123"
  };

  var arrColor = {
    type: "string",
    component: "dropdown",
    label: "配色方案",
    ref: "SmartWharfPie.arrColor",
    options: [{
      value: "color1",
      label: "方案一"
    }, {
      value: "color2",
      label: "方案二"
    }, {
      value: "color3",
      label: "方案三"
    }],
    defaultValue: "color1"
  };

  var turnLegend = {
    type: "boolean",
    component: "switch",
    label: "是否显示图例",
    ref: "SmartWharfPie.turnLegend",
    options: [{
      value: true,
      label: "On"
    }, {
      value: false,
      label: "Off"
    }],
    defaultValue: true
  };

  var legendHorizontalPosition = {
    label(data) {
      return `图例水平位置(${data.SmartWharfPie.legendHorizontalPosition}%)`;
    },
    ref: "SmartWharfPie.legendHorizontalPosition",
    type: "number",
    component: "slider",
    defaultValue: 60,
    min: 0,
    max: 100,
    show: function (data) {
      return data.SmartWharfPie.turnLegend == true;
    }
  };

  var pieHorizontalCenterPosition = {
    label(data) {
      return `水平中心位置(${data.SmartWharfPie.pieHorizontalCenterPosition}%)`;
    },
    ref: "SmartWharfPie.pieHorizontalCenterPosition",
    type: "number",
    component: "slider",
    defaultValue: 25,
    min: 0,
    max: 100,
    show: function (data) {
      return data.SmartWharfPie.turnLegend == true;
    }
  };

  var pieVerticalCenterPosition = {
    label(data) {
      return `垂直中心位置(${data.SmartWharfPie.pieVerticalCenterPosition}%)`;
    },
    ref: "SmartWharfPie.pieVerticalCenterPosition",
    type: "number",
    component: "slider",
    defaultValue: 60,
    min: 0,
    max: 100,
    show: function (data) {
      return data.SmartWharfPie.turnLegend == true;
    }
  };

  var radiusRange = {
    type: "array",
    component: "slider",
    label: "内外环大小",
    ref: "SmartWharfPie.radiusRange",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [0, 65]
  };

  var showLabel = {
    type: "boolean",
    component: "switch",
    label: "显示标签",
    ref: "SmartWharfPie.showLabel",
    options: [{
      value: true,
      label: "On"
    }, {
      value: false,
      label: "Off"
    }],
    defaultValue: true
  };

  var labelPosition = {
    label: "标签位置",
    ref: "SmartWharfPie.labelPosition",
    type: "string",
    component: "buttongroup",
    options: [
      {
        value: "in",
        label: "内"
      },
      {
        value: "out",
        label: "外"
      }
    ],
    defaultValue: "in",
    show: function (data) {
      return data.SmartWharfPie.showLabel;
    }
  };

  var settingSection = {
    component: "expandable-items",
    label: "图表配置项",
    items: {
      通用: {
        type: "items",
        label: "标题设置",
        items: {
          pieTitle: pieTitle,
          titleFontSize: titleFontSize,
          fontWeight: fontWeight
        }
      },
      图例设置: {
        type: "items",
        label: "样式设置",
        items: {
          fontFamily: fontFamily,
          fontColor: fontColor,
          fontSize: fontSize,
          bgColor: bgColor,
          arrColor: arrColor
        }
      },
      演示设置: {
        type: "items",
        label: "图形设置",
        items: {
          turnLegend: turnLegend,
          legendHorizontalPosition: legendHorizontalPosition,
          pieHorizontalCenterPosition: pieHorizontalCenterPosition,
          pieVerticalCenterPosition: pieVerticalCenterPosition,
          radiusRange: radiusRange,
          showLabel: showLabel,
          labelPosition: labelPosition
        }
      }
    }
  }

  return settingSection;
});

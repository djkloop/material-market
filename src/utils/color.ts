const colorHex = function (vColor: any) {
  if (/rgba?/.test(vColor)) {
    var array = vColor.split(",");
    //不符合rgb或rgb规则直接return
    if (array.length < 3)
      return "";
    vColor = "#";
    for (var i = 0, color; color = array[i++];) {
      if (i < 4) {
        //前三位转换成16进制
        color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
        vColor += color.length == 1 ? "0" + color : color;
      } else {
        //rgba的透明度转换成16进制
        color = color.replace(')', '')
        var colorA = parseInt((color * 255).toString());
        var colorAHex = colorA.toString(16);
        vColor += colorAHex;
      }
    }
    vColor = vColor.toUpperCase();
  }
  return vColor;
}


const colorRgba = function (color: string, opactiy: number = 1) {
  var sColor = color.toLowerCase();
  var sColorOpactiy = ''
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return {
      rgba: "rgba(" + sColorChange.join(",") + "," + opactiy + ")",
      rgb: "rgb(" + sColorChange.join(",") + ")"
    };
  }
  return {
    rgba: sColorOpactiy,
    rgb: sColor
  };
};



export {
  colorRgba,
  colorHex
}
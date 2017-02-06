"use strict";
// Author: Krüpl Zsolt <hg2ecz@ham.hu>, 2017

class Deprez {
  constructor(figure) {
    var element=document.getElementById(figure);
    this.c=element.getContext("2d");

    this.height = element.height;
    this.width = element.width;
    this.center = 0.9;
    this.ptrlen = 0.9*this.center;
    this.visibleY = (2*this.center-1)*this.height;
  }

  paint(value, minvalue, maxvalue, scalastep, scalatick, unit) {
    this.c.save();
    this.c.clearRect(0, 0, this.width, this.height);
    this.c.fillStyle="#000000";
    this.c.fillRect(0, this.visibleY, this.width, this.height);


    this.c.beginPath();
    this.c.lineWidth=1;
    this.c.strokeStyle="black";
    this.c.arc(this.width/2, this.height*this.center, this.height*this.ptrlen*.97, (1.5-1/3)*Math.PI, (1.5+1/3)*Math.PI);
    this.c.font="60px Arial";
    this.c.textAlign = "center";
    this.c.fillText(unit, this.width/2, this.height/2);
    this.c.stroke();
    this.c.closePath();

    this.c.beginPath();
    this.c.lineWidth=2;
    this.c.strokeStyle="black";
    for (var i=minvalue; i<=maxvalue; i+=scalatick) {
      var radian = (120*i/(maxvalue-minvalue))/180*Math.PI;
      var x = this.width/2 + this.height*this.ptrlen*.97*Math.sin(radian);
      var y = this.height*(this.center - this.ptrlen*.97*Math.cos(radian));
      this.c.moveTo(x, y);

      var x = this.width/2 + this.height*this.ptrlen*1.0*Math.sin(radian);
      var y = this.height*(this.center - this.ptrlen*1.0*Math.cos(radian));
      this.c.lineTo(x, y);
    }
    this.c.stroke();
    this.c.closePath();

    this.c.beginPath();
    this.c.lineWidth=3;
    this.c.strokeStyle="black";
    this.c.font="20px Arial";
    this.c.textAlign = "center";
    for (var i=minvalue; i<=maxvalue; i+=scalastep) {
      var radian = (120*i/(maxvalue-minvalue))/180*Math.PI;
      var x = this.width/2 + this.height*this.ptrlen*.97*Math.sin(radian);
      var y = this.height*(this.center - this.ptrlen*.97*Math.cos(radian));
      this.c.moveTo(x, y);

      var x = this.width/2 + this.height*this.ptrlen*1.03*Math.sin(radian);
      var y = this.height*(this.center - this.ptrlen*1.03*Math.cos(radian));
      this.c.lineTo(x, y);

      var x = this.width/2 + this.height*this.ptrlen*1.06*Math.sin(radian);
      var y = this.height*(this.center - this.ptrlen*1.06*Math.cos(radian));
      this.c.fillText(i, x, y);
    }
    this.c.stroke();
    this.c.closePath();

    var radian = (120*value/(maxvalue-minvalue))/180*Math.PI;
    var x_start = this.width/2+(this.height*this.center-this.visibleY)*Math.tan(radian);
    var x = this.width/2 + this.height*this.ptrlen*Math.sin(radian);
    var y = this.height*(this.center - this.ptrlen*Math.cos(radian));

    this.c.beginPath();
    this.c.font="40px Arial";
    this.c.textAlign = "center";
    this.c.fillStyle="red";
    this.c.fillText(value.toFixed(2), this.width/2, (this.height+this.visibleY+20)/2);

    this.c.lineWidth=2;
    this.c.strokeStyle="red";
    this.c.moveTo(x_start, this.visibleY);
    this.c.lineTo(x, y);

    this.c.stroke();
    this.c.closePath();

    this.c.restore();
  }
}

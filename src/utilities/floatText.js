export default class floatText {
  constructor(ctx, text) {
    this.ctx = ctx;
    this.text = text;
    this.fade = 0;
    this.visible = false;
  }
  display() {
    this.ctx.font = '14px serif';
    this.ctx.fillStyle = 'black';
    this.refreshInterval = setInterval(() => {
      if (this.fade < 1) {
        this.ctx.clearRect(0, 0, 500, 100);
        this.ctx.fillStyle = `rgb(0,0,0,${this.fade})`;
        this.ctx.fillText(this.text, 25, 35);
        this.fade += 0.1;
      }
      else if (this.fade >= 1) {
        clearInterval(this.refreshInterval);
        this.visible = true;
      }
    }, 50);
  }
  hide() {
    clearInterval(this.refreshInterval);
    this.hideInterval = setInterval(() => {
      this.ctx.clearRect(0, 0, 500, 100);
      this.ctx.fillStyle = `rgb(0,0,0,${this.fade})`;
      this.ctx.fillText(this.text, 25, 35);
      this.fade -= 0.1;
      if (this.fade <= 0) {
        clearInterval(this.hideInterval);
      }
    }, 50);
    this.visible = false;
  }
}
export let floatText = (ctx,text) => {
  ctx.font = '14px serif';
  ctx.fillStyle = 'black';  
  ctx.fillText(text, 25, 35);
  setTimeout(() => {
    let fade = 1;
    let timeOut = setInterval(() => {
      ctx.clearRect(0,0,500,100);
      ctx.fillStyle = `rgb(0,0,0,${fade})`;  
      ctx.fillText(text, 25, 35);
      fade-=0.1;  
      if (fade <= 0) clearInterval(timeOut);
    },25);
  },2000);
};



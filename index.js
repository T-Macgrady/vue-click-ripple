var ripple = {};
ripple.install = function (Vue, options) {
  Vue.prototype.$clickRipple=  function clickRipple(e) {
    var all=document.getElementById(e)
      ?document.getElementById(e)
      :document.getElementsByClassName(e).length!==0
        ?document.getElementsByClassName(e)
        :document.getElementsByTagName(e)
    function remove(ele) {
      if(ele.length==0){
        // console.log("1")
        return
      }
      else {
        ele[0].parentNode.removeChild(ele[0])
        remove(ele)
      }

    }
    function created(ele) {
      var a = document.createElement("canvas")
      var raf;
      var requestAnimFrame = function () {
        return (
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      }()   //判断requestAnimFrame
      if(ele) {
        ele.addEventListener('click', function (ev) {
          var x1 = Math.floor(Math.random() * (255 - 0 + 1) + 0);
          var y1 = Math.floor(Math.random() * (255 - 0 + 1) + 0);
          var z1 = Math.floor(Math.random() * (255 - 0 + 1) + 0);
          var d=document
          var x = ev.offsetX
          var y = ev.offsetY
          var cc = d.getElementsByClassName("canvas-console")
          remove(cc)
          // console.log(x + ":" + y)
          var b = {
            x: x,
            y: x,
            hx: 2,
            radius: 0,
            color: "rgba(" + x1 + "," + y1 + "," + z1 +","+0.2+ ")",
            draw: function () {
              ctx.beginPath()
              ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
              ctx.closePath()
              ctx.fillStyle = this.color;
              ctx.fill()
            }
          } //b
          // 隐藏元素
          var ctx = a.getContext("2d")
          a.style.width = ele.offsetWidth+"px"
          a.style.height = ele.offsetHeight+"px"
          a.className = "canvas-console"
          a.style.position="absolute"
          a.style.left=ele.offsetLeft+"px"
          a.style.top=ele.offsetTop+"px"
          ele.insertBefore(a,ele.childNodes[0])
          a.width = a.offsetWidth + 1
          a.height = a.offsetHeight + 1
          function draw() {
            ctx.clearRect(0, 0, a.width, a.height);
            b.draw()
            raf = window.requestAnimationFrame(draw);
            // console.log(b.radius + ":" + a.width)
            if (b.radius > a.width * 1.5) {
              window.cancelAnimationFrame(raf)
            } else {
              b.radius += b.hx
            }
          }
          draw()
        })
      }
    }
    // console.log(all)
    for(var i=0;i<all.length;i++){
      // console.log(all[i])
      created(all[i])
    }
  }
}
module.exports = ripple;

<template>
  <div class="game2048-body">
    <div class="game2048-readme">
     <span>玩法说明:</span>
     <p>键盘上下左右控制移动，相同格子会累积加起来重叠为新的格子，当所有格子均占有并不能移动游戏结束。回车键或点击重新开始游戏将会重置。</p>
    </div>
    <table class="game2048-tab" cellpadding="6"></table>
    <div class="game2048-restart" @click="restart">重新开始</div>
    <div class="game2048-restart" @click="goback">返回</div>
    <div class="game2048-text" style="font-size:16px;">分数：<span class="game2048-score">  </span> 分</div>
  </div>
</template>

<script>
export default {
  mounted() {
    var json={
      // 创建初始化函数
      init:function(){
        var otab= document.querySelector('.game2048-tab'),
        str = '',
        id = 1;
        for (var i=0; i<4; i++) {
          str+='<tr>';
          for(var j=0;j<4;j++){
            str += '<td class="game2048-td" id="' + id++ +'"></td>';
          }
          str += '</tr>';
        }
        otab.innerHTML=str;
        this.randomNum();
        this.randomNum();
        this.result();
      },
      //创建一个任意区间的随机函数
      myRandom:function(min , max){
        return Math.round(Math.random() * (max-min) + min);
      },
      //随机在格子上生成一个数字
      randomNum : function(){
        var num = this.myRandom(1,16);
        var ogrid = document.getElementById(num);
        if(ogrid.innerHTML ==''){
          ogrid.innerHTML= this.myRandom(1,2)*2;
        }else{
          this.randomNum();
        }
      },
      //上键
      top:function(){
        for(var i=1;i<=4;i++){
          for(var j=i;j<=i+12;j+=4){
            for(var k=j;k>4;k-=4){
              this.change(document.getElementById(k -4),
              document.getElementById(k));
            }
          }
        }
      },
      //下键
      bottom:function(){
        for(var i=1;i<=4;i++){
          for(var j = i+12;j>=i;j -=4){
            for(var k = j;k < 13;k +=4){
              this.change(document.getElementById(k +4),
              document.getElementById(k));
            }
          }
        }
      },
      //左键
      left:function(){
        for(var i=1;i<=13;i+=4){
          for(var j=i; j<= i+3; j++){
            for(var k=j; k>i;k--){
              this.change(document.getElementById(k -1),
              document.getElementById(k));
            }
          }
        }
      },
      //右键
      right:function(){
        for(var i=1;i<=13;i +=4){
          for(var j = i+4; j>=i;j--){
            for(var k=j;k<i+3;k++){
              this.change(document.getElementById(k +1),
              document.getElementById(k));
            }
          }
        }
      },
      //移动合并检测函数
      change :function(before,after){
        //移动
        if(before.innerHTML == '' && after.innerHTML != ''){
          before.innerHTML= after.innerHTML;
          after.innerHTML='';
        }
        //合并
        if (before.innerHTML != '' && before.innerHTML == after.innerHTML) {
          before.innerHTML *=2;
          after.innerHTML='';
        }
      },
      //改变颜色计算结果函数
      result:function(){
        var color={'':'#fff','2':'#0f0','4':'#00ccff','8':'#ff9900',
        '16':'#00cc66','32':'#ffcccc','64':'#ff33ff','128':'#0066cc',
        '256':'#6633cc','512':'#ff0099','1024':'#990033','2048':'#6600ff',
        '4096':'#cc0066'},
        score=0;
        for(var i =  1 ; i <= 16 ;i++){
          var ogrid=document.getElementById(i);
          ogrid.style.backgroundColor=color[ogrid.innerHTML];
          score += ogrid.innerHTML * 10;
        }
        document.querySelector('.game2048-score').innerHTML=score;
      }
    }
    window.onload = json.init();//加载完成后调用init
    document.onkeydown=function(e){
      if(/38/.test(e.keyCode) ) json.top();
      if(/40/.test(e.keyCode) ) json.bottom();
      if(/37/.test(e.keyCode) ) json.left();
      if(/39/.test(e.keyCode) ) json.right();
      if(/13/.test(e.keyCode) ) json.init();
      json.randomNum();
      json.result();
    }
  },
  methods: {
    restart() {
      location.reload()
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const cancel = document.getElementById('cancel');
  
  
  //startボタンを押した時
  start.addEventListener('click', function(){
    let minute = Number(document.getElementById('minute').value);
    let second = Number(document.getElementById('second').value);
    
    //60秒超の秒数なら分追加
    if(second > 60){
      const addMinute = Math.floor(second / 60);
      minute += addMinute;
      second = second % 60;
    }
    
    function showTimer(){
      minute = minute.toString(10);
      second = second.toString(10);
      if(minute.length === 1){
        if(minute < 10){
          minute = 0 + minute;
        }
      }
      if(second.length === 1){ 
        if(second < 10){
            second = 0 + second;
        }
      }
      timer.textContent = `${minute} ： ${second}`;

      //再度数値化。countDownを繰り返す際、数値として計算するため
      minute = Number(minute);
      second = Number(second);
    }
    //初期表示
    showTimer();

    let timeUp = new Audio();
    timeUp.src = 'みどりの風.mp3';

    function stop(){
      if(window.confirm('Time Up!!!')){
        timeUp.pause()
      }
    }

    //1秒毎にカウントダウン
    //1秒毎にTimerの表示を1秒減らす。
    //時間が0になればアラーム音が鳴る。
    function countDown(){
      if(minute === 0 && second === 0){
        return;
      }else if(minute === 0 && second === 1){
        second -= 1;
        showTimer();
        timeUp.play()
        setTimeout(stop, 0)
        clearInterval(countStart)
      }else if(minute >= 1 && second === 0){
        second = 59;
        minute -= 1;
        showTimer();
      }else{
        second -= 1;
        showTimer()
      }
    } 

    let countStart = setInterval(countDown, 1000);
    
    //cancelボタンをクリックでタイマー停止。ダブルクリックでリセット。
    cancel.addEventListener('click', function(){
      clearInterval(countStart);
    })
    
    cancel.addEventListener('dblclick', function(){
      minute = 0;
      second = 0;
      showTimer();
    })
    
  })
  //以上startボタン
  

}
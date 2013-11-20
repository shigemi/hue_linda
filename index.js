//Canvasの設定

var io = new RocketIO().connect("http://linda.masuilab.org");
var linda = new Linda(io);
var ts = new linda.TupleSpace("delta");

io.on("connect", function(){
  alert(io.type+" connect");
});

var canvas = document.getElementById("world");
var ctx = canvas.getContext("2d");
var w = canvas.width = window.innerWidth;
var h = canvas.height = window.innerHeight;

var audioContext = new webkitAudioContext();

//フィルター
filter = audioContext.createBiquadFilter();
filter.type = 0;
filter.frequency.value = 440;
//analyserオブジェクトの生成
var analyser = audioContext.createAnalyser();

init();
/*-----------------------------------
    メイン関数
-----------------------------------*/
function init(){  
    var audioObj = {"audio":true};

    //エラー処理
    var errBack = function(e){
        console.log("Web Audio error:",e.code);
    };
    
    //WebAudioリクエスト成功時に呼び出されるコールバック関数
    function gotStream(stream){
        //streamからAudioNodeを作成
        var mediaStreamSource = audioContext.createMediaStreamSource(stream);

        mediaStreamSource.connect(filter);

        filter.connect(analyser);
        //出力Nodeのdestinationに接続
        analyser.connect(audioContext.destination);
        //mediaStreamSource.connect(audioContext.destination);

       //ループ
        setInterval(Loop, 500);
        Loop();
    }
    //マイクの有無を調べる
    if(navigator.webkitGetUserMedia){
        //マイク使って良いか聞いてくる
        navigator.webkitGetUserMedia(audioObj,gotStream,errBack);
    }else{
        console.log("マイクデバイスがありません");
    }
 }


 function Loop(){
    //Canvasをクリア
     ctx.clearRect(0,0,w,h);
    //背景色
      ctx.fillStyle = "#efefef";
    //背景描画
     ctx.fillRect(0,0,w,h);

    //符号なし8bitArrayを生成
     var data = new Uint8Array(analyser.frequencyBinCount);
    //周波数データ
     analyser.getByteFrequencyData(data);
    //周波数の色
      ctx.fillStyle = "#ccc";
	 
	 
	 ////ここから判定＊＊＊＊
	 
	 
	 
      if(data[400] > 10){
	    ts.write(["hue","0","hsb","65000","200","200"]);   
		}
         else if(data[360] > 10){
	     ts.write(["hue","0","hsb","60000","200","200"]);
	   }
         else if(data[350] > 10){
	      ts.write(["hue","0","hsb","58000","200","200"]);
	   }
        else if (data[340] > 10){
	      ts.write(["hue","0","hsb","55000","200","200"]);
	   }
	    else if(data[330] > 10){
	     ts.write(["hue","0","hsb","53000","200","200"]);
	   }
         else if(data[320] > 10){
	      ts.write(["hue","0","hsb","50000","200","200"]);
	   }
         else if (data[310] > 10){
	      ts.write(["hue","0","hsb","48000","200","200"]);
	   }
        else if(data[300] > 10){
	      ts.write(["hue","0","hsb","45000","200","200"]);
       }
	   　else if(data[290] > 10){
	     ts.write(["hue","0","hsb","42000","200","200"]);
	   }
         else if(data[270] > 10){
	      ts.write(["hue","0","hsb","38000","200","200"]);
	   }
        else if (data[250] > 10){
	      ts.write(["hue","0","hsb","30000","200","200"]);
	   }
        else if(data[230] > 10){
	      ts.write(["hue","0","hsb","28000","200","200"]);
       }
	     else if (data[210] > 10){
	      ts.write(["hue","0","hsb","25000","200","200"]);
	   }
        else if(data[190] > 10){
	      ts.write(["hue","0","hsb","20000","200","200"]);
       }
	   　else if(data[170] > 10){
	     ts.write(["hue","0","hsb","18000","200","200"]);
	   }
         else if(data[150] > 10){
	      ts.write(["hue","0","hsb","13000","200","200"]);
	   }
	     else if (data[120] > 10){
	      ts.write(["hue","0","hsb","8000","200","200"]);
	   }
        else if(data[80] > 10){
	      ts.write(["hue","0","hsb","3000","200","200"]);
       }
        else{
           ts.write(["hue","0","hsb","1000","200","200"]); 
	   }
	 //////ここまで＊＊＊＊
	 

       //グラフ描画
    for(var i = 0; i < data.length; ++i) {
       //上部の描画
        ctx.fillRect(i*5, 0, 5, data[i]);
        //下部の描画
        ctx.fillRect(i*5, h, 5, -data[i]);
   }
}

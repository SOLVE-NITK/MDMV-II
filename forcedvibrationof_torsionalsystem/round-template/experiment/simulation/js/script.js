        var time=0;                                   //Keeps track of the animation time
        var length=100;
        var mass=0.5;                                  //Mass of the system
        var dampingratio=0.01;                        //damping ration
        var g=9.81;
        var wn=Math.sqrt(g/(length/1000));                //Natural Frequency of the system
        var damped_freq=wn*Math.sqrt(1-dampingratio*dampingratio);
        var log_dec=2*Math.PI*dampingratio/Math.sqrt(1-dampingratio*dampingratio);
        var cc=2*mass*wn;
        var forceamp=10;                              //Amplitude of external force
        var forcefreq=6;
        var simTimeId;                                //for animation function
        var pauseTime;                                //Updating variables when animation is paused
        var simstatus;                                //Playing or pausing
        var x=0;                                      //For graph
        var xval;                                     //For Graph
        var start;                                    //Timing for animation
        var end;                                      //Timing for animation
        var diff;                                     //Timing for animation
        var xg=0;                                     //For graph
        var color;                                    //Color for graph
        var graphid;                                  //Graph animation
        var nfreq=damped_freq/wn;
        var stop=0;//for stopping animated graph
        var stop_time=0;
        var initial_angle=0.65;//(15*Math.PI)/180;
        var k = 10;
        var j = 10;
        var offset = 0;
        var n = forcefreq/wn;//X-axis value

        //Function to calculate the displacement
        function displacement(t){
            i=Math.sqrt(1-dampingratio*dampingratio);
            c1 = 0;  //gives the graph an initial displacement
            c2 = wn/i;
            c3 = (forceamp/(k*1000))/Math.sqrt(Math.pow(1-i*i,2)) + Math.pow(2*dampingratio*i,2)*0.5;
            phi = Math.atan(2*dampingratio*i/(1-i*i));
            if(dampingratio==1.0)
		        return (c1 + c2*t*2)*Math.exp(-dampingratio*t*2*wn)*0.5 + c3*Math.exp(wn*t-phi)*0.01;
	          else
		        return (c1*Math.cos(i*wn*t*2)+c2*Math.sin(i*wn*t*2))*Math.exp(-dampingratio*t*2*wn)*0.5 + c3*Math.exp(phi-wn*t)*0.01;
        }
        startgraph=new Date().getTime();

        //Animating Graph
        function graphanimate(){
         graphid=requestAnimationFrame(graphanimate);
            plotgraph();
        }

       //start of simulation here; starts the timer with increments of 0.01 seconds
        function startsim()
        {
            let canvas1=document.getElementById("simscreen");
            let canvas2=document.getElementById("graphscreen");
            let canvas3=document.getElementById("storegraph");
            canvas2.style.visibility="hidden";
            canvas1.style.visibility="visible";
            canvas3.style.visibility="hidden";
            document.getElementById("clearGraph").style.visibility="hidden";
            document.getElementById('playpausebutton').src="./images/blueplaydull.png";
            document.getElementById("titleincanvas").style.visibility="visible";
            pauseTime=setInterval("varupdate();",'100');
            simstatus=1;

        }
        // switches state of simulation between 0:Playing & 1:Paused
        function simstate()
        {
            let imgfilename=document.getElementById('playpausebutton').src;
            imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
            if (imgfilename==="bluepausedull")
            {

                document.getElementById('playpausebutton').src="./images/blueplaydull.png";

             cancelAnimationFrame(simTimeId);
                simstatus=1;
                pauseTime=setInterval("varupdate();",'100');

            }
            if (imgfilename==="blueplaydull")
            {

                document.getElementById('playpausebutton').src="./images/bluepausedull.png";
                simstatus=0;

                clearInterval(pauseTime);
                time=0;
                x=0;
                start=new Date().getTime();
                stop=0;
                stop_time=0;
                offset = 0;
              function animate() {
                   simTimeId = requestAnimationFrame(animate);
                   end=new Date().getTime();
                   diff=0.001*(end-start);
                   start=end;
                   time+=diff;
                  varupdate();
               }
                animate();
            }
        }
        //Initialise system parameters here
        function varinit()
        {

            varchange();
            //Variable slider and number input types
            $('#stiffslider').slider("value", 10); // slider initialisation : jQuery widget
            $('#stiffspinner').spinner("value", 10); // number initialisation : jQuery widget
            $('#massslider').slider("value", 10); // slider initialisation : jQuery widget
            $('#massspinner').spinner("value", 10);
            $('#dampslider').slider("value", 0.01);
            $('#dampspinner').spinner("value", 0.01);
            $('#forcespinner').spinner("value",10);
            $('#frequencyspinner').spinner("value",6);
        }
        function varchange()
        {
            $('#stiffslider').slider({ max : 100, min : 10, step : 0.5 });
            $('#stiffspinner').spinner({ max : 100, min : 10, step : 0.5 });
            $( "#stiffslider" ).on( "slide", function( e, ui ) { $('#stiffspinner').spinner("value",ui.value);});
            $( "#stiffspinner" ).on( "spin", function( e, ui ) { $('#stiffslider').slider("value",ui.value);});
            $( "#stiffspinner" ).on( "change", function() {  varchange()} );

            $('#massslider').slider({ max : 100, min : 10, step : 0.5 });
            $('#massspinner').spinner({ max : 100, min : 10, step : 0.5 });
            $( "#massslider" ).on( "slide", function( e, ui ) { $('#massspinner').spinner("value",ui.value);});
            $( "#massspinner" ).on( "spin", function( e, ui ) { $('#massslider').slider("value",ui.value);});
            $( "#massspinner" ).on( "change", function() {  varchange()} );

            $('#dampslider').slider({ max : 1.0, min : 0.01, step : 0.01 });
            $('#dampspinner').spinner({ max :1.0, min : 0.01, step : 0.01 });
            $( "#dampslider" ).on( "slide", function( e, ui ) { $('#dampspinner').spinner("value",ui.value);x=0;});
            $( "#dampspinner" ).on( "spin", function( e, ui ) { $('#dampslider').slider("value",ui.value);x=0;});
            $( "#dampspinner" ).on( "change", function() {  varchange(); } );

            $('#forcespinner').spinner({ max : 10, min : 1, step : 0.1 });
            $('#frequencyspinner').spinner({ max : 800, min : 0, step : 0.1 });
            $( "#forcespinner" ).on( "change", function() {  varchange()} );
            $( "#frequencyspinner" ).on( "change", function() {  varchange()} );

            varupdate();

        }
        //update slider locationand value and then read input values
        function varupdate(){
            $('#stiffslider').slider("value", $('#stiffspinner').spinner('value')); //updating slider location with change in spinner(debug)
            $('#massslider').slider("value", $('#massspinner').spinner('value'));
            $('#dampslider').slider("value", $('#dampspinner').spinner('value'));
            k=$('#stiffspinner').spinner("value");
            j =$('#massspinner').spinner("value");
            dampingratio=$('#dampspinner').spinner("value");
            wn=Math.sqrt(k/j);
            damped_freq=wn*Math.sqrt(1-dampingratio*dampingratio);
            nfreq=damped_freq/wn;
            log_dec=2*Math.PI*dampingratio/Math.sqrt(1-dampingratio*dampingratio);
            cc=2*Math.sqrt(k*j);
            forceamp=$('#forcespinner').spinner("value");
            forcefreq=$('#frequencyspinner').spinner("value");
            //values in comment box right
            document.getElementById("omega").innerHTML=wn.toFixed(4);
            document.getElementById("damped").innerHTML=damped_freq.toFixed(4);
            document.getElementById("cc").innerHTML=cc.toFixed(4);
            document.getElementById("logdec").innerHTML=log_dec.toFixed(3);
            if(!simstatus){
                //Disabling the slider,spinner and drop down menu
                $('#stiffspinner').spinner("disable");
                $('#stiffslider').slider("disable");
                $('#massspinner').spinner("disable");
                $('#massslider').slider("disable");
                $('#dampspinner').spinner("disable");
                $('#dampslider').slider("disable");
                $('#forcespinner').spinner("disable");
                $('#frequencyspinner').spinner("disable");
            }
            //If simulation is stopped
            if(simstatus)
            {
                $('#stiffspinner').spinner("enable");
                $('#stiffslider').slider("enable");
                $('#massspinner').spinner("enable");
                $('#massslider').slider("enable");
                $('#dampspinner').spinner("enable");
                $('#dampslider').slider("enable");
                $('#forcespinner').spinner("enable");
                $('#frequencyspinner').spinner("enable");
            }
            draw();
        }
        function draw() {
            let canvas = document.getElementById("simscreen");
            let ctx = canvas.getContext("2d");
            if (stop_time==0 && time!=0 && -0.1<displacement(time) && displacement(time)<0.1 && -0.1<displacement(time-0.5) && displacement(time-0.5)<0.1 && -0.1<displacement(time-1) && displacement(time-1)<0.1){
                stop_time=time;//time to stop graph animate
                stop=1;
            }
            ctx.clearRect(0, 0, 550, 400);
            //vertical line draw
            ctx.beginPath();
            ctx.moveTo(30,150);
            ctx.strokeStyle="#000000";
            ctx.lineWidth = 8;
            ctx.lineTo(30,300);
            ctx.lineTo(30,50);
            ctx.stroke();
            //damper horizontal line draw
            ctx.beginPath();
            ctx.moveTo(34,240);
            ctx.strokeStyle="#670090";
            ctx.lineWidth = 4;
            ctx.lineTo(60,240);
            ctx.stroke();
            //draw damper
            ctx.lineTo(60,255);
            ctx.lineTo(150,255);
            ctx.moveTo(60,240);
            ctx.lineTo(60,225);
            ctx.lineTo(150,225);
            ctx.moveTo(90,240);
            ctx.lineTo(90,255);
            ctx.lineTo(90,225);
            ctx.moveTo(90,240);
            ctx.lineTo(200,240);
            ctx.fillStyle = "#bae8fe";
            ctx.fillRect(62,222,86,31);
            ctx.stroke();
            //lower horizontal line draw
            ctx.beginPath();
            ctx.moveTo(34,180);
            ctx.strokeStyle="#c13e3e";
            ctx.lineWidth = 26;
            ctx.lineTo(200,180);
            ctx.stroke();

            //draw curved rectangle
            ctx.beginPath();
            ctx.moveTo(150,150);
            ctx.strokeStyle="#663300";
            ctx.lineWidth = 4;
            ctx.lineTo(150,90);
            CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius)
            {
              if (width < 2 * radius) radius = width / 2;
              if (height < 2 * radius) radius = height / 2;
              this.beginPath();
              this.moveTo(x + radius, y);
              this.arcTo(x + width, y, x + width, y + height, radius);
              this.arcTo(x + width, y + height, x, y + height, radius);
              this.arcTo(x, y + height, x, y, radius);
              this.arcTo(x, y, x + width, y, radius);
              this.closePath();
              return this;
            }
            ctx.fillStyle = "#663300";
            ctx.roundRect(200,100,50,170,10).fill();
            ctx.stroke();
            ctx.closePath();

            //draw side view of torsion below
            ctx.beginPath();
            ctx.moveTo(220,350);
            ctx.fillStyle="#663300"
            ctx.arc(224,350,30,0,2*Math.PI,false);
            ctx.fill();

            //draw animation to indicate rotation
            ctx.beginPath();
            ctx.moveTo(224,350);
            ctx.strokeStyle="green";
            ctx.lineWidth=4;
            phi = displacement(time)*1.5;
            cs = Math.cos(phi);
            sn = Math.sin(phi);
            ctx.lineTo(224+30*sn,340-30*cs);
            ctx.stroke();

            //Displacement graph
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(320, 200);
            ctx.lineTo(320, 340);
            ctx.moveTo(320, 270);
            ctx.lineTo(540, 270);
            ctx.fillStyle="black";
            ctx.font="18px Comic Sans MS";
            ctx.fillText('t',540,270);
            ctx.save();
            ctx.translate(320,245);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Displacement",-90,-10);
            ctx.restore();
            ctx.stroke();
            ctx.beginPath();
			      ctx.moveTo(320, 270-50*1.5*displacement(0.01*offset));
            ctx.strokeStyle="blue";
            x>=220?x=220:x+=100*diff;//have to change this for graph sync
            xval=x;
            if (!simstatus)
            {
                let i=0;
                let cs = 1;
                let sn = 0;
                if(x==220)//to move the graph even after plot has ended
                {
                  offset+=1.6;
                }
                while(i<x){
                  ctx.lineTo(320+i, 270 - 50*1.5*displacement(0.01*(i+offset)));
                  ctx.stroke();
                  i+=0.7;
                }
                xval=x;
            }
            if(simstatus){
                let i=0;
                let cs = 1;
                let sn = 0;
                while(i<xval){
                    ctx.lineTo(320+i, 270 -50*1.5*displacement(0.01*(i+offset)));
                    ctx.stroke();
                    i+=0.7;
                }
          }

          //Force graph
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#000000";
          ctx.moveTo(320, 20);
          ctx.lineTo(320, 170);
          ctx.moveTo(320, 95);
          ctx.lineTo(540, 95);
          ctx.stroke();
          ctx.fillStyle="black";
          ctx.font="18px Comic Sans MS";
          ctx.fillText('t',540,95);
          ctx.save();
          ctx.translate(320,95);
          ctx.rotate(-Math.PI/2);
          ctx.font="18px Comic Sans MS";
          ctx.fillText("Applied Force",-50,-10);
          ctx.restore();
          ctx.beginPath();
          ctx.moveTo(320, 95);
          ctx.strokeStyle="red";
          x>=220?x=220:x+=100*diff;
          if (!simstatus)
          {
              let i=0;
              if(x==220)//to move the graph even after plot has ended
              {
                offset+=1.6;
              }
              while(i<x){
                  ctx.lineTo(320+i, 95 - 5*forceamp * Math.sin(forcefreq*(i+offset)*0.01));
                  ctx.stroke();
                  i+=0.7;
              }
              xval=x;
          }
          if(simstatus){
              let i=0;
              while(i<xval){
                  ctx.lineTo(320+i, 95 - 5*forceamp * Math.sin(forcefreq*(i+offset)*0.01));
                  ctx.stroke();
                  i+=0.7;
              }
          }
    }
    function plotgraph(){
        let canvas=document.getElementById("graphscreen");
        let ctx= canvas.getContext("2d");
        let  ctxgraph=document.getElementById("storegraph").getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.strokeStyle="#000000";
        ctx.arc(350,100, 3, 0, 2 * Math.PI, false);
        ctx.fillText("\u2192 Operating value of \u03B7",365,105);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="#000000";
        ctx.strokeStyle="#000000"
        ctx.lineWidth=1;
        ctx.moveTo(100,0);
        ctx.lineTo(100,230);
        ctx.lineTo(390,230);
        ctx.font='10px Arial';
        for(let i=1;i<8;i++){
            ctx.fillText(i,90,230-i*30);
        }
        ctx.moveTo(100,200);
        ctx.lineTo(390,200);
        ctx.stroke();
        ctx.font="18px Comic Sans MS";
        ctx.fillText("\u03B7",390,230);
        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(-Math.PI/2);
        ctx.fillText("Magnification Factor",0,-130);
        ctx.restore();
        ctxgraph.beginPath()
        ctxgraph.strokeStyle=color;
        ctxgraph.lineWidth=0.5;
        ctxgraph.moveTo(100,230);
        ctxgraph.moveTo(100,200);
        let i=0;
        while(i<xg&&xg<290){
            ctxgraph.lineTo(100+i,230-magnifac(.01*i));
            ctxgraph.stroke();
            i+=0.8;
        }
        ctxgraph.beginPath();
        ctxgraph.strokeStyle = "#000000";
        ctxgraph.lineWidth = 1;
        if(xg>290) {
            let ny = 230 - magnifac(n);
            if (ny <= 0)
                ny = 5;
            ctxgraph.arc(100 + 100 * n, ny, 3, 0, 2 * Math.PI, false);
            ctxgraph.stroke();
        }
        ctx.beginPath();
        ctx.lineWidth=1;
        ctx.strokeStyle="#000000";
        ctx.moveTo(100,250);
        ctx.lineTo(100,400);
        ctx.lineTo(390,400);
        ctx.moveTo(100,250);
        ctx.lineTo(390,250);
        ctx.moveTo(100,325);
        ctx.lineTo(390,325);
        ctx.stroke();
        ctx.save();
        ctx.translate(200,200);
        ctx.rotate(-Math.PI/2);
        ctx.fillText("Phase Angle(\u03A6)",-190,-130);
        ctx.restore();
        ctx.fillText("\u03B7",390,390);
        ctx.font='15px Arial';
        ctx.fillText("0\u00B0",80,400);
        ctx.fillText("90\u00B0",80,325);
        ctx.fillText("180\u00B0",80,250);
        ctx.beginPath();
        ctxgraph.moveTo(100,400);
        ctxgraph.strokeStyle=color;
        ctxgraph.lineWidth=0.5;
        let j=0;
        while(j<xg&&xg<290) {
           ctxgraph.lineTo(100 + j, 400 - phaseangle(0.01 * j));
            ctxgraph.stroke();
            j += 0.8;
        }
        xg+=1;
        ctxgraph.beginPath();
        ctxgraph.strokeStyle = "#000000";
        ctxgraph.lineWidth = 1;
        if(xg<(100+n)) {
            let ny2 = 400 - phaseangle(n);
            ctxgraph.arc(100 + 100 * n, ny2, 3, 0, 2 * Math.PI, false);
            ctxgraph.stroke();
        }
    }

    function magnifac(v){
        let value=1/(Math.sqrt(Math.pow((1-v*v),2)+Math.pow((2*dampingratio*v),2)));
        return 30*value;
    }
    function phaseangle(v) {
        if(v<1) {
            return (75 / (Math.PI / 2)) * Math.atan(2 * dampingratio * v / (1 - v * v));
        }
        if(v>1) {
            return 150+((75 / (Math.PI / 2)) * Math.atan(2 * dampingratio * v / (1 - v * v)));
        }
        if(v==1){
            return 75;
        }
    }

        function changescreen(){
            let canvas1=document.getElementById("simscreen");
            let ctx1=canvas1.getContext("2d");
            let canvas2=document.getElementById("graphscreen");
            let ctx2=canvas2.getContext("2d");
            let canvas3=document.getElementById("storegraph");
            let imgfilename=document.getElementById('graphbutton').src;
            imgfilename = imgfilename.substring(imgfilename.lastIndexOf('/') + 1, imgfilename.lastIndexOf('.'));
            if (imgfilename==="graphbutton")
            {

                document.getElementById('graphbutton').src="./images/bluebkdulls.png";
                canvas2.style.visibility="visible";
                canvas1.style.visibility="hidden";
               canvas3.style.visibility="visible";
                cancelAnimationFrame(simTimeId);
                clearInterval(pauseTime);
                xg=0;
                color='rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
                document.getElementById("clearGraph").style.visibility="hidden";
                document.getElementById("titleincanvas").style.visibility="hidden";
                requestAnimationFrame(graphanimate);
                document.getElementById("playpausebutton").style.visibility="hidden";
                $('#stiffspinner').spinner("disable");
                $('#stiffslider').slider("disable");
                $('#massspinner').spinner("disable");
                $('#massslider').slider("disable");
                $('#dampspinner').spinner("disable");
                $('#dampslider').slider("disable");

            }
            if (imgfilename==="bluebkdulls")
            {
                document.getElementById('graphbutton').src="./images/graphbutton.png";
                cleargraph();
                cancelAnimationFrame(graphid);
                document.getElementById("playpausebutton").style.visibility="visible";
                document.getElementById("clearGraph").style.visibility="hidden";
              startsim();
            }
        }
    function cleargraph(){
            let ctx=document.getElementById("storegraph").getContext("2d");
            ctx.clearRect(0,0,550,440);

    }

        var time=0;                                   //Keeps track of the animation time
        var k1=8;                                    //Stiffness value of the system
        var k2=8;                                    //Stiffness of second spring
        var k_eff=16;
        var mass=32;                                  //Mass of the system
        var dampingratio=0.1;                        //damping ration
        var force_amp=5;
        var force_freq=5;
        var wn=Math.sqrt(k_eff*1000/mass);                //Natural Frequency of the system
        var damped_freq=wn*Math.sqrt(1-dampingratio*dampingratio);
        var log_dec=2*Math.PI*dampingratio/Math.sqrt(1-dampingratio*dampingratio);
        var n=force_freq/wn;                           //ratio of operating frequency to the natural frequency
        var phi =Math.atan(2*dampingratio*n/(1-n*n));
        var rot_freq=5;                                //rotating frquency of unbalanced mass
        var cc=2*mass*wn;
        var base_mass=0.25;                             //mass of the rotating unbalance
        var eccentricity=0.35;                             //eccentricty of base mass
        var simTimeId;                                //for animation function
        var pauseTime;                                //Updating variables when animation is paused
        var simstatus;                                //Playing or pausing
        var x=0;                                      //For graph
        var xf=0;                                     //For graph
        var xval;                                     //For Graph
        var xvalf;                                    //For Graph
        var start;                                    //Timing for animation
        var end;                                      //Timing for animation
        var diff;                                     //Timing for animation
        var xg=0;                                     //For graph
        var color;                                    //Color for graph
        var col;                                      //Color for graph
        var graphid;                                  //Graph animation
        var initdisp=500;
        var nfreq=damped_freq/wn;
        var stop=0;//for stopping animated graph
        var stop_time=0;
        var offset1=0;                                 //For graph animation
        var offset2=0;                                 //For graph animation

        //Function to calculate the displacement
        function displacement(t){
         let value =100000*((force_amp/(k_eff*1000)))/Math.sqrt(Math.pow((1-n*n),2)+Math.pow((2*dampingratio*n),2))*Math.sin(force_freq*t+phi);
         return 0.028*value;
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
                xf=0;
                offset1=0;
                offset2=0;
                start=new Date().getTime();
                stop=0;
                stop_time=0;

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
            $('#stiffslider').slider("value", 8); // slider initialisation : jQuery widget
            $('#stiffspinner').spinner("value", 8); // number initialisation : jQuery widget
            $('#stiffslider2').slider("value", 8); 
            $('#stiffspinner2').spinner("value", 8); 
            $('#massslider').slider("value", 166);
            $('#massspinner').spinner("value", 166);
            $('#dampslider').slider("value", 0.01);
            $('#dampspinner').spinner("value", 0.01);
            $('#force_ampspinner').spinner("value", 5);
            $('#force_freqspinner').spinner("value", 5);
        }
        function varchange()
        {
            $('#stiffslider').slider({ max : 999, min : 8, step : 0.5 });
            $('#stiffspinner').spinner({ max : 999, min : 8, step : 0.5 });

            $( "#stiffslider" ).on( "slide", function( e, ui ) { $('#stiffspinner').spinner("value",ui.value);});
            $( "#stiffspinner" ).on( "spin", function( e, ui ) { $('#stiffslider').slider("value",ui.value);});
            $( "#stiffspinner" ).on( "change", function() {  varchange()} );

            $('#stiffslider2').slider({ max : 999, min : 8, step : 0.5 });
            $('#stiffspinner2').spinner({ max : 999, min : 8, step : 0.5 });

            $( "#stiffslider2" ).on( "slide", function( e, ui ) { $('#stiffspinner2').spinner("value",ui.value);});
            $( "#stiffspinner2" ).on( "spin", function( e, ui ) { $('#stiffslider2').slider("value",ui.value);});
            $( "#stiffspinner2" ).on( "change", function() {  varchange()} );

            $('#massslider').slider({ max : 200, min : 2, step : 0.5 });
            $('#massspinner').spinner({ max : 200, min : 2, step : 0.5 });

            $( "#massslider" ).on( "slide", function( e, ui ) { $('#massspinner').spinner("value",ui.value);});
            $( "#massspinnerr" ).on( "spin", function( e, ui ) { $('#massslider').slider("value",ui.value);});
            $( "#massspinner" ).on( "change", function() {  varchange()} );
            
            $('#dampslider').slider({ max : 1, min : 0.01, step : 0.01 });
            $('#dampspinner').spinner({ max :1, min : 0.01, step : 0.01 });

            $( "#dampslider" ).on( "slide", function( e, ui ) { $('#dampspinner').spinner("value",ui.value);x=0;});
            $( "#dampspinner" ).on( "spin", function( e, ui ) { $('#dampslider').slider("value",ui.value);x=0;});
            $( "#dampspinner" ).on( "change", function() {  varchange(); } );
            $('#force_ampspinner').spinner({ max :20, min : 1, step : 0.5 });
            $('#force_freqspinner').spinner({ max :20, min : 1, step : 0.5 });
            
            varupdate();

        }
        function varupdate(){
            $('#stiffslider').slider("value", $('#stiffspinner').spinner('value')); //updating slider location with change in spinner(debug)
            $('#massslider').slider("value", $('#massspinner').spinner('value'));
            $('#dampslider').slider("value", $('#dampspinner').spinner('value'));
            $('#stiffslider2').slider("value", $('#stiffspinner2').spinner('value'));
            mass=$('#massspinner').spinner("value");
            k1=$('#stiffspinner').spinner("value");
            dampingratio=$('#dampspinner').spinner("value");
            k2=$('#stiffspinner2').spinner("value");
            force_amp=$('#force_ampspinner').spinner("value");
            force_freq=$('#force_freqspinner').spinner("value");
            k_eff=k1+k2;
            n=force_freq/wn;
            wn=Math.sqrt(k_eff*1000/mass);
            damped_freq=wn*Math.sqrt(1-dampingratio*dampingratio);
            nfreq=damped_freq/wn;
            log_dec=2*Math.PI*dampingratio/Math.sqrt(1-dampingratio*dampingratio);
            cc=2*mass*wn;
            phi =Math.atan(2*dampingratio*n/(1-n*n));
            if(n>=0.9 && n<=1.1){
                document.getElementById('commentboxleft').innerHTML="System close to Resonance!";
            }
            else{
                document.getElementById('commentboxleft').innerHTML="";
            }
            document.getElementById("omega").innerHTML=wn.toFixed(3);
            document.getElementById("damped").innerHTML=damped_freq.toFixed(3);
            document.getElementById("cc").innerHTML=cc.toFixed(2);
            document.getElementById("logdec").innerHTML=log_dec.toFixed(3);
            if(!simstatus){
                //Disabling the slider,spinner and drop down menu
                $('#massspinner').spinner("disable");
                $('#massslider').slider("disable");
                $('#stiffspinner').spinner("disable");
                $('#stiffslider').slider("disable");
                $('#stiffspinner2').spinner("disable");
                $('#stiffslider2').slider("disable");
                $('#dampspinner').spinner("disable");
                $('#dampslider').slider("disable");
                $('#force_ampspinner').spinner("disable");
                $('#force_freqspinner').spinner("disable");
            }
            //If simulation is stopped
            if(simstatus)
            {

                $('#massspinner').spinner("enable");
                $('#massslider').slider("enable");
                $('#stiffspinner').spinner("enable");
                $('#stiffslider').slider("enable");
                $('#stiffspinner2').spinner("enable");
                $('#stiffslider2').slider("enable");
                $('#dampspinner').spinner("enable");
                $('#dampslider').slider("enable");
                $('#force_ampspinner').spinner("enable");
                $('#force_freqspinner').spinner("enable");
            }
            draw();
        }
        function draw() {
            let canvas = document.getElementById("simscreen");
            let ctx = canvas.getContext("2d");
            let spring = {
                initsprx: [37, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 225],
                initspry: [150,150, 130, 170, 130, 170, 130, 170, 130, 170, 130, 170, 130, 170, 150, 150],
                sprx: [25, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 225],
                spry: [150,150, 130, 170, 130, 170, 130, 170, 130, 170, 130, 170, 130, 170, 150, 150],
                //draw is for drawing spring
                draw: function () {
                    ctx.beginPath();
                    ctx.strokeStyle = "#c13e3e";
                    ctx.lineWidth = 4;
                    for (let i = 0; i < spring.initspry.length - 1; i++) {
                        ctx.moveTo(spring.sprx[i], spring.spry[i]);
                        ctx.lineTo(spring.sprx[i + 1], spring.spry[i + 1]);
                    }
                    ctx.stroke();
                    ctx.lineWidth = 0.5;
                    ctx.fillStyle = "#003366"
                    for (let i = 0; i < spring.initspry.length; i++) {
                        ctx.beginPath();
                        ctx.arc(spring.sprx[i], spring.spry[i], 5, 0, 2 * Math.PI, false);
                        ctx.fill();
                    }
                }
            };
            if (stop_time==0 && time!=0 && -1<displacement(time) && displacement(time)<1 && -1<displacement(time-0.5) && displacement(time-0.5)<1 && -1<displacement(time-1) && displacement(time-1)<1){
                stop_time=time;//time to stop graph animate
                stop=1;
            }
            
            spring.sprx[15] = spring.initsprx[15] + displacement(time);
            for (let i = 1; i <= 14; i++) {
                spring.sprx[i] = spring.initsprx[i] + (i - 1) / 13 * displacement(time);
            }
            ctx.clearRect(0, 0, 550, 500);
            spring.draw();
            ctx.beginPath();
            ctx.fillStyle = "#663300";
            ctx.fillRect(spring.sprx[15], spring.spry[15] - ((mass - 10) / 10), 110, 70 + (mass - 2) / 5);
            let mass_pos=spring.sprx[15];
            for(let i=0;i<spring.sprx.length;i++){
                spring.initsprx[i]+=300;
                spring.sprx[i]=spring.initsprx[i];
            }
            spring.sprx[0] = spring.initsprx[0] + displacement(time);
            for (let i = 1; i <= 14; i++) {
                spring.sprx[i] = spring.initsprx[i] + (14-i) / 13 * displacement(time);
            }
            spring.draw();
            //lines at end of boundary
            border1_x=[22,12];
            border2_x=[spring.sprx[15]+5,spring.sprx[15]+15];
            border1_y=[135,150,150,165,165,180,180,195,195,210,210,225];
            ctx.fillStyle="#000000";
            ctx.lineWidth=1;
            let it=0;
            while(it<border1_y.length){
                ctx.moveTo(border1_x[it%2],border1_y[it]);
                it+=1;
                ctx.lineTo(border1_x[it%2],border1_y[it]);
                it-=1;
                ctx.stroke();
                ctx.moveTo(border2_x[it%2],border1_y[it]);
                it+=1;
                ctx.lineTo(border2_x[it%2],border1_y[it]);
                ctx.stroke();
                it+=1;
            }
            //first damper
            ctx.fillStyle = "#000000";
            ctx.fillStyle = "#bae8fe";//blue for damper
            ctx.fillRect(55, 185, 130, 40);
            ctx.beginPath();
            ctx.strokeStyle = "#670090";//damper
            ctx.lineWidth = 5;
            ctx.moveTo(22, 205);
            ctx.lineTo(55, 205);
            ctx.moveTo(55, 185);
            ctx.lineTo(55, 225);
            ctx.lineTo(185, 225);
            ctx.moveTo(55, 185);
            ctx.lineTo(185, 185);
            ctx.moveTo(mass_pos-105,210);
            ctx.lineTo(mass_pos-105,200);
            ctx.moveTo(mass_pos,205);
            ctx.lineTo(mass_pos-105,205)
            ctx.stroke();
            //second damper
            ctx.fillStyle = "#bae8fe";
            ctx.fillRect(spring.sprx[15]-150,185, 130, 40);
            ctx.beginPath();
            ctx.moveTo(spring.sprx[15]+5,205);
            ctx.lineTo(spring.sprx[15]-20, 205);
            ctx.moveTo(spring.sprx[15]-20, 185);
            ctx.lineTo(spring.sprx[15]-20, 225);
            ctx.lineTo(spring.sprx[15]-150, 225);
            ctx.moveTo(spring.sprx[15]-20, 185);
            ctx.lineTo(spring.sprx[15]-150, 185);
            ctx.moveTo(mass_pos+110+105,210);
            ctx.lineTo(mass_pos+110+105,200);
            ctx.moveTo(mass_pos+110,205);
            ctx.lineTo(mass_pos+110+105,205)
            ctx.stroke();
            ctx.fillStyle="000000";
            ctx.moveTo(spring.sprx[15]+5,135);
            ctx.lineTo(spring.sprx[15]+5,230);
            ctx.stroke();
            ctx.moveTo(22,135);
            ctx.lineTo(22,230);
            ctx.stroke();
            //Drawing Simulation Graph
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(300, 270);
            ctx.lineTo(300, 470);
            ctx.moveTo(300, 370);
            ctx.lineTo(520, 370);
            ctx.fillStyle="black";
            ctx.font="18px Comic Sans MS";
            ctx.fillText('t',520,395);
            ctx.save();
            ctx.translate(300,375);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Displacement",-50,-10);
            ctx.restore();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(300,370 - 1.5*displacement(0.01*(offset1)));
            ctx.strokeStyle="blue";
            x>=220?x=220:x+=100*diff;
            if (!simstatus)
            {
                let i=0;
                if(x==220){
                    offset1+=6;
                }
                while(i<x){
                    ctx.lineTo(300+i, 370 - 1.5*displacement(0.01*(i+offset1)));
                    ctx.stroke();
                    i+=0.7;
                }
                xval=x;
            }
            x+=1
            if(simstatus){
                i=0;
                while(i<xval){
                    ctx.lineTo(300+i, 370 - 1.5*displacement(0.01*(i+offset1)));
                    ctx.stroke();
                    i+=0.7;
                }
            }

        //Second Graph
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.moveTo(30, 270);
        ctx.lineTo(30, 470);
        ctx.moveTo(30, 370);
        ctx.lineTo(250, 370);
        ctx.stroke();
        ctx.fillStyle="black";
        ctx.font="18px Comic Sans MS";
        ctx.fillText('t',250,395);
        ctx.save();
        ctx.translate(60,375);
        ctx.rotate(-Math.PI/2);
        ctx.font="18px Comic Sans MS";
        ctx.fillText("Applied Force",-50,-38);
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(30, 370 - 5*force_amp * Math.sin(force_freq*(offset2)*0.01));
        ctx.strokeStyle="red";
        xf>=220?xf=220:xf+=100*diff;
            if (!simstatus)
            {
                let i=0;
                if(xf==220){
                    offset2+=6;
                }
                while(i<xf){
                    ctx.lineTo(30+i, 370 - 5*force_amp * Math.sin(force_freq*(i+offset2)*0.01));
                    ctx.stroke();
                    i+=0.7;
                }
                xvalf=xf;
            }
            xf+=1;
            if(simstatus){
                let i=0;
                while(i<xvalf){
                    ctx.lineTo(30+i, 370 - 5*force_amp * Math.sin(force_freq*(i+offset2)*0.01));
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
            ctx.moveTo(70,0);
            ctx.lineTo(70,230);
            ctx.lineTo(360,230);
            ctx.font='10px Arial';
            for(let i=1;i<8;i++){
                ctx.fillText(i,60,230-i*30);
            }
            ctx.moveTo(70,200);
            ctx.lineTo(360,200);
            ctx.stroke();
            ctx.font="18px Comic Sans MS";
            ctx.fillText("\u03B7",360,230);
            ctx.save();
            ctx.translate(170,200);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Magnification Factor",0,-130);
            ctx.restore();
            ctxgraph.beginPath()
            ctxgraph.strokeStyle=color;
            ctxgraph.lineWidth=0.7;
            ctxgraph.moveTo(70,230-0.25*magnifac(0));
            let i=0;
            while(i<xg&&xg<290){
                ctxgraph.lineTo(70+i,230-0.25*magnifac(.01*i));
                ctxgraph.stroke();
                i+=0.8;
            }
            ctxgraph.beginPath();
            ctxgraph.strokeStyle = "#000000";
            ctxgraph.lineWidth = 1;
            if(xg>290) {
                let ny = 230 - 0.25*magnifac(n);
                if (ny <= 0)
                    ny = 5;
                ctxgraph.arc(70 + 100 * n, ny, 3, 0, 2 * Math.PI, false);
                ctxgraph.stroke();
            }
            ctx.beginPath();
            ctx.lineWidth=1;
            ctx.strokeStyle="#000000";
            ctx.moveTo(70,250);
            ctx.lineTo(70,400);
            ctx.lineTo(360,400);
            ctx.moveTo(70,250);
            ctx.lineTo(360,250);
            ctx.moveTo(70,325);
            ctx.lineTo(360,325);
            ctx.stroke();
            ctx.save();
            ctx.translate(170,200);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Phase Angle(\u03A6)",-190,-130);
            ctx.restore();
            ctx.fillText("\u03B7",360,390);
            ctx.font='15px Arial';
            ctx.fillText("0\u00B0",50,400);
            ctx.fillText("90\u00B0",50,325);
            ctx.fillText("180\u00B0",50,250);
            ctx.beginPath();
            ctxgraph.moveTo(70,400);
            ctxgraph.strokeStyle=col;
            ctxgraph.lineWidth=0.7;
            let j=0;
            while(j<xg&&xg<290) {
               ctxgraph.lineTo(70 + j, 400 - phaseangle(0.01 * j));
                ctxgraph.stroke();
                j += 0.8;
            }
			xg+=1;
            ctxgraph.beginPath();
            ctxgraph.strokeStyle = "#000000";
            ctxgraph.lineWidth = 1;
            if(xg<(100+n)) {
                let ny2 = 400 - phaseangle(n);
                ctxgraph.arc(70 + 100 * n, ny2, 3, 0, 2 * Math.PI, false);
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
                col='rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
                document.getElementById("clearGraph").style.visibility="hidden";
                requestAnimationFrame(graphanimate);
                document.getElementById("playpausebutton").style.visibility="hidden";
                $('#massspinner').spinner("disable");
                $('#massslider').slider("disable");
                $('#stiffspinner').spinner("disable");
                $('#stiffslider').slider("disable");
                $('#stiffspinner2').spinner("disable");
                $('#stiffslider2').slider("disable");
                $('#dampspinner').spinner("disable");
                $('#dampslider').slider("disable");
                $('#force_freqspinner').spinner("disable");
                $('#force_ampspinner').spinner("disable");
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
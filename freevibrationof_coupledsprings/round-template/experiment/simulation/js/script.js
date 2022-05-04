        var time=0;                                   //Keeps track of the animation time
        var k1=8;                                    //Stiffness value of the system
        var k2=8;                                    //Stiffness of second spring
        var k_eff=16;
        var mass=32;                                  //Mass of the system
        var dampingratio=0.07;                        //damping ration
        var wn=Math.sqrt(k_eff*1000/mass);                //Natural Frequency of the system
        var damped_freq=wn*Math.sqrt(1-dampingratio*dampingratio);
        var log_dec=2*Math.PI*dampingratio/Math.sqrt(1-dampingratio*dampingratio);
        var rot_freq=5;                                //rotating frquency of unbalanced mass
        var cc=2*mass*wn;
        var base_mass=0.25;                             //mass of the rotating unbalance
        var eccentricity=0.35;                             //eccentricty of base mass
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
        var initdisp=500;
        var nfreq=damped_freq/wn;
        var stop=0;//for stopping animated graph
        var stop_time=0;
        var offset=0;                                 //For graph

        //Function to calculate the displacement
        function displacement(t){
         let value=(Math.exp(-dampingratio*wn*t)*(initdisp*Math.cos(damped_freq*t)+(dampingratio*wn*initdisp*Math.sin(damped_freq*t)/damped_freq)))/10;
         return 0.75*value;
        }
        function base_displacement(t){
            let value=base_mass*eccentricity*rot_freq*rot_freq*Math.sin(rot_freq*t);
            return value;
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
                start=new Date().getTime();
                stop=0;
                stop_time=0;
                offset=0;
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
            
            $('#dampslider').slider({ max : 0.99, min : 0.01, step : 0.01 });
            $('#dampspinner').spinner({ max :0.99, min : 0.01, step : 0.01 });

            $( "#dampslider" ).on( "slide", function( e, ui ) { $('#dampspinner').spinner("value",ui.value);x=0;});
            $( "#dampspinner" ).on( "spin", function( e, ui ) { $('#dampslider').slider("value",ui.value);x=0;});
            $( "#dampspinner" ).on( "change", function() {  varchange(); } );
            
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
            k_eff=k1+k2;
            wn=Math.sqrt(k_eff*1000/mass);
            damped_freq=wn*Math.sqrt(1-dampingratio*dampingratio);
            nfreq=damped_freq/wn;
            log_dec=2*Math.PI*dampingratio/Math.sqrt(1-dampingratio*dampingratio);
            cc=2*mass*wn;
            document.getElementById("omega").innerHTML=wn.toFixed(4);
            document.getElementById("damped").innerHTML=damped_freq.toFixed(4);
            document.getElementById("cc").innerHTML=cc.toFixed(4);
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
            ctx.lineTo(540, 370);
            ctx.fillStyle="black";
            ctx.font="18px Comic Sans MS";
            ctx.fillText('t',540,395);
            ctx.save();
            ctx.translate(300,375);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Displacement",-50,-10);
            ctx.restore();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(300, 370-1.5*displacement(0.01*(offset)));
            ctx.strokeStyle="blue";
            x>=220?x=220:x+=100*diff;//have to change this for graph sync
            if(!simstatus)
            {
                let i=0;
                if(x==220){
                    offset+=4;
                }
                while(i<x){
                    ctx.lineTo(300+i, 370 -1.5*displacement(0.01*(i+offset)));
                    ctx.stroke();
                    i+=0.7;
                }
                xval=x;
            }
            x+=1;
            if(simstatus){
                i=0;
                while(i<xval){
                    ctx.lineTo(300+i, 370 -1.5*displacement(0.01*(i+offset)));
                    ctx.stroke();
                    i+=0.7;
                }
            }
    }
    function amplitude(i){return 20/ Math.sqrt(Math.pow((1 - i * i), 2) + Math.pow((2 * 0.05* i), 2));}
    function plotgraph(){
        let canvas=document.getElementById("graphscreen");
        let ctx= canvas.getContext("2d");
        let ctxgraph=document.getElementById("storegraph").getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.strokeStyle="#000000";
        ctx.beginPath();
        ctx.fillStyle="#000000";
        ctx.strokeStyle="#000000"
        ctx.lineWidth=1;
        ctx.moveTo(40,50);
        ctx.lineTo(40,350);
        ctx.moveTo(40,200)
        ctx.lineTo(200,200);
        ctx.stroke();
        ctx.font="18px Comic Sans MS";
        ctx.save();
        ctx.translate(170,200);
        ctx.rotate(-Math.PI/2);
        ctx.fillText("Displacement",0,-150);
        ctx.restore();
        ctxgraph.beginPath()
        ctxgraph.strokeStyle=color;
        ctxgraph.lineWidth=1;
        ctxgraph.moveTo(40,200-1.5*displacement(0));
        ctx.fillText("Time",200,230);
        let i=0.1;
        while(i<xf&&xf<160){
            ctxgraph.lineTo(40+i,200-1.5*displacement(0.05*i));
            ctxgraph.stroke();
            i+=0.7;
        }
        xf+=1;
        //second graph
        ctx.beginPath();
        ctx.strokeStyle="#000000";/*
        ctx.arc(350,100, 3, 0, 2 * Math.PI, false);
        ctx.fillText("\u2192 Operating value of \u03B7",365,105);
        ctx.stroke();*/
        ctx.beginPath();
        ctx.fillStyle="#000000";
        ctx.strokeStyle="#000000";
        ctx.lineWidth=1;
        ctx.moveTo(330,50);
        ctx.lineTo(330,300);
        ctx.lineTo(550,300);
        ctx.stroke();
        ctx.font="18px Comic Sans MS";
        ctx.save();
        ctx.translate(330,200);
        ctx.rotate(-Math.PI/2);
        ctx.fillText("Amplitude",0,-20);
        ctx.restore();
        ctxgraph.beginPath();
        ctxgraph.strokeStyle=color;
        ctxgraph.lineWidth=0.5;
        ctxgraph.moveTo(330,300-0.9*amplitude(0));
        ctx.fillText("frequency",390,340);
        ctx.font="10px Comic Sans MS";
        ctx.fillText("\u03C9"+"d ="+damped_freq,330+100*nfreq,320);
        i=0.1;
        while(i<xg&&xg<2.9){
            ctxgraph.lineTo(330+100*i,300-0.9*amplitude(i));
            ctxgraph.stroke();
            i+=0.005
        }
        xg+=0.04;
        if (xg>=2.7){
            ctxgraph.beginPath();
            ctxgraph.moveTo(330+100*1,300-0.9*amplitude(1));
            ctxgraph.lineTo(330+100*1,300);
            ctxgraph.strokeStyle="#003366";
            ctxgraph.lineWidth=1;
            ctxgraph.stroke();
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
                xf=0;
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
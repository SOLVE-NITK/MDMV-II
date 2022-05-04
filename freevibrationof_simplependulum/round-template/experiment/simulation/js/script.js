        var time=0;                                   //Keeps track of the animation time
        var length=100;
        var mass=2;                                  //Mass of the system
        var dampingratio=0.01;                        //damping ration
        var g=9.81;
        var wn=Math.sqrt(g/(length/1000));                //Natural Frequency of the system
        var damped_freq=wn*Math.sqrt(1-dampingratio*dampingratio);
        var log_dec=2*Math.PI*dampingratio/Math.sqrt(1-dampingratio*dampingratio);
        var cc=2*mass*wn;                             //critical damping
        var mom_inertia=mass*length*length;           //moment of inertia of bob
        var simTimeId;                                //for animation function
        var pauseTime;                                //Updating variables when animation is paused
        var simstatus;                                //Playing or pausing
        var x=0;                                      //For graph
        var xval;                                     //For Graph
        var start;                                    //Timing for animation
        var end;                                      //Timing for animation
        var diff;                                     //Timing for animation
        var xg=0;                                     //For graph
        var xf=0;                                     //For graph
        var color;                                    //Color for graph
        var col;                                      //COlor for second graph
        var graphid;                                  //Graph animation
        var nfreq=damped_freq/wn;
        var stop=0;//for stopping animated graph
        var stop_time=0;
        var initial_angle=0.164;//(10*Math.PI)/180;
        var offset=0;                                   //For animating graph



        //Function to calculate the displacement
        function displacement(t){
            i=Math.sqrt(dampingratio*dampingratio-1);
            e1 = dampingratio+Math.sqrt(dampingratio*dampingratio-1);
		    e2 = -1*dampingratio+Math.sqrt(dampingratio*dampingratio-1);
            e3 = -1*(dampingratio+Math.sqrt(dampingratio*dampingratio-1));
            
            if(dampingratio<1)
		        return Math.exp(-1 * dampingratio * wn * t) * initial_angle * Math.sin(damped_freq * t);
            else if(dampingratio==1)
		        return Math.exp(-1 * wn * t) *(initial_angle + initial_angle * wn * t);
	        else
		        return (e1 * Math.exp(e2 * wn * t) + e2 * Math.exp(e3 * wn * t)) * initial_angle;
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
            $('#stiffslider').slider("value", 100); // slider initialisation : jQuery widget
            $('#stiffspinner').spinner("value", 100); // number initialisation : jQuery widget
            $('#dampslider').slider("value", 0.01);
            $('#dampspinner').spinner("value", 0.01);
            $('#bobslider').slider("value", 2);
            $('#bobspinner').spinner("value", 2);
        }
        function varchange()
        {
            $('#stiffslider').slider({ max : 600, min : 100, step : 0.5 });
            $('#stiffspinner').spinner({ max : 600, min : 100, step : 0.5 });

            $( "#stiffslider" ).on( "slide", function( e, ui ) { $('#stiffspinner').spinner("value",ui.value);});
            $( "#stiffspinner" ).on( "spin", function( e, ui ) { $('#stiffslider').slider("value",ui.value);});
            $( "#stiffspinner" ).on( "change", function() {  varchange()} );
            $('#dampslider').slider({ max : 1.5, min : 0.01, step : 0.01 });
            $('#dampspinner').spinner({ max :1.5, min : 0.01, step : 0.01 });

            $( "#dampslider" ).on( "slide", function( e, ui ) { $('#dampspinner').spinner("value",ui.value);x=0;});
            $( "#dampspinner" ).on( "spin", function( e, ui ) { $('#dampslider').slider("value",ui.value);x=0;});
            $( "#dampspinner" ).on( "change", function() {  varchange(); } );
            $('#bobslider').slider({ max : 10, min : 2, step : 0.01 });
            $('#bobspinner').spinner({ max :10, min : 2, step : 0.01 });

            $( "#bobslider" ).on( "slide", function( e, ui ) { $('#bobspinner').spinner("value",ui.value);x=0;});
            $( "#bobspinner" ).on( "spin", function( e, ui ) { $('#bobslider').slider("value",ui.value);x=0;});
            $( "#bobspinner" ).on( "change", function() {  varchange(); } );
            varupdate();

        }
        function varupdate(){
            $('#stiffslider').slider("value", $('#stiffspinner').spinner('value')); //updating slider location with change in spinner(debug)
            $('#dampslider').slider("value", $('#dampspinner').spinner('value'));
            $('#bobslider').slider("value", $('#bobspinner').spinner('value'));
            mass=$('#bobspinner').spinner("value");
            g=document.getElementById('number').value;
            document.getElementById('gravity').innerHTML=g;
            length=$('#stiffspinner').spinner("value");
            dampingratio=$('#dampspinner').spinner("value");
            wn=Math.sqrt(g/(length/1000));
            damped_freq=wn*Math.sqrt(1-dampingratio*dampingratio);
            nfreq=damped_freq/wn;
            log_dec=2*Math.PI*dampingratio/Math.sqrt(1-dampingratio*dampingratio);
            cc=2*mass*wn;
            mom_inertia=mass*((length*length)/1000000);
            document.getElementById("omega").innerHTML=wn.toFixed(4);
            document.getElementById("damped").innerHTML=damped_freq.toFixed(4);
            document.getElementById("cc").innerHTML=cc.toFixed(4);
            document.getElementById("logdec").innerHTML=log_dec.toFixed(3);
            if(!simstatus){
                //Disabling the slider,spinner and drop down menu
                $('#stiffspinner').spinner("disable");
                $('#stiffslider').slider("disable");
                $('#dampspinner').spinner("disable");
                $('#dampslider').slider("disable");
                $('#bobspinner').spinner("disable");
                $('#bobslider').slider("disable");
                document.getElementById("number").disabled=true;
            }
            //If simulation is stopped
            if(simstatus)
            {
                document.getElementById("number").disabled=false;
                $('#stiffspinner').spinner("enable");
                $('#stiffslider').slider("enable");
                $('#dampspinner').spinner("enable");
                $('#dampslider').slider("enable");
                $('#bobspinner').spinner("enable");
                $('#bobslider').slider("enable");
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
            ctx.beginPath();
            ctx.strokeStyle="#663300";
            ctx.lineWidth=3;
            ctx.moveTo(100,48);
            ctx.lineTo(205,48);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle="#663300";
            x_base=100;
            for(let i=0;i<7;i++){
                ctx.moveTo(x_base,47);
                ctx.lineTo(x_base+15,34);
                ctx.stroke();
                x_base+=15;
            }
            ctx.beginPath();
            ctx.fillStyle="#003366";
            ctx.moveTo(150,50);
            ctx.arc(150,50,5,0,2*Math.PI,false);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(150,50);
            ctx.lineWidth = 4;
            ctx.strokeStyle="#0066b2";
            ctx.lineTo(150+0.5*length*Math.sin(displacement(time)),50+0.5*length*(Math.cos(displacement(time))));
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle="#663300";
            ctx.arc(150+length*0.5*Math.sin(displacement(time)),50+length*0.5*(Math.cos(displacement(time))), 5*mass, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(320, 100);
            ctx.lineTo(320, 300);
            ctx.moveTo(320, 200);
            ctx.lineTo(540, 200);
            ctx.fillStyle="black";
            ctx.font="18px Comic Sans MS";
            ctx.fillText('t',540,200);
            ctx.save();
            ctx.translate(320,175);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Displacement",-90,-10);
            ctx.restore();
            ctx.stroke();
            ctx.beginPath();
			ctx.moveTo(320, 200);
            ctx.strokeStyle="blue";
             x>=220?x=220:x+=100*diff;
        if (!simstatus)
            {
                let i=0;
                if(x==220){
                    offset+=6;
                }
                while(i<x){
                    ctx.lineTo(320+i, 200 - 50*1.5*displacement(0.01*(i+offset)));
                    ctx.stroke();
                    i+=0.7;
                }
                xval=x;
            }
            x+=1;
            if(simstatus){
                let l=0;
                while(l<xval){
                    ctx.lineTo(320+l, 200 - 50*1.5*displacement(0.01*(l+offset)));
                    ctx.stroke();
                    l+=0.7;
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
            ctxgraph.moveTo(40,200-50*1.5*displacement(0));
            ctx.fillText("Time",200,230);
            let i=0.1;
            while(i<xf&&xf<160){
                ctxgraph.lineTo(40+i,200-100*1.5*displacement(0.05*i));
                ctxgraph.stroke();
                i+=0.7;
            }
            xf+=1;
            //second graph
            ctx.beginPath();
            ctx.strokeStyle="#000000";
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
                $('#stiffspinner').spinner("disable");
                $('#stiffslider').slider("disable");
                $('#dampspinner').spinner("disable");
                $('#dampslider').slider("disable");
                $('#bobspinner').spinner("disable");
                $('#bobslider').slider("disable");
                document.getElementById("number").disabled=true;

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
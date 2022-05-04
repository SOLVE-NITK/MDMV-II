        var time=0;                                   //Keeps track of the animation time
        var k=8;                                    //Stiffness value of the system
        var mass=166;                                  //Mass of the system
        var dampingratio=0.07;                        //damping ration
        var unbalance_mass=10;                              //Amplitude of external force
        var wn=Math.sqrt(k*1000/mass);                //Natural Frequency of the system
        var rot_freq=5;
        var eccentricity=0.35;                        //Eccentricity for rotating unbalance
        var n=rot_freq/wn;                           //ratio of operating frequency to the natural frequency
        var phi =Math.atan(2*dampingratio*n/(1-n*n)); //Mass of the system
        var cc=2*mass*wn;                             //Damping constant
        var simTimeId;                                //for animation function
        var pauseTime;                                //Updating variables when animation is paused
        var simstatus;                                //Playing or pausing
        var x=0;                                      //For graph
        var xf=0;                                     //For graph
        var xg=0;                                     //For graph
        var xvalf;                                    //For graph
        var xval;                                     //For Graph
        var start;                                    //Timing for animation
        var end;                                      //Timing for animation
        var diff;                                     //Timing for animation
        var xg=0;                                     //For graph
        var color;                                    //Color for graph
        var col;                                    //Color for graph
        var graphid;                                  //Graph animation
        var offset1=0;                                //For graph animation
        var offset2=0;                                //For graph animation

        //Function to calculate the displacement
        function displacement(t){
            //let value=1000*(unbalance_mass*rot_freq*rot_freq*eccentricity)/Math.sqrt(Math.pow((k-mass*rot_freq*rot_freq),2)+Math.pow(rot_freq*dampingratio*cc,2))*Math.sin(rot_freq*t+phi);
            let value=50*((((unbalance_mass*eccentricity)/mass)*n*n)/Math.sqrt(Math.pow((1-n*n),2)+Math.pow(2*dampingratio*n,2))*Math.sin(rot_freq*t+phi));
            return value;
        }

        function base_displacement(t){
            let value=displacement(t)*Math.sqrt((Math.pow(1-(n*n),2)+Math.pow(2*dampingratio*n,2))/(1+Math.pow(2*dampingratio*n,2)));
            return 0.75*value;
        }

        function rotating_force(t){
            let value=unbalance_mass*eccentricity*rot_freq*rot_freq*Math.sin(rot_freq*t+phi);
            return 0.01*value;
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
            $('#massslider').slider("value", 166);
            $('#massspinner').spinner("value", 166);
            $('#dampslider').slider("value", 0.01);
            $('#dampspinner').spinner("value", 0.01);
            $('#unbalance_massspinner').spinner("value",10);
            $('#frequencyspinner').spinner("value",6);
        }
        function varchange()
        {
          $('#unbalance_massspinner').spinner({ max : 10, min : 1, step : 0.1 });
          $( "#unbalance_massspinner" ).on( "change", function() {  varchange()} );
          $('#frequencyspinner').spinner({ max : 20, min : 0, step : 0.1 });
          $( "#frequencyspinner" ).on( "change", function() {  varchange()} );


            $('#stiffslider').slider({ max : 999, min : 8, step : 0.5 });
            $('#stiffspinner').spinner({ max : 999, min : 8, step : 0.5 });

            $( "#stiffslider" ).on( "slide", function( e, ui ) { $('#stiffspinner').spinner("value",ui.value);});
            $( "#stiffspinner" ).on( "spin", function( e, ui ) { $('#stiffslider').slider("value",ui.value);});
            $( "#stiffspinner" ).on( "change", function() {  varchange()} );

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

            varupdate();

        }
        function varupdate(){
            $('#stiffslider').slider("value", $('#stiffspinner').spinner('value')); //updating slider location with change in spinner(debug)
            $('#massslider').slider("value", $('#massspinner').spinner('value'));
            $('#dampslider').slider("value", $('#dampspinner').spinner('value'));
            mass=$('#massspinner').spinner("value");
            k=$('#stiffspinner').spinner("value");
            dampingratio=$('#dampspinner').spinner("value");
            unbalance_mass=$('#unbalance_massspinner').spinner("value");
            rot_freq=$('#frequencyspinner').spinner("value");
            wn=Math.sqrt(k*1000/mass);
            phi =Math.atan(2*dampingratio*n/Math.pow(1-n*n,2));
            n=rot_freq/wn;
            document.getElementById("omega").innerHTML=wn.toFixed(4);
            document.getElementById("eta").innerHTML=n.toFixed(4);
            document.getElementById("zeta").innerHTML=dampingratio;
            if(n>0.9 && n<1.1){
                document.getElementById('commentboxleft').innerHTML="System close to Resonance!";
            }
            else{
                document.getElementById('commentboxleft').innerHTML="";
            }
            //If simulation is running
            if(!simstatus){
                //Disabling the slider,spinner and drop down menu
                $('#massspinner').spinner("disable");
                $('#massslider').slider("disable");
                $('#stiffspinner').spinner("disable");
                $('#stiffslider').slider("disable");
                $('#dampspinner').spinner("disable");
                $('#dampslider').slider("disable");
                $('#unbalance_massspinner').spinner("disable");
                $('#frequencyspinner').spinner("disable");
            }
            //If simulation is stopped
            if(simstatus)
            {

                $('#massspinner').spinner("enable");
                $('#massslider').slider("enable");
                $('#stiffspinner').spinner("enable");
                $('#stiffslider').slider("enable");
                $('#dampspinner').spinner("enable");
                $('#dampslider').slider("enable");
                $('#unbalance_massspinner').spinner("enable");
                $('#frequencyspinner').spinner("enable");
            }
            draw();
        }
        function draw() {
            let canvas = document.getElementById("simscreen");
            let ctx = canvas.getContext("2d");
            let spring = {
                initsprx: [90, 90, 110, 70, 110, 70, 110, 70, 110, 70, 110, 70, 110, 70, 90, 90],
                initspry: [360, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 210, 200, 170],
                sprx: [90, 90, 110, 70, 110, 70, 110, 70, 110, 70, 110, 70, 110, 70, 90, 90],
                spry: [360, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 210, 200, 170],
                draw: function () {
                    ctx.beginPath();
                    ctx.strokeStyle = "#c13e3e";
                    ctx.lineWidth = 4;
                    for (let i = 0; i < spring.initsprx.length - 1; i++) {
                        ctx.moveTo(spring.sprx[i], spring.spry[i]);
                        ctx.lineTo(spring.sprx[i + 1], spring.spry[i + 1]);
                    }
                    ctx.stroke();
                    ctx.lineWidth = 0.5;
                    ctx.fillStyle = "#003366"
                    for (let i = 0; i < spring.initsprx.length; i++) {
                        ctx.beginPath();
                        ctx.arc(spring.sprx[i], spring.spry[i], 5, 0, 2 * Math.PI, false);
                        ctx.fill();
                    }
                }
            };
            for (let i = 0; i <= 14; i++) {
                spring.spry[i] = spring.initspry[i] + base_displacement(time);
            }

            spring.spry[15] = spring.initspry[15] + displacement(time);
            for (let i = 3; i <= 14; i++) {
                spring.spry[i] = spring.initspry[i] + (i - 1) / 13 * displacement(time);
            }

            ctx.clearRect(0, 0, 550, 400);
            spring.draw();
            ctx.fillStyle = "#663300";
            ctx.fillRect(60, spring.spry[15] - 50, 180, 50);
            ctx.fillStyle = "#000000";
            ctx.fillRect(30, 360+base_displacement(time), 240, 20);
            ctx.beginPath();
            ctx.strokeStyle = "#670090"
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.fillStyle='#ffffff';
            ctx.arc(150,spring.spry[15]-25,24,2*Math.PI,false);
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle='ff0000';
            ctx.arc(150+20*Math.sin(rot_freq*time),spring.spry[15]-25-20*Math.cos(rot_freq*time),5,2*Math.PI,false);
            ctx.fill();
            ctx.beginPath();
            let offset=base_displacement(time);
            ctx.moveTo(210, 360+offset);
            ctx.lineTo(210, 330+offset);
            ctx.lineTo(190, 330+offset);
            ctx.lineTo(230, 330+offset);
            ctx.lineTo(230, 225+offset);
            ctx.moveTo(192, 330+offset);
            ctx.lineTo(192, 225+offset);
            ctx.stroke();
            ctx.fillStyle = "#bae8fe";
            ctx.fillRect(194, 225+offset, 34, 103);
            ctx.beginPath();
            ctx.strokeStyle = "#670090";
            ctx.moveTo(210, spring.spry[15]);
            ctx.lineTo(210, spring.spry[15] + 100);
            ctx.lineTo(200, spring.spry[15] + 100);
            ctx.lineTo(220, spring.spry[15] + 100);
            ctx.stroke();
            //Drawing Simulation Graph
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
            ctx.moveTo(320, 95-rotating_force(offset1*0.01));
            ctx.strokeStyle="red";
            x>=220?x=220:x+=100*diff;
            if (!simstatus)
            {
                let i=0;
                if(x==220){
                    offset1+=6;
                }
                while(i<x){
                    ctx.lineTo(320+i, 95 - rotating_force((i+offset1)*0.01));
                    ctx.stroke();
                    i+=0.7;
                }
                xval=x;
            }
            x+=1
            if(simstatus){
                i=0;
                while(i<xval){
                    ctx.lineTo(320+i, 95 - rotating_force((i+offset1)*0.01));
                    ctx.stroke();
                    i+=0.7;
                }
            }
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.moveTo(320, 200);
            ctx.lineTo(320, 400);
            ctx.moveTo(320, 300);
            ctx.lineTo(540, 300);
            ctx.fillStyle="black";
            ctx.font="18px Comic Sans MS";
            ctx.fillText('t',540,300);
            ctx.save();
            ctx.translate(320,275);
            ctx.rotate(-Math.PI/2);
            ctx.fillText("Transmitted Force",-90,-10);
            ctx.restore();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(320, 300);
            let val;
            val=0.75*rotating_force(offset2*0.01)*Math.sqrt((Math.pow(1-(n*n),2)+Math.pow(2*dampingratio*n,2))/(1+Math.pow(2*dampingratio*n,2)));
			ctx.moveTo(320, 300-val);
            ctx.strokeStyle="blue";
            xf>=220?xf=220:xf+=100*diff;
            if (!simstatus)
            {
                let i=0;
                if(xf==220){
                    offset2+=6;
                }
                while(i<xf){
                    val=0.75*rotating_force((i+offset2)*0.01)*Math.sqrt((Math.pow(1-(n*n),2)+Math.pow(2*dampingratio*n,2))/(1+Math.pow(2*dampingratio*n,2)));
                    ctx.lineTo(320+i, 300 - val);
                    ctx.stroke();
                    i+=0.7;
                }
                xvalf=xf
            }
            xf+=1;
            if(simstatus){
                let i=0;
                while(i<xvalf){
                    val=0.75*rotating_force((i+offset2)*0.01)*Math.sqrt((Math.pow(1-(n*n),2)+Math.pow(2*dampingratio*n,2))/(1+Math.pow(2*dampingratio*n,2)));
                    ctx.lineTo(320+i, 300 -val);
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
            ctx.strokeStyle="#000000";
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
            ctx.fillText("Transmissibility",0,-130);
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
            ctxgraph.beginPath();
            ctxgraph.strokeStyle = "#000000";
            ctxgraph.lineWidth = 1;
            if(xg<(100+n)) {
                let ny2 = 400 - phaseangle(n);
                ctxgraph.arc(70 + 100 * n, ny2, 3, 0, 2 * Math.PI, false);
                ctxgraph.stroke();
            }
            xg+=1;
        }

        function magnifac(v){
            let value=Math.sqrt((1+Math.pow(2*dampingratio*v,2))/(Math.pow(1-(v*v),2)+Math.pow(2*dampingratio*v,2)));
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
                $('#dampspinner').spinner("disable");
                $('#dampslider').slider("disable");
                $('#unbalance_massspinner').spinner("disable");
                $('#frequencyspinner').spinner("disable");

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
    random_number = quick_draw_data_set();
    function quick_draw_data_set(){
    array_1=['pen','paper','book','bottle']

    random = Math.floor((Math.random()*array_1.length)+1); 
    random_number = array_1[random]
    }
    function updateCanvas(){ 
    background("white");
    random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1);
    console.log(quick_draw_data_set[random_number]);
    Sketch=quick_draw_data_set[random_number];
    document.getElementById("sketch_name").innerHTML="Sketch to be drawn"+Sketch;
    }

    function preload(){
        classifier=ml5.imageClassifier('DoodleNet');
    }
    function setup(){
        canvas=createCanvas(280,280);
        canvas.center();
        background("white");
        canvas.mouseReleased(classifyCanvas);
        synth=window.speechSynthesis;
    }
    function draw(){
        check_sketch();
        if(drawn_Sketch==Sketch){
            answer_holder="set";
            score++;
        document.getElementById("score").innerHTML="score:"+score;
        }
        strokeWeight(13);
        stroke(0);
        if(mouseIsPressed){
            line(pmouseX,pmouseY,pmouseX,pmouseY);
        }   
    }
    function check()
    {
        timer_counter++;
        document.getElementById("time").innerHTML="timer :"+timer_counter;
        console.log(timer_counter);
        if(timer_counter>400)
        {
            timer_counter=0;
            timer_check="completed";
        }
        if(timer_check=="completed" || answer_holder=="set"){
            timer_check="";
            answer_holder="";
            updateCanvas();
        }
        
    }
    function classifyCanvas(){
        classifier.classify(canvas,gotResult);
    }
    function gotResult(error,results){
     if(error){
        console.error(error);
     }
     console.log(results)
     document.getElementById("label").innerHTML="label :"+results[0].label;
     document.getElementById("confidence").innerHTML="confidence :"+Math.round(results[0].confidence*100)+"%";
     document.getElementById("random").innerHTML="Sketech To Be Drawn :"+random_number.random;
     utterThis=new SpeechSynthesisUtterance(results[0].label);
     synth.speak(utterThis);
    }
    function clearCanvas(){
        background("white");
    }
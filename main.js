var random_number = "";
    function quick_draw_data_set(){
    array_1=['pen','paper','book','bottle']

    random = Math.floor((Math.random()*array_1.length)+1); 
    random_number = array_1[random]
    }
    function clearCanvas(){ 
    background("white");
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
        strokeWeight(13);
        stroke(0);
        if(mouseIsPressed){
            line(pmouseX,pmouseY,pmouseX,pmouseY);
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
    
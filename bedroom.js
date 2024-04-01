status=""
objects = [];

function preload(){
    img = loadImage("bedroom_img.jpg");
   }
   
   function setup(){
       canvas = createCanvas(640,420);
       canvas.center();

       objectDetector = ml5.objectDetector("cocossd", modelloaded);
       document.getElementById("status").innerHTML = "Status : Detecting Objects";
   }

   function modelloaded(){
    console.log("modelloaded");
    status=true;
    objectDetector.detect(img, gotResults);
   }

   function gotResults(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        objects = results;
    }
   }

   
   function draw(){
       image(img, 0, 0, 640, 420);
       if(status != ""){
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("red");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
       }
   }
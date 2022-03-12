Status = "";
objects=[];
img = "";

function preload() {
    img = loadImage('car.png');
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
}

function modelloaded() {
    console.log("modelloaded");
    Status = true;
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video , 0 , 0 , 380 , 380);

    if(Status != ""){
        R = random (255);

        G = random (255);
        
        B = random (255);
        objectdetector.detect(video, gotresult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="STATUS : OBJECT DETECTED";
            document.getElementById("number_objects").innerHTML="NUMBER OF OBJECTS DETECTED ARE : "+objects.length;
            fill(R,G,B);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent +"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(R,G,B);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
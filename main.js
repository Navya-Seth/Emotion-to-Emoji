prediction_1 = " ";
prediction_2 = " ";

Webcam.set({
    width : 350 ,
    height : 300 ,
    image_format : 'png' , 
    png_quality : 90  

});

cam = document.getElementById("cam");

Webcam.attach('#cam');

function take_snapshot(){
    Webcam.snap(function(data_uri){
         document.getElementById("result").innerHTML = '<img id = "captured_img" src = "'+data_uri+'"/>'; 
    });
    
}
 
console.log('ml5 version : ' , ml5.version );

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JdXtg6jyf/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prdiction is" + prediction_1;
    speak_data_2 = "And the Second Prdiction is" + prediction_2;
    var utterThis = newSpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
     img = document.getElementById('captured_image'); 
     classifier.classify(img, gotResult);
     }


function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "happy"){
          document.getElementById("update_emoji1").innerHTML = "&#128522;"
        }
    }  

    if(results[0].label == "happy"){
        document.getElementById("update_emoji1").innerHTML = "&#128522;"
      }

      if(results[0].label == "sad"){
        document.getElementById("update_emoji1").innerHTML = "&#128532;"
      }

      if(results[0].label == "angry"){
        document.getElementById("update_emoji1").innerHTML = "&#128545;"
      }


      if(results[1].label == "happy"){
        document.getElementById("update_emoji2").innerHTML = "&#128522;"
      }

      if(results[1].label == "sad"){
        document.getElementById("update_emoji2").innerHTML = "&#128532;"
      }

      if(results[1].label == "angry"){
        document.getElementById("update_emoji2").innerHTML = "&#128545;"
      }
  }  

  

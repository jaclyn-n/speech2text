// define the function- the stop and start converting functions
// get reference to this particular type of element

const resultElement = document.getElementById("result");
// value will be updated multiple times
let recognition;

function startConverting() {
  // add a condition that the users browser actually supports webkit speech condition

  if ("webkitSpeechRecognition" in window) {
    // now the recognition has an object
    recognition = new webkitSpeechRecognition();
    // call the setupRecognition function to set up the recognition object
    setupRecognition(recognition);

    recognition.start();
  }
}

// function to set up the recognition process
function setupRecognition(recognition) {
  // for recognition to continuously listen to  speech of the user
  recognition.continuous = true;

  // to set up recognition on a partial way; two types of recognition-interim and final results
  // interim; listens to the speech of the user simultaneously in real time
  // would listen to my voice and display
  recognition.interimResults = true;
  // to set up the language of the recognition
  recognition.lang = "en-US";

  // on result handler
  recognition.onresult = function (event) {
    // process results function, to accept parameter of event

    const { finalTranscript, interTranscript } = processResults(event.results);
    // now we can update the result element in out HTML element

    resultElement.innerHTML = finalTranscript + interTranscript;
  };
}

function processResults(results) {
  let finalTranscript = "";
  let interTranscript = "";

  // iterate through each recognition result
  // we need to traverse

  for (let i = 0; i < results.length; i++) {
    // get transcript from the result, i-index, -reference 0,
    let transcript = results[i][0].transcript;
    // replace the new line chracter with the HTML line break...so we can format the data
    transcript.replace("\n", "<br>");

    // check if the result is final or interim
    // speech interim get the data when the user is speaking
    // final results handles when the user is not speaking

    if (results[i].isFinal) {
      // concatenate the transcript ot the final transcript
      finalTranscript += transcript;
    } else {
      interTranscript += transcript;
    }
  }
  return { finalTranscript, interTranscript };
}

function stopConverting() {
  if (recognition) {
    recognition.stop();
  }
}

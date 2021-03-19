/* 
 * MQTT-WebClient example for Web-IO 4.0
*/
const hostname = "192.168.33.10";
const port = 9001;
var clientId = "webclient";
clientId += new Date().getUTCMilliseconds();
const username = "cliente1";
const password = "123456";
const subscription = "casa/habitaciones/#";


mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
mqttClient.onMessageArrived =  MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;
Connect();

/*Initiates a connection to the MQTT broker*/
function Connect(){
    mqttClient.connect({
        onSuccess: Connected,
        onFailure: ConnectionFailed,
        keepAliveInterval: 10,
        userName: username,
        useSSL: false,
        password: password
    });
}

/*Callback for successful MQTT connection */
function Connected() {
  console.log("Connected");
  mqttClient.subscribe(subscription);
}

/*Callback for failed connection*/
function ConnectionFailed(res) {
    console.log("Connect failed:" + res.errorMessage);
}

/*Callback for lost connection*/
function ConnectionLost(res) {
  if (res.errorCode != 0) {
    console.log("Connection lost:" + res.errorMessage);
    Connect();
  }
}

/*Callback for incoming message processing */
function MessageArrived(message) {
    console.log(message.destinationName +" : " + message.payloadString);
    switch(message.payloadString){
        case "1":
            displayClass = "on";
            break;
        case "0":
            displayClass = "off";
            break;
        default:
            displayClass = "unknown";
    }
    let topic = message.destinationName.split("/");
    if (topic.length == 4){
        let ioname = topic[2]+"/"+topic[3];
        UpdateElement(ioname, displayClass);
    }
}

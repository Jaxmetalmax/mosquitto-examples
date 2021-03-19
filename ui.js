/* 
 * Web-IO 4.0: MQTT WebSocket example
 */

/* Updates the CSS class of an DOM element */
function UpdateElement(ioname, displayClass){
    let cell = document.getElementById(ioname);
    if (cell){
        cell.className = displayClass;
    }
 } 
 
 const topic = "casa/habitaciones/";

 /* Toggles an input in the web interfaces and 
 * initiates an MQTT publish */
function ToggleOutput(ioname){
    let cell = document.getElementById(ioname);
    switch (cell.className){
    case "on":
        var message = new Paho.MQTT.Message("0");
        message.destinationName = topic+ioname;
        message.retained = true;
        mqttClient.send(message);
        cell.className = "off";
        break;
    case "off":
        var message = new Paho.MQTT.Message("1");
        message.destinationName = topic+ioname;
        message.retained = true;
        mqttClient.send(message);
        //cell.className = "on";
        break;
    default:
        cell.className = "unknown";
        break;
    }
    
};

/* Adds an Click-Event-Listener to a table cell, so that after
 * a click the element can is toggeled */
function EnableToggle(ioname){
        let cell = document.getElementById(ioname)
        if (cell){
            cell.addEventListener("click",
                function(){
                let topic = ioname.split("/");
                if (topic.length == 3) {
                    ToggleOutput(topic[1]+"/"+topic[2])
                }
            }, 
                true);
        }
    }
    
/*Initialize elements that can be toggled my by click*/
EnableToggle("switch/hab1/luz");
EnableToggle("switch/hab2/luz");
EnableToggle("switch/sala/ac");

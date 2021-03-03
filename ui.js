/* 
 * Web-IO 4.0: MQTT WebSocket example
 */

/* Updates the CSS class of an DOM element */
function UpdateElement(ioname, displayClass){
	var cell = document.getElementById(ioname);
	if (cell){
		cell.className = displayClass;
	}
 } 
 
 var topic = "casa/habitaciones/hab1/luz";

 /* Toggles an input in the web interfaces and 
 * initiates an MQTT publish */
function ToggleOutput(ioname){
	var cell = document.getElementById(ioname);
	switch (cell.className){
	case "on":
		var message = new Paho.MQTT.Message("0");
		message.destinationName = topic;
		mqttClient.send(message);
		cell.className = "set_off";
		break;
	case "off":
		var message = new Paho.MQTT.Message("1");
		message.destinationName = topic;
		mqttClient.send(message);
		cell.className = "set_on";
		break;
	default:
		cell.className = "unknown";
		break;
	}
	
};

/* Adds an Click-Event-Listener to a table cell, so that after
 * a click the element can is toggeled */
function EnableToggle(ioname){
		var cell = document.getElementById(ioname)
		if (cell){
			cell.addEventListener("click",
				function(){
				ToggleOutput("hab1")
			}, 
				true);
		}
	}
	
/*Initialize elements that can be toggled my by click*/
EnableToggle("switch");


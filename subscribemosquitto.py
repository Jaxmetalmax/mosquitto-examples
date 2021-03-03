import paho.mqtt.client as mqtt
from termcolor import colored


broker_address = "localhost"
broker_port = 1883
topic = "casa/habitaciones/hab1/luz"

def on_connect(client, userdata, flags, rc):
 print("Connected with result code " + str(rc))
 print("UserData= " + str(userdata))
 print("flags= " + str(flags))
 print("")
 client.subscribe(topic)

def on_message(client, userdata, message):
    decoded_message = str(message.payload.decode("utf-8"))
    print("Mensaje recibido=", decoded_message)
    print(colored ('This is ON \u2588', color='green')) if decoded_message == "1" else print(colored ('This is Off \u2588', color='red'))
    print("Topic=", message.topic)
    print("Nivel de calidad [0|1|2]=", message.qos)
    print("Flag de retencion=", message.retain)
    print("---------------------------------------------")
    print("")

client = mqtt.Client('Cliente1', userdata="UsuarioDePrueba") 
client.username_pw_set('cliente1', password='123456')
client.on_connect = on_connect 
client.on_message = on_message 
client.connect(broker_address, broker_port, 60) 
client.loop_forever()
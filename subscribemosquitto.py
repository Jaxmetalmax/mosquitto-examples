import paho.mqtt.client as mqtt
from termcolor import colored

from os import system

broker_address = "localhost"
broker_port = 1883
TOPIC = "casa/habitaciones/hab1/luz"
TOPIC2 = "casa/habitaciones/hab2/luz"
TOPICAC = "casa/habitaciones/sala/ac"
status_list = {TOPIC: "?", TOPIC2: "?", TOPICAC: "?"}

def on_connect(client, userdata, flags, rc):

 print("Connected with result code " + str(rc))
 print("UserData= " + str(userdata))
 print("flags= " + str(flags))
 print("")
 client.subscribe([(TOPIC,0),(TOPIC2,0),(TOPICAC,0)])

 print("[Habitacion 1]: ? \n[Habitacion 2]: ?\n[AC Sala]: ?\n")

def on_message(client, userdata, message):
    system('clear')
    decoded_message = str(message.payload.decode("utf-8"))
    global status_list
    status_list.update({message.topic: decoded_message})
    print_status()

def print_status():
    habs = {TOPIC: "[Habitacion 1]:", TOPIC2: "[Habitacion 2]:", TOPICAC: "[AC Sala]:"}
    for key,val in status_list.items():
        if val == "1":
            status = "This is ON  \u2588"
            color = "green"
        elif val == "0":
            color = "red"
            status = "This is Off \u2588"
        else:
            color = "white"
            status = "?"
        print(habs[key] + colored (status, color=color ))

client = mqtt.Client('Cliente1', userdata="UsuarioDePrueba") 
client.username_pw_set('cliente1', password='123456')
client.on_connect = on_connect 
client.on_message = on_message 
client.connect(broker_address, broker_port, 60) 
client.loop_forever()
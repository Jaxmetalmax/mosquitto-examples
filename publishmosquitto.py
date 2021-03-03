import paho.mqtt.client as mqtt

broker_address = "localhost"
client = mqtt.Client('Publicador_ejem1') # Creacion del cliente
client.username_pw_set('cliente2', password='123456')
client.connect(broker_address)
topic = "casa/habitaciones/hab1/luz"

while True:
    message = input("Captura 0 para Apagar o 1 para Encender: ") 
    client.publish(topic, str(message))


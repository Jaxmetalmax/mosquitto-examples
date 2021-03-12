import paho.mqtt.client as mqtt


def on_publish(client, userdata, mid):
    print(mid)
    print("mensaje enviado")

broker_address = "localhost"
client = mqtt.Client('Publicador_ejem1') # Creacion del cliente
client.on_publish = on_publish
client.username_pw_set('cliente3', password='123456')
client.connect(broker_address)
topic = "casa/habitaciones/hab1/luz"
#"casa/habitaciones/hab2/luz"
#"casa/habitaciones/sala/ac"

while True:
    message = input("Captura 0 para Apagar o 1 para Encender: ")
    client.publish(topic, str(message))


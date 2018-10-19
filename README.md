# TechnicalTest

Para correr el projecto se necesita lo siguiente.

Este projecto se desarrollo utilizando la versión de Python 3.7.0.

##  Crear el ambiente virtual.

Comando para crear el ambiente virtual

> python3 -m venv <nombre>

Despues entrar a la carpeta que genera y ejecutar el siguiente comando.

Comando para activar el ambiente virtual

## Descargar el projecto de GITHUB

En esta parte debemos de descargar el projecto de GITHUB en la carpeta del ambiente virtual.

## Activar el ambiente virtual

> source <nombre>/bin/activate

##  Instalar paquetes necesarios

Luego de haber inicializado el ambiente virtual. Debemos instalar los requerimientos ejecutando el siguiente comando.

> pip install -r requirements.txt

##  Correr el projecto

Luego de haber instalado los paquetes necesarios debemos de correr el projecto. Utilizando el siguiente comando.

> python manage.py runserver react

la palabra react es debido a que se enlazo el projecto backend con el de frontend, entonces para que compile el backend junto con el frontend se modifico el manage.py agregandole esta condición.


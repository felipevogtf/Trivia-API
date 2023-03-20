<h1  align="center">
Trivia API
</h1>

  

<div  align="center">
Una API para generar trivias, realidazo con Mongoose y Express.
</div>

</br>


![demo](https://raw.githubusercontent.com/felipevogtf/Trivia-API/master/demo.jpg)


## Despliegue en Railway

Cambie las variables de entorno, según corresponda.
```
MONGODB='triviadb'
ACCESS_TOKEN_SECRET='access_token'
REFRESH_TOKEN_SECRET='refresh_token'
```

La variable `APP_URL` contiene el valor por defecto de `${{RAILWAY_STATIC_URL}}`, para obtener la url donde se alojara el proyecto.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/6ld4Z8?referralCode=J3RH01) 

## Documentación

La documentación de la API se realizo mediante Swagger, para ver la documentacion tiene que dirigirse a la ruta: 
```
/api/docs
```

## Instalación 

### Instalar dependencias

```
npm install
```

### Ejecutar proyecto

```
npm start
```

## Configuración

### Variables de entorno

Configure el archivo `.env` para el correcto funcionamiento del proyecto.
```
APP_URL=http://127.0.0.1
PORT=3000

MONGOHOST='mongocluster.mongodb.net'
MONGOPORT=27017
MONGOPASSWORD='password'
MONGOUSER='user'
MONGODB='triviadb'

ACCESS_TOKEN_SECRET='access_token'
REFRESH_TOKEN_SECRET='refresh_token'
```

# Library App

Esta es una aplicación de administracion de libreria construida con Express, React, PostgreSQL y Docker. La aplicación consta de tres servicios principales: un servicio de autenticación, un servicio de inventario y un frontend de React.

## Requisitos

- Docker
- Docker Compose

## Instalación

1. Clona este repositorio:

```
git clone https://github.com/Dalvae/libraryapp.git
```

2. Navega al directorio del proyecto:

```
cd libraryapp
```

3. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias. Puedes usar el archivo `.env.example` como referencia, cambiar las credenciales del administrador y algunos puertos si ya estan en uso.

4. Construye e inicia los contenedores con Docker Compose:

```
docker-compose up -d
```

Esto construirá e iniciará los contenedores para PostgreSQL, el servicio de autenticación, el servicio de inventario y el frontend de React.

## Servicios

### Servicio de Autenticación

El servicio de autenticación maneja la autenticación de usuarios y la generación de tokens JWT. Se encuentra en el directorio `auth-service`.

### Servicio de Inventario

El servicio de inventario maneja el inventario de libros, incluyendo la creación, lectura, actualización y eliminación de libros. Se encuentra en el directorio `inventory-service`.

### Frontend de React

El frontend de React es la interfaz de usuario de la aplicación. Se encuentra en el directorio `front-end`, se basa en un boilerplate de [react-bulletprof](https://github.com/alan2207/bulletproof-react)

## Detener los servicios

Para detener los servicios, ejecuta el siguiente comando:

```
docker-compose down
```

## TODO

- Faltaria agregar la integracion de un buckets3 para las imagenes
- Usar SKU
- Crear un mejor flujo de venta
- Recuperar Items borrados
- El dashboard deberia aportar metricas
  ....

  

# API Criptomonedas Flixxo
El proyecto consta de una API Rest desarrollada con Node.js que permite crear, modificar y listar de diferentes maneras Criptomonedas a una base de datos SQL.
# Dependencias

 - [Typescript](https://www.typescriptlang.org/)
 - [TypeORM](https://typeorm.io/)
 - [mysql2](https://www.npmjs.com/package/mysql2)

 - [Express](https://expressjs.com/es/)
 - [JsonwebToken](https://www.npmjs.com/package/jsonwebtoken)

 # Instalación
Requiere de [Node.js](https://nodejs.org/) para correr el proyecto. Instalar las dependencias e inicializar el server. En el directorio del proyecto ejecutar:

    git clone https://github.com/
    cd miapp
    npm install
    npm run dev

 # Variables de entorno 
Se debe generar el file .env y crear las siguientes variables para el correcto funcionamiento de la base y el encriptación:

 

    TOKEN_SECRET=tokenparaflixxo
    
    PORT={valor de su base de datos}
    
    DATABASE_PORT={valor de su base de datos}
    
    DATABASE_HOST={valor de su base de datos}
    
    DATABASE_USER={valor de su base de datos}
    
    DATABASE_PASSWORD={valor de su base de datos}

 # Endpoints 
 
 ## URL https://api-criptomonedas.onrender.com/
 
## Crear un usuario

`POST /api/auth/signup`

    {
      "email":"frutos.federico@flixxo.com",
      "password":"federico123456"
    }


### Response 
 

    Header response
    auth-token: {tokenValue}
    
        {
          "message": "Usuario creado con exito",
          "user": {
            "id": 8,
            "email": "frutos.federico@flixxo.com"
          }
        }



## Ingresar con un usuario
`POST /api/auth/signin`

    {
	    "email":"frutos.federico@flixxo.com",
	    "password":"federico123456"
    }


### Response 

    { 
    	token: {tokenValue}
    }

 ## Un endpoint público que permita listar los tokens soportados, su nombre y alguna otra información considerada relevante.
 `GET /api/v1/coin`



### Response 

    [
      {
        "id": 1,
        "name": "bitcoin",
        "symbol": "btc",
        "createdAt": "2023-01-09T06:13:05.662Z",
        "currentPrice": [
          {
            "id": 1,
            "updatedAt": "2023-01-09T06:13:05.677Z",
            "currentPrice": 18.25
          }
	     ]
      },
      {
        "id": 2,
        "name": "ethereum",
        "symbol": "eth",
        "createdAt": "2023-01-09T14:03:46.701Z",
        "currentPrice": [
         {
           "id": 8,
           "updatedAt": "2023-01-09T14:03:46.723Z",
           "currentPrice": 10.25
         }
       ]
      }	
    ]

## Un endpoint que permita insertar un registro en la base de datos con la cotización actual de una criptomoneda
`POST /api/v1/coin`

    Header
    auth-token: {tokenValue}
    
    {
      "name":"dogecoin",
      "symbol":"doge",
      "currentPrice": 4.87
    }

### Response 

    {
      "name": "dogecoin",
      "symbol": "doge",
      "id": 7,
      "createdAt": "2023-01-11T00:45:26.863Z"
    }

  
## Un endpoint que permita modificar un registro existente
`PUT /api/v1/coin/:id`

   Header
    auth-token: {tokenValue}
    
    {
      "name":"dogecoin",
      "symbol":"doge",
      "currentPrice": 6.87
    }

### Response 

  Status: **204** No content


## Un endpoint público que permita consultar el último precio de un token

`GET /coin/currentPrice/:id`
    

### Response 

    {
   	  "price": {
   	    "id": 30,
   	    "updatedAt": "2023-01-11T00:46:00.129Z",
   	    "currentPrice": 7.87,
 		    "coin": {
 		      "id": 10,
 		      "name": "apecoin",
 		      "symbol": "ape",
 		      "createdAt": "2023-01-11T00:45:26.863Z"
	    }
   	  }
    }

## Un endpoint público que permita consultar la historia completa de precios de un token

`GET /coin/history/:id`
    

### Response 

    {
      "coin": [
        {
          "id": 10,
          "name": "apecoin",
          "symbol": "ape",
          "createdAt": "2023-01-11T00:45:26.863Z",
          "currentPrice": [
            {
              "id": 30,
              "updatedAt": "2023-01-11T00:46:00.129Z",
              "currentPrice": 7.87
            },
            {
              "id": 29,
              "updatedAt": "2023-01-11T00:45:26.871Z",
              "currentPrice": 4.87
            }
          ]
        }
      ]
    }

## Tablas en la base de datos

### coin

| id | name | symbol | createdAt
|--|--|--|--|
| ... | ...  | ... | ... |

### prices

| id | name | symbol | createdAt
|--|--|--|--|
| ... | ...  | ... | ... |

### user

| id | email| password 
|--|--|--
| ... | ...  | ... 




## ¿Qué es SQL Injection y cómo puede evitarse?

SQL Injection es una técnica que se utiliza para inyectar consultas SQL en las entradas de la aplicación para luego ser ejecutadas en la base de datos. Si no se tiene precaución y estas consultas llegan a la base podrían llegar a robar datos sensibles desde la base de datos. 
Actualmente existen diferentes maneras de prevenir SQL Injection, algunas de ellas son:

 - Validar todas las entradas de datos de los usuarios
 - Utilizar consultas parametrizadas
 - Utilizar procedimientos almacenados

## ¿Cuándo es conveniente utilizar SQL Transactions? Dar un ejemplo.
Es conveniente utilizar SQL Transactions cuando necesitamos ejecutar un conjunto de acciones en las que necesitamos que se ejecuten todas de ellas o ninguna. 

 Pensando en la idea del proyecto, se me ocurre como ejemplo la compra de una criptomoneda, pensándolo en alto nivel. Para que la compra sea exitosa se debe evaluar que el usuario tenga el saldo para efectuarla, que sus datos sean válidos, comprobar los datos de la cuenta del vendedor y que cuente con la criptomoneda para poder realizar la transacción, si todos estas acciones están correctas se efectúa la transacción, caso contrario, fallan en conjunto. 

## Describí brevemente las ventajas del patrón controller/service/repository

La ventaja del patron controller/service/repository es que realiza una separacion muy simple de responsabilidades permitiendonos tener un codigo más prolijo y facil de escalar. 
Teniendo la capa de Controller nos permite exponer la funcionabilidad para que pueda ser consumida por entidades externas, la capa de Service se encarga de manejar la lógica de negocio y en caso que esta lógica necesite obtener o crear registros en la base de datos, se puede comunicar con la capa Repository, que esta es la única encargada de almacenar o cargar un algún conjunto de datos. 

## ¿Cuál es la mejor forma de guardar un campo de tipo enum en la DB?

La mejor manera es generar un campo de tipo enum en la tabla y en la declaración especificarle los valores que se pueden enviar. De esta manera nos aseguramos que únicamente uno de esos valores van a estar cargados en los registros, caso contrario no se guardar en la base de datos. 


## Usando async/await: ¿cómo se puede aprovechar el paralelismo?

Para aprovechar el paralelismo de async/await podemos declarar la función como async y ejecutar las distintas promesas en conjunto dentro de un Promise.all() y a este agregarle el await en su llamado para que una vez que se hayan ejecutado todas las promesas guardar el resultado. Esto nos permite ejecutar varias funciones en conjunto y aprovechar el paralelismo. 


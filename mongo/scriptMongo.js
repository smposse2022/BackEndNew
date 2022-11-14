/*
use ecommerce - Crea la base de datos y la selecciono para utilizar

db.mensajes.insertMany([{username: "Santiago", message: "hola, qué tal", timestramp: "09/11/2022 17:40"},{username: "Maxi", message: "hola", timestramp: "09/11/2022 17:40"},{username: "Joana", message: "hola, cómo va", timestramp: "09/11/2022 17:40"}, {username: "Alejandro", message: "hola", timestramp: "09/11/2022 17:40"},{username: "Andrea", message: "Todo bien?", timestramp: "09/11/2022 17:40"},{username: "Gustavo", message: "tranquilo?", timestramp: "09/11/2022 17:40"},{username: "Matias", message: "Qué tal?", timestramp: "09/11/2022 17:40"}, {username: "Pedro", message: "Cómo están?", timestramp: "09/11/2022 17:40"}, {username: "José", message: "Buenas", timestramp: "09/11/2022 17:40"}, {username: "Florencia", message: "Holaaaaaa", timestramp: "09/11/2022 17:40"}]) - Cargo datos a la colección mensajes

db.productos.insertMany([{title: "Remera Verde Lisa", price: 2500, thumbnail:"https://d3ugyf2ht6aenh.cloudfront.net/stores/111/097/products/_mg_17161-dfec26ebd336d0efc616577498111535-1024-1024.jpg"},{title: "Remera Beige Lisa", price: 2500, thumbnail:"https://d3ugyf2ht6aenh.cloudfront.net/stores/111/097/products/_mg_17061-ad68cdf82c5d284c4f16577496694867-1024-1024.jpg"},{title: "Remera Negra Lisa", price: 2500, thumbnail:"https://d3ugyf2ht6aenh.cloudfront.net/stores/111/097/products/_mg_16781-feb955b3b16b4a32a016577495798656-1024-1024.jpg"},{title: "Pantalon Azul de vestir", price: 5000, thumbnail:"https://www.google.com/aclk?sa=l&ai=DChcSEwjWl4zN04P7AhVq6FwKHUcdDEoYABADGgJjZQ&sig=AOD64_3fIUOrhp10bQUOHb3b0iRzSLQ5TA&adurl&ctype=5&ved=2ahUKEwj7j_nM04P7AhVeCbkGHW__BvQQvhd6BAgBEHE"},{title: "Remera Rosa", price: 2500, thumbnail:"https://static.dafiti.com.ar/p/penguin-4848-069073-3-product.jpg"},{title: "Jogger Marron", price: 4500, thumbnail:"https://static.dafiti.com.ar/p/polo-label-0414-457829-1-product.jpg"},{title: "Jogger Negro", price: 4500, thumbnail:"https://static.dafiti.com.ar/p/g4-5777-001329-1-product.jpg"},{title: "Jogger Cargo Verde", price: 4500, thumbnail:"https://static.dafiti.com.ar/p/vilo-9704-297989-1-product.jpg"},{title: "Chomba Bordeau", price: 3000, thumbnail:"https://static.dafiti.com.ar/p/chelsea-market-3057-533679-1-product.jpg"},{title: "Chomba Azul", price: 3000, thumbnail:"https://static.dafiti.com.ar/p/chelsea-market-3454-633679-1-product.jpg"}]) - Cargo datos a la colección productos

db.mensajes.find() - listar los documentos de la colección mensajes

db.productos.find() - listar los documentos de la colección productos

db.mensajes.count() - mustra la cantidad de documentos que hay en la colección mensajes

db.productos.count() - mustra la cantidad de documentos que hay en la colección productos

db.productos.insertOne({title: "Chomba Rosa", price: 3000, thumbnail:"https://static.dafiti.com.ar/p/equus-5176-712079-1-product.jpg"}) - Agrega 1 producto a la colección productos

db.productos.find({title:"Chomba Rosa"}) - realiza una consulta por nombre específico

db.productos.find({price: {$lt: 1000}}) - lista los productos con precio menor a 1000

db.productos.find({$and:[{price:{$gte: 1000}},{price:{$lte: 3000}}]}) - Lista los productos con precio entre 1000 y 3000

db.productos.find().sort({price:1}).skip(2).limit(1) - Trae el tercer producto más barato

db.productos.find({price: {$gt: 3000}}) - lista los productos con precio mayor a 3000

db.productos.updateMany({},{$set: {stock: 100}}) - Agrega stock 100 a todos los productos

db.productos.updateMany({price: {$gt: 4000}},{$set: {stock: 0}}) - Pone en 0 el stock de los productos con precio mayor a 4000

db.productos.deleteMany({price: {$lt: 1000}}) - borra los documentos con precio menor a 1000

*/

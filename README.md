# Introdução a teoria dos Grafos

## System for the subject `Graph theory introduction`

## How to run?

Check the `package.json` and see how to remove files in the folder on Windows SO, another just keep the file.   
Step 1- `npm install`  
Step 2- `npm start`

```
Group:
* André Vicente
* João Pedro Villas-Bôas
* Mateus Costa
* Rafael Santiago
* Victor Tuy
```

## How to Use?

0 - How to load from the file?
 * 1 - The file is in `/src/input/example.ts`.
 * 2 - Change what you want! but follows the object structure.
 * 3 - Do a GET request to `/api/v1/grafo/loadFromFile`
 - - - - 
1 - How to see the Graph?  
GET: `/api/v1/grafo` 
 - - - - 

2 - How to create a node?  
POST: `/api/v1/grafo/node` 
```
{
    "identifier": identifier(NUMBER),
    "value": value(STRING),
    "connections": [
        connection(NUMBER)
    ]
}
```
 - - - - 

3 -  How to see a choosen node?  
GET: `/api/v1/grafo/node/{identifier}`
 - - - - 
4 - How to remove a node?  
GET: `/api/v1/grafo/node/remove/{identifier}`
 - - - - 
5 - How to see the degree of a node?   
GET: `/api/v1/grafo/node/degree/{identifier}`
 - - - - 
6 - How to test connections between two nodes? 
GET: `/api/v1/grafo/node/connection/{identifier1}&{identifier2}`
 - - - - 
7 - How to see the adjacent graphs? 
GET: `/api/v1/grafo/node/adjacent/{identifier1}` 
 - - - - 
8 - How to INSERT a connection between two nodes? 
GET: `/api/v1/grafo/node/connection/insert/{identifier}&{connection}`
 - - - -

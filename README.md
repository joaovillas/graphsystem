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

- 1 - The file is in `/src/input/example.ts`.
- 2 - Change what you want! but follows the object structure.
- 3 - Do a GET request to `/api/v1/grafo/loadFromFile`

---

1 - How to see the Graph?  
GET: `/api/v1/grafo`

---

2 - How to create a node?  
POST: `/api/v1/grafo/node`

**Optional params**

```
{
    "id": number,
    "connections": number[],
    "weights" : number[]
}
```

---

3 - How to see a choosen node?  
GET: `/api/v1/grafo/node/:id`

---

4 - How to remove a node?  
GET: `/api/v1/grafo/node/:id/remove`

---

5 - How to see the degree of a node?  
GET: `/api/v1/grafo/node/:id/degree/`

---

6 - How to test connections between two nodes?  
GET: `/api/v1/grafo/node/:id/connection/:target`

---

7 - How to see the adjacent graphs?  
GET: `/api/v1/grafo/node/:id/adjacents`

---

8 - How to INSERT a connection between two nodes?  
GET: `/api/v1/grafo/node/:id/connect/:target[&:weight]*`  
\*_: if weighted graph_

---

9 - How to verify if graph is full connected?  
GET: `/api/v1/grafo/isConnected`

---

10 - How to verify if exists Euler Path?  
GET: `/api/v1/grafo/isEulerPath`

---

11 - How to print nodes degree avarage?  
GET: `/api/v1/grafo/avarage`

---

12 - How to get adjacent matrix?  
GET: `/api/v1/grafo/adjacentMatrix`

---

13 - How to load graph input/graph.json?  
GET: `/api/v1/grafo/loadFromFile`

---

14 - How to save graph on input/graph.json?  
GET: `/api/v1/grafo/saveOnFile`

---

15 - How to check graph type?  
GET: `/api/v1/grafo/type`

---

16 - How to create new graph?  
GET: `/api/v1/grafo/new/:type`  
**types:** undirected\* ; directed; weighted.  
_\*: default_

---

17 - How to get Warshall matrix?  
GET: `/api/v1/grafo/warshallMatrix`

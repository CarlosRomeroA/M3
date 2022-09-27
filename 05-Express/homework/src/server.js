// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1;


const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

// 1) POST /posts

server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body;

    if(!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }

    let post = {
        id: id,
        author: author,
        title: title,
        contents: contents
    }

    id++;
    posts.push(post);
    res.json(post)

})

// 2) POST /posts/author/:author
server.post('/posts/author/:author', (req, res) => {
    const { title, contents} = req.body;
    const { author } = req.params;
    let id = 1;

    if(!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }
    let post = {
        id: id,
        author: author,
        title: title,
        contents: contents
    }

    id++;
    posts.push(post);
    res.json(post)
})

// 3) GET /posts

server.get('/posts', (req, res) => {
    const term = req.query.term;
    if(term) {
        const results = posts.filter(p => p.title.includes(term) || p.contents.includes(term));
        return res.json(results)
    }
    res.json(posts)
})

// 4) GET /posts/:author

server.get('/posts/:author', (req, res) => {
    const { author }= req.params;
    const results = posts.filter(p => p.author === author)
    if(results.length > 0) {
        return res.json(results)
    } else {
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    }

})

// 5) GET /posts/:author/:title
server.get('/posts/:author/:title', (req, res) => {
    const { author, title }= req.params;
    const results = posts.filter(p => p.author === author && p.title === title)
    if(results.length > 0) {
        return res.json(results)
    } else {
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    } 

})

// 6) PUT /posts
server.put('/posts', (req, res) => {
    const { id, author, title, contents } = req.body;

    if(!id || !author || !title || !contents) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    
    let post = posts.find(p => p.id === id)

    if(!post) return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con el id indicado"})
    
        post.author = author;
        post.title = title;
        post.contents = contents;
        res.json(post)
})

// 7) DELETE /posts

server.delete('/posts', (req, res) => {
    const { id } = req.body;
    if(!id) return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    const post = posts.find(p => p.id === id)
    if(!post) return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con el id indicado"})
    posts = posts.filter(p => p.id !== id)
    res.json({ success: true })

})

// 8) DELETE /author

server.delete('/author', (req, res) => {
    const { author } = req.body;
    if(!author) return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    const results = posts.filter(p => p.author === author)
    if(!results.length > 0) return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    posts = posts.filter(p => p.author !== author)
    res.json(results)

})

module.exports = { posts, server };

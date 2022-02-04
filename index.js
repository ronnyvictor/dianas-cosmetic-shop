const express = require('express')

const { initializeApp, getApps, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const credentials = require('./credentials.json')

const app = express()
app.use(express.json())


function connectToFirestore() {
    if(!getApps().length) {
        initializeApp({
            credential: cert(credentials)
        });
    }
    return getFirestore();
}

app.post('/products',(request, response) => {
    const {brand, color, itemName, price, type} = request.body
    const product = {brand, color, itemName, price, type}
    const db = connectToFirestore();
    db.collection('products').add(product)
    .then(() => response.status(200).send(product))
    .then(console.log(product))
    .catch(console.error)
})

app.get('/products', (request, response) => {
    const db = connectToFirestore();
    db.collection('products')
    .get()
    .then(snapshot => {
        const products = snapshot.docs.map(doc => {
            let product = doc.data()
            product.id = doc.id
            return product
        })
        response.status(200).send(products)
    })
    .catch(console.error)
})

app.listen(3000, () => {
    console.log(`The API is listening on port`)
})
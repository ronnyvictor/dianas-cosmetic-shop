const customers = require ('./customers.json')
const products = require ('./products.json')
const orders = require('./orders.json')

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const credentials = require('./credentials.json')

initializeApp({
    credential: cert(credentials)
})

const db = getFirestore()

const prodRef = db.collection('products')

prodRef.add(products[2])
.then(doc => {
    console.log('Added Product', doc.id)
})
.catch(console.error)


const custRef = db.collection('customers')

custRef.add(customers[0])
.then(doc => {
    console.log ('Added Customer', doc.id)
})

const ordRef = db.collection('orders')

ordRef.add(orders[0])
.then(doc => {
    console.log ('Added Order', doc.id)
})
.catch(console.error)
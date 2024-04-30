import express from 'express';
import ProductManager from './manager/product.manager.js';

const productManager = new ProductManager ('./products.json')
const app = express();

app.use(express.json())

app.get("/products", async(req, res) =>{
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products)    
    } catch (error) {
        res.status(500).json({msg: error.message})
        
    }
    
})

app.post('/products', async(req, res) => {
    try {
        //console.log(req.body)
        const product = await productManager.addProducts(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({msg: error.message})   
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductbyId(id);
        if(!product){
            res.status(404).json({msg: 'product not found'})
        }else return res.status(200).json(product)
    } catch (error) { res.status(500).json({msg: error})
    }

})

app.post('/products/:limite', async(req, res) =>{
    try {
        const { limite } = req.params;
        const products = await productManager.limitProduct(limite);
        res.status(404).json(products)
    } catch (error) {
        
    }
})


const PORT = 8080;

app.listen(PORT, ()=> console.log(`Servidor ok en el puerto: ${PORT}`))
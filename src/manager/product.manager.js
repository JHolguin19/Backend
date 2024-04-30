    import fs from 'fs'
    import { v4 as uuidv4} from 'uuid'


    export default class productManager{
        
        constructor(path){
            this.path = path;
            this.counter = 0;

        }

        async getProducts (){
            try{
                if(fs.existsSync(this.path)){
                    const products = await fs.promises.readFile(this.path, 'utf-8');
                    return JSON.parse(products);
                }else return []

            }catch(error){ 
                console.log(error)
            }
        }
        async addProducts (obj){
            try {
                const products = await this.getProducts();
                const product = {
                    id : uuidv4(),
                    ...obj
                }
                const productsExist = products.find((x)=> x.nombre === product.nombre)
                if (productsExist) return 'El producto ya existe'
                products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return product;
            } catch (error) {
                console.log(error)
            }
        }

        async getProductbyId(id){
            try { 
            const products = await this.getProducts();   
            const product = products.find((x)=>x.id===id);
            if(product){
                console.log(product)

            }else{console.log('no existe el producto')}
                
            } catch (error) {
                console.log(error)
            }

        }
        async updateProduct(id, propiedad, valor) {
            try {
                let products = await this.getProducts();
    
                const index = products.findIndex(product => product.id === id);
                
                if (index !== -1) {

                    products[index][propiedad] = valor;

                    await fs.promises.writeFile(this.path, JSON.stringify(products));

                    console.log(`El producto buscado por el id ${id} se actualizó `);
                } else {
                    console.log(`No coincide ningun id ${id}.`);
                }
            } catch (error) {
                console.log(error);
            }
        }
        async deleteProduct(id){
            try { 
                let products = await this.getProducts();
                
                products = products.filter(product => product.id !== id);
                
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                console.log(`Producto con ID ${id} eliminado correctamente.`);
            } catch (error) {
                console.log(error);
            }
        }

        async limitProduct(limite){
        try {
            
        let products = await this.getProducts();

        const  productslimitados = products.slice(0, limite);

        return productslimitados
    
            } catch (error) {
                console.log(error)
                return [];

            }

        }


    }

    
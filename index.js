import fs from "fs";

class Contenedor {
  constructor(filename) {
    this.filename = filename;
  }

  save = async (product) => {
    try {
      const allProducts = await this.read();

      const lastProductId = allProducts[allProducts.length - 1].id;

      const newProduct = {
        id: lastProductId + 1,
        ...product,
      };

      await fs.promises.writeFile(
        this.filename,
        JSON.stringify([...allProducts, newProduct])
      );

      return newProduct.id;
    } catch (error) {
      throw new Error(error);
    }
  };

  read = async () => {
    try {
      const data = await fs.promises.readFile(this.filename, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const allProducts = await this.read()
      const foundProduct = allProducts[id - 1]
      if (foundProduct === undefined) {
      console.log(null);
      } else
      console.log(foundProduct)
    } catch (error) {
      throw new Error(error);
    }
  }

  getAll = async () => {

    try {
      const allProducts = await this.read()
      const showAllProducts = allProducts.sort()
      console.log(showAllProducts);
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteById = async (id) => {
    try {
      const allProducts = await this.read()
      const newAllProducts = allProducts.filter(product => product.id !== id)

      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(newAllProducts)
      )
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteAll = async () => {
    try {
      const emptyProducts = [{}]

      await fs.promises.writeFile(
        this.filename,
        JSON.stringify(emptyProducts)
      )

    } catch (error) {
      throw new Error(error);
    }
  }

}

const productos = new Contenedor("./products.json");

productos.save({
  title: "testing",
  price: 100,
  thumbnail: "http://http2.mlstatic.com/D_875724-MLA31116238699_062019-O.jpg",
});

// productos.getById(6)

// productos.getAll()

// productos.deleteById(4)

// productos.deleteAll()
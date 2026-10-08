interface BaseEntity {
    id: number;
}

interface Product extends BaseEntity {
    name: string;
    price: number;
}

interface Supplier extends BaseEntity {
    supplierName: string;
}

interface Warehouse extends BaseEntity {
    location: string;
}

const products: Product[] = [
    { id: 101, name: "Laptop", price: 50000 },
    { id: 102, name: "Mouse", price: 1000 }
];

const suppliers: Supplier[] = [
    { id: 1, supplierName: "Tech Distributors" },
    { id: 2, supplierName: "Global Electronics" }
];

const warehouses: Warehouse[] = [
    { id: 11, location: "Chennai" },
    { id: 12, location: "Bangalore" }
];

class GenericRepository<T extends BaseEntity> {
    private readonly entities: T[] = [];

    add(entity: T): void {
        this.entities.push(entity);
    }

    getAll(): T[] {
        return [...this.entities];
    }

    getById(id: number): T | undefined {
        for (const entity of this.entities) {
            if (entity.id === id) {
                return entity;
            }
        }

        return undefined;
    }

    deleteById(id: number): void {
        let entityIndex = -1;

        for (let index = 0; index < this.entities.length; index += 1) {
            if (this.entities[index].id === id) {
                entityIndex = index;
                break;
            }
        }

        if (entityIndex !== -1) {
            this.entities.splice(entityIndex, 1);
        }
    }
}

const productRepository = new GenericRepository<Product>();
const supplierRepository = new GenericRepository<Supplier>();
const warehouseRepository = new GenericRepository<Warehouse>();

products.forEach(product => productRepository.add(product));
suppliers.forEach(supplier => supplierRepository.add(supplier));
warehouses.forEach(warehouse => warehouseRepository.add(warehouse));

const productSearchResult = productRepository.getById(101);
const supplierSearchResult = supplierRepository.getById(2);

warehouseRepository.deleteById(11);
const remainingWarehouses = warehouseRepository.getAll();

console.log("Product Search Output");
console.log(productSearchResult);
console.log("\nSupplier Search Output");
console.log(supplierSearchResult);
console.log("\nWarehouse Delete Output");
console.log("Remaining Warehouses");
console.log(remainingWarehouses);

/*
Type-safety validation: uncommenting the following statement causes compilation
to fail because the object is not a Product.

productRepository.add({
    supplierName: "ABC"
});
*/

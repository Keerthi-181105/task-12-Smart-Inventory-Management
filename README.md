# Smart Inventory Management System

## Project Overview

RetailHub manages products, suppliers, and warehouses. The original implementation
used three repository classes with identical storage, lookup, and mutation logic.
This refactoring replaces those classes with one reusable
`GenericRepository<T extends BaseEntity>` while preserving the application behavior.

## Duplication Identified

- Each repository declared its own array for entities.
- Each repository repeated `add`, `getAll`, and `getById`.
- Each repository repeated the same `find` predicate using `id`.
- The repeated code increased maintenance effort and made behavior changes easy to
  apply inconsistently.

## Generic Design Approach

`BaseEntity` provides the shared `id: number` constraint. The generic repository
accepts any entity extending `BaseEntity`, so the same implementation is safely
specialized as `GenericRepository<Product>`, `GenericRepository<Supplier>`, or
`GenericRepository<Warehouse>`.

The repository exposes:

- `add(entity: T): void`
- `getAll(): T[]`
- `getById(id: number): T | undefined`
- `deleteById(id: number): void`

`getAll` returns a shallow copy so callers can inspect the collection without
replacing or mutating the repository's internal array.

## Refactoring Steps

1. Added the shared `BaseEntity` interface.
2. Made `Product`, `Supplier`, and `Warehouse` extend `BaseEntity`.
3. Replaced the three duplicated repository classes with `GenericRepository<T>`.
4. Created one typed repository instance for each entity type.
5. Loaded every existing dataset into its corresponding repository.
6. Verified product search, supplier search, and warehouse deletion.
7. Preserved compile-time type safety by constraining the generic type and avoiding
   `any`.

## How To Execute

From this directory:

```powershell
tsc --strict --target ES2020 --module commonjs smart-inventory-system.ts --outDir dist
node dist/smart-inventory-system.js
```

The type-safety example is intentionally commented out in the runnable file.
Uncommenting it demonstrates the expected compile-time error because the supplied
object is missing the required Product properties `id`, `name`, and `price`.

## Sample Output

```text
Product Search Output
{ id: 101, name: 'Laptop', price: 50000 }

Supplier Search Output
{ id: 2, supplierName: 'Global Electronics' }

Warehouse Delete Output
Remaining Warehouses
[ { id: 12, location: 'Bangalore' } ]
```

## Deliverables

- `smart-inventory-system.ts` - generic repository implementation and verification
- `AnalysisReport.docx` - duplication analysis and proposed solution
- `Screenshots/` - verification output screenshots

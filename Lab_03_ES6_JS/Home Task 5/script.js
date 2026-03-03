const productCatalog = new Map();

productCatalog.set(101, { name: "Laptop", price: 75000, category: "Electronics" });
productCatalog.set(102, { name: "Headphones", price: 3500, category: "Accessories" });
productCatalog.set(103, { name: "Keyboard", price: 2500, category: "Accessories" });
productCatalog.set(104, { name: "Monitor", price: 25000, category: "Electronics" });
productCatalog.set(105, { name: "Mouse", price: 1500, category: "Accessories" });

const displayProducts = (catalog) => {
    let table = `<table>
        <tr><th>ID</th><th>Name</th><th>Price (Rs)</th><th>Category</th></tr>`;
    catalog.forEach((product, id) => {
        table += `<tr>
            <td>${id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
        </tr>`;
    });
    table += "</table>";
    return table;
};

const searchId = 103;
const searchResult = productCatalog.get(searchId);

const deleteId = 105;
const deletedProduct = productCatalog.get(deleteId);
productCatalog.delete(deleteId);

document.getElementById("output").innerHTML = `
    <div class="section">
        <h3>All Products</h3>
        ${displayProducts(productCatalog)}
        <p><strong>Total Products:</strong> ${productCatalog.size}</p>
    </div>
    <div class="section">
        <h3>Search Result (ID: ${searchId})</h3>
        <p><strong>Name:</strong> ${searchResult.name} | <strong>Price:</strong> Rs ${searchResult.price} | <strong>Category:</strong> ${searchResult.category}</p>
    </div>
    <div class="section">
        <h3>Deleted Product</h3>
        <p class="highlight">Removed: ${deletedProduct.name} (ID: ${deleteId})</p>
        <p><strong>Products remaining:</strong> ${productCatalog.size}</p>
    </div>
    <div class="section">
        <h3>Updated Catalog</h3>
        ${displayProducts(productCatalog)}
    </div>
`;

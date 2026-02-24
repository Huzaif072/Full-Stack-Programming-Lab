const addToCart = (...items) => {
    return items;
};

const cart = addToCart("Laptop", "Mouse", "Keyboard", "Monitor", "Headphones");

const clonedCart = [...cart];

const updatedCart = [...clonedCart, "USB Cable", "Webcame"];

const [firstItem, ...remainingItems] = updatedCart;

let output = `
    <div class="section">
        <h3>Original Cart</h3>
        <p>${cart.join(", ")}</p>
        <p><strong>Total Items:</strong> ${cart.length}</p>
    </div>
    <div class="section">
        <h3>Cloned Cart (using Spread)</h3>
        <p>${clonedCart.join(", ")}</p>
    </div>
    <div class="section">
        <h3>Updated Cart (added more items)</h3>
        <p>${updatedCart.join(", ")}</p>
        <p><strong>Total Items:</strong> ${updatedCart.length}</p>
    </div>
    <div class="section">
         <h3>Destructured Results</h3>
         <p><strong>First Item:</strong> ${firstItem}</p>
         <p><strong>Remaining Items:</strong> ${remainingItems.join(", ")}</p>
     </div>
     `;

document.getElementById("output").innerHTML = output;
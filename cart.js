/* Image Filter Section */

// Select all elements with the class '.filter-item'
const allFilterItems = document.querySelectorAll('.filter-item');

// Select all elements with the class '.filter-btn'
const allFilterBtns = document.querySelectorAll('.filter-btn');

// Set the second button as active on page load
window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[1].classList.add('active-btn');
});

// Attach click event listeners to all filter buttons
allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn);
    });
});

// Function to display filtered content based on the clicked button
function showFilteredContent(btn) {
    allFilterItems.forEach((item) => {
        if (item.classList.contains(btn.id)) {
            resetActiveBtn();
            btn.classList.add('active-btn');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// Function to reset the active state of all filter buttons
function resetActiveBtn() {
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}


/* Shopping Cart Section */

// Check the document ready state and invoke 'ready' function accordingly
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Function called when the document is ready
function ready() {
    // Add click event listeners to remove buttons in the shopping cart
    var removeCartItemButton = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButton.length; i++) {
        var button = removeCartItemButton[i];
        button.addEventListener('click', removeCartItem);
    }

    // Add change event listeners to quantity input fields
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add click event listeners to 'Add to Cart' buttons
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    // Add click event listener to 'Purchase' button
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

// Function called when the 'Purchase' button is clicked
function purchaseClicked() {
    alert('Thank you for your purchase!!!');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    // Remove all child nodes from the cart
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    // Update the total in the cart
    updateCartTotal();
}

// Function to remove a cart item when the 'Remove' button is clicked
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    // Update the total in the cart
    updateCartTotal();
}

// Function called when the quantity input changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    // Update the total in the cart
    updateCartTotal();
}

// Function called when an 'Add to Cart' button is clicked
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    // Add the item to the cart
    addItemToCart(title, price, imageSrc);
    // Update the total in the cart
    updateCartTotal();
}

// Function to add an item to the cart
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    for (i = 0; i < cartItemNames.length; i++) {
        // Check for duplicate items in the cart
        if (cartItemNames[i].innerText == title) {
            alert('This item already has added to the cart!');
            return;
        }
    }

    // Create HTML content for a new cart row
    var cartRowContents = `
        <td class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="50" height="50">
            <span class="cart-item-title">${title}</span>                  
        </td>
        <td class="cart-item cart-column">
            <span class="cart-price cart-column">${price}</span>
        </td>
        <td class="cart-item cart-column">
            <input class="cart-quantity-input" type="number" value="1" style="width: 50px">
            <button class="btn btn-danger" type="button">Remove</button>
        </td>        
    `;

    // Assign the HTML content to the new cart row
    cartRow.innerHTML = cartRowContents;

    // Append the new cart row to the cart items container
    cartItems.append(cartRow);

    // Add event listeners for the new cart row
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);}

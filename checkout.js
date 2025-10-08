const cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderSummary = document.getElementById("orderSummary");

if(cart.length){
  orderSummary.innerHTML = cart.map(i => `
    <p>${i.name} × ${i.qty} — ₹${i.price * i.qty}</p>
  `).join("") + `<hr><p><strong>Total: ₹${cart.reduce((s, i) => s + i.price * i.qty, 0)}</strong></p>`;
} else {
  orderSummary.innerHTML = "<p>Your cart is empty.</p>";
}

document.getElementById("checkoutForm").addEventListener("submit", function(e){
  e.preventDefault();
  const formData = new FormData(this);
  const customer = Object.fromEntries(formData.entries());
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // Build order message
  const productList = cart.map(item =>
    `• ${item.name} × ${item.qty} = ₹${item.qty * item.price}`
  ).join('\n');

  const message = `
🛒 *New Order from Tastika*
👤 *Name:* ${customer.name}
📞 *Phone:* ${customer.phone}
📍 *Address:* ${customer.address}
📧 *Email:* ${customer.email}
${productList}
💰 *Total:* ₹${total}
`;

  const whatsappLink = `https://wa.me/919058013507?text=${encodeURIComponent(message)}`;

  // Redirect to WhatsApp
  window.location.href = whatsappLink;

  // Clear cart
  localStorage.removeItem("cart");
});

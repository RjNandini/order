function getOrdersFromLocalStorage() {
    const orders = localStorage.getItem("orders");
    return orders ? JSON.parse(orders) : [];
  }
  
  function saveOrdersToLocalStorage(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
  }
  
  let orderDatabase = getOrdersFromLocalStorage();
  
  function addOrder() {
    const customerName = document.getElementById("customerName").value;
    const orderNumber = document.getElementById("orderNumber").value;
  
    // Generate a new unique ID for the order
    const newId = orderDatabase.length > 0 ? orderDatabase[orderDatabase.length - 1].id + 1 : 1;
  
    // Create a new order object
    const newOrder = {
      id: newId,
      orderNumber: orderNumber,
      customerName: customerName,
      status: "Processing", // Set default status as "Processing" for newly added orders
    };
  
    // Add the new order to the database
    orderDatabase.push(newOrder);
  
    // Save the updated orderDatabase to Local Storage
    saveOrdersToLocalStorage(orderDatabase);
  
    // Clear input fields after adding the order
    document.getElementById("customerName").value = "";
    document.getElementById("orderNumber").value = "";
  
    // Show success message with order ID
    const orderDetails = document.getElementById("orderDetails");
    orderDetails.innerHTML = `
      <h2>Order Information</h2>
      <p><strong>Order ID:</strong> ${newId}</p>
      <p><strong>Order Number:</strong> ${orderNumber}</p>
      <p><strong>Customer Name:</strong> ${customerName}</p>
      <p><strong>Order Status:</strong> Processing</p>
    `;
  
    // Redirect to the home page after 3 seconds
    setTimeout(function () {
      window.location.href = "index.html";
    }, 3000);
  }
  
  function trackOrder() {
    const orderID = parseInt(document.getElementById("orderID").value);
    const statusResult = document.getElementById("statusResult");
  
    // Find the order in the database based on the provided orderID
    const foundOrder = orderDatabase.find((order) => order.id === orderID);
  
    if (foundOrder) {
      statusResult.innerHTML = `
        <h2>Order Information</h2>
        <p><strong>Order ID:</strong> ${foundOrder.id}</p>
        <p><strong>Order Number:</strong> ${foundOrder.orderNumber}</p>
        <p><strong>Customer Name:</strong> ${foundOrder.customerName}</p>
        <p><strong>Order Status:</strong> ${foundOrder.status}</p>
      `;
    } else {
      statusResult.textContent = `Order with ID ${orderID} not found.`;
    }
  }
  
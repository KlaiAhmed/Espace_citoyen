document.addEventListener('DOMContentLoaded', function () {
    const adminregisterForm = document.getElementById('adminregisterForm');

    if (adminregisterForm) {
        adminregisterForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const adminData = {
                name: document.getElementById('adname').value.trim(),
                categorie: document.getElementById('categorie').value.trim(),
                adminphone: document.getElementById('adminphone').value.trim(),
                adminemail: document.getElementById('adminemail').value.trim(),
                location: document.getElementById('location').value.trim(),
            };
            localStorage.setItem('adminData', JSON.stringify(adminData));
            localStorage.setItem('userEmail', adminData.adminemail);
            localStorage.setItem('userRole', 'admin');
            window.location.href = 'admin.html';
        });
    }
    const adminData = JSON.parse(localStorage.getItem('adminData'));

    if (adminData) {
        const displayName = document.getElementById('display-name');
        const displayCategorie = document.getElementById('display-categorie');
        const displayLocation = document.getElementById('display-location');
        const displayEmail = document.getElementById('display-email');
        const displayNumber = document.getElementById('display-number');

        if (displayName) displayName.textContent = adminData.name || 'N/A';
        if (displayCategorie) displayCategorie.textContent = adminData.categorie || 'N/A';
        if (displayLocation) displayLocation.textContent = adminData.location || 'N/A';
        if (displayEmail) displayEmail.textContent = adminData.adminemail || 'N/A';
        if (displayNumber) displayNumber.textContent = adminData.adminphone || 'N/A';
    }

    // Edit Button Redirection
    const editButton = document.getElementById('adminedit-info');
    if (editButton) {
        editButton.addEventListener('click', function () {
            window.location.href = 'adminsignup.html';
        });
    }

    displayPaymentInfo();

    displayNotifications();

    document.getElementById("save-payment").addEventListener("click", function (event) {
        event.preventDefault();

        const cardNumber = document.getElementById("card-number").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cardHolder = document.getElementById("card-holder").value;

        if (cardNumber && expiryDate && cardHolder) {
            const paymentInfo = {
                cardNumber: `**** **** **** ${cardNumber.slice(-4)}`,
                expiryDate,
                cardHolder
            };

            localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
            alert("Payment information saved successfully!");
            displayPaymentInfo();
        } else {
            alert("Please fill out all payment fields.");
        }});
});







document.getElementById("logout-btn").addEventListener("click", function() {
    localStorage.clear();
    window.location.href = "index.html";
});







function displayPaymentInfo() {
    const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo"));
    const paymentContainer = document.getElementById("saved-payment-info");

    if (paymentInfo) {
        paymentContainer.innerHTML = `
            <p><strong>Card Number:</strong> ${paymentInfo.cardNumber}</p>
            <p><strong>Expiry Date:</strong> ${paymentInfo.expiryDate}</p>
            <p><strong>Card Holder:</strong> ${paymentInfo.cardHolder}</p>
        `;
    }
}






function displayNotifications() {
    const notifications = JSON.parse(localStorage.getItem("appointments")) || [];
    const notificationsContainer = document.getElementById("notifications-container");
    if (notifications.length > 0) {
        notificationsContainer.innerHTML = notifications.map(app => `
            <div class="notification">
                <p>هناك موعد :${app.date} الساعة ${app.time}</p>
            </div>
        `).join('');
    } else {
        notificationsContainer.innerHTML = '<p>No new notifications</p>';
    }
}








document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const adminLogin = document.getElementById("admin_login");
    const adminSignup = document.getElementById("admin_signup");
    const personalPage = document.getElementById("personal");
    const adminPage = document.getElementById("admin-page");
    const userEmailSpan = document.getElementById("user-email");
    const userRole = localStorage.getItem("userRole");
    const userEmail = localStorage.getItem("userEmail");
    function hideAllLinks() {
        if (loginBtn) loginBtn.style.display = "none";
        if (signupBtn) signupBtn.style.display = "none";
        if (adminLogin) adminLogin.style.display = "none";
        if (adminSignup) adminSignup.style.display = "none";
        if (personalPage) personalPage.style.display = "none";
        if (adminPage) adminPage.style.display = "none";
    }
    function updateNavLinks() {
        hideAllLinks();

        if (userEmail) {
            if (userEmailSpan) {
                userEmailSpan.textContent = userEmail;
                userEmailSpan.style.display = "inline";
            }
            if (userRole === "admin") {
                if (adminPage) adminPage.style.display = "inline";
            } 
            else if (userRole === "user") {
                if (personalPage) personalPage.style.display = "inline";
            }
        } else {
            if (loginBtn) loginBtn.style.display = "inline";
            if (signupBtn) signupBtn.style.display = "inline";
            if (adminLogin) adminLogin.style.display = "inline";
            if (adminSignup) adminSignup.style.display = "inline";
        }
    }
    updateNavLinks();
    window.onpageshow = () => {
        updateNavLinks();
    };
});







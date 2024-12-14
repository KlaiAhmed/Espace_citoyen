let selectedService = "";

function selectService(serviceName) {

    selectedService = serviceName;

    const allServices = document.querySelectorAll('.service-item');
    allServices.forEach(service => service.classList.remove('selected-service'));

    const clickedService = Array.from(allServices).find(service =>
        service.innerText.includes(serviceName)
    );
    if (clickedService) {
        clickedService.classList.add('selected-service');
    }

    displayCitySelection();

    document.getElementById("thirdp").scrollIntoView({ behavior: "smooth" });
}

function displayCitySelection() {
    document.getElementById("thirdp").style.display = "block";
    document.getElementById("selected-service").innerText = selectedService;
}

function populateMunicipalities() {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
        alert('No user data found. Please sign up first.');
        return;
    }

    const city = document.getElementById("city-dropdown").value;
    const municipalityDropdown = document.getElementById("municipality-dropdown");
    municipalityDropdown.innerHTML = ""; 

    const municipalities = {
        "تونس": ["المرسى", "الكرم", "قرطاج", "سيدي بوسعيد", "باب البحر"],
        "صفاقس": ["صفاقس المدينة", "صفاقس الجنوبية", "صفاقس الغربية", "طينة", "عقارب"],
        "سوسة": ["سوسة المدينة", " الرياض", " جوهرة", "القنطاوي", "مساكن"],
        "أريانة": ["أريانة المدينة", "المنيهلة", "المرسى العليا", "قلعة الأندلس", "رواد"],
        "بن عروس": ["حمام الأنف", "حمام الشط", "رادس", "المروج", "فوشانة"],
        "منوبة": ["دوار هيشر", "وادي الليل", "الجديدة", "البساتين", "منوبة المدينة"],
        "نابل": ["نابل المدينة", "دار شعبان الفهري", "حمام الأغزاز", "بني خيار", "الحمامات"],
        "المنستير": ["المنستير المدينة", "المكنين", "جمال", "البقالطة", "زرمدين"],
        "المهدية": ["المهدية المدينة", "الجم", "قصور الساف", "شربان", "سيدي علوان"],
        "القيروان": ["القيروان المدينة", "نصر الله", "حفوز", "بوحجلة", "حاجب العيون"],
        "القصرين": ["القصرين المدينة", "سبيطلة", "سبيبة", "تالة", "فوسانة"],
        "قفصة": ["قفصة المدينة", "المتلوي", "القصر", "رديف", "أم العرائس"],
        "قابس": ["قابس المدينة", "الحامة", "مطماطة", "مارث", "شنني"],
        "مدنين": ["مدنين المدينة", "جرجيس", "بن قردان", "بني خداش", "أجيم"],
        "تطاوين": ["تطاوين المدينة", "رمادة", "ذهيبة", "البئر الأحمر", "الصمار"],
        "توزر": ["توزر المدينة", "نفطة", "دقاش", "حزوة", "تمغزة"],
        "قبلي": ["قبلي المدينة", "دوز", "سوق الأحد", "رجيم معتوق", "القلة"],
        "سليانة": ["سليانة المدينة", "الكريب", "بورويس", "الروحية", "قعفور"],
        "الكاف": ["الكاف المدينة", "الدهماني", "تاجروين", "الجريصة", "قلعة سنان"],
        "باجة": ["باجة المدينة", "تستور", "مجاز الباب", "نفزة", "تيبار"],
        "جندوبة": ["جندوبة المدينة", "طبرقة", "عين دراهم", "بوسالم", "غار الدماء"],
        "زغوان": ["زغوان المدينة", "الفحص", "الناظور", "صواف", "بئر مشارقة"],
        "بنزرت": ["بنزرت المدينة", "منزل بورقيبة", "جرزونة", "العالية", "غار الملح"]
    };

    if (municipalities[city]) {
        municipalities[city].forEach(municipality => {
            const option = document.createElement("option");
            option.value = municipality;
            option.textContent = municipality;
            municipalityDropdown.appendChild(option);
        });
    }
    document.getElementById("municipality-selection").style.display = "block";
}

function confirmSelection() {
    document.getElementById("action-selection").style.display = "block";
}

function downloadDocument() {
    alert("تحميل الوثيقة...");
}

function showAppointmentScheduler() {
    const scheduler = document.getElementById("appointment-scheduler");
    const timeDropdown = document.getElementById("appointment-time");
    const dateInput = document.getElementById("appointment-date");

    timeDropdown.innerHTML = `
        <option value="08:00">08:00</option>
        <option value="08:30">08:30</option>
        <option value="09:00">09:00</option>
        <option value="09:30">09:30</option>
        <option value="10:00">10:00</option>
        <option value="10:30">10:30</option>
        <option value="11:00">11:00</option>
        <option value="11:30">11:30</option>
        <option value="14:00">14:00</option>
        <option value="14:30">14:30</option>
        <option value="15:00">15:00</option>
        <option value="15:30">15:30</option>
        <option value="16:00">16:00</option>
        <option value="16:30">16:30</option>
    `;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];
    dateInput.min = minDate;

    scheduler.style.display = "block";
}

function confirmAppointment() {
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("appointment-time").value;

    if (date && time) {
        const selectedDate = new Date(date);
        const today = new Date();

        if (selectedDate > today) {
            alert(`تم تحديد موعدك: ${date} الساعة ${time}`);
        } else {
            alert("يرجى اختيار تاريخ في المستقبل.");
        }
    } else {
        alert("يرجى اختيار تاريخ ووقت للموعد.");
    }
}

window.onload = function() {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
        document.getElementById("user-email").innerText = userEmail;
        document.getElementById("user-email").style.display = 'inline';
        document.getElementById("personal").style.display = 'inline';
        document.getElementById("login-btn").style.display = 'none';
        document.getElementById("signup-btn").style.display = 'none';
 
    } else {
        document.getElementById("user-email").style.display = 'none';
        document.getElementById("login-btn").style.display = 'inline';
        document.getElementById("signup-btn").style.display = 'inline';

    }
};


document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const userData = {
                cin: document.getElementById('cin').value,
                firstname: document.getElementById('firstname').value,
                lastname: document.getElementById('lastname').value,
                dob: document.getElementById('dob').value,
                birthplace: document.getElementById('birthplace').value,
                gender: document.getElementById('gender').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };

            localStorage.setItem('userData', JSON.stringify(userData));

            localStorage.setItem('userEmail', userData.email);

            window.location.href = 'index.html';
        });
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
        document.getElementById('display-cin').textContent = userData.cin || 'N/A';
        document.getElementById('display-firstname').textContent = userData.firstname || 'N/A';
        document.getElementById('display-lastname').textContent = userData.lastname || 'N/A';
        document.getElementById('display-dob').textContent = userData.dob || 'N/A';
        document.getElementById('display-birthplace').textContent = userData.birthplace || 'N/A';
        document.getElementById('display-gender').textContent = userData.gender || 'N/A';
        document.getElementById('display-email').textContent = userData.email || 'N/A';
        document.getElementById('display-phone').textContent = userData.phone || 'N/A';

    document.getElementById('edit-info')?.addEventListener('click', function () {
        window.location.href = 'signup.html';
    });
});

document.getElementById("logout-btn").addEventListener("click", function() {
    localStorage.clear();
    window.location.href = "index.html";
});
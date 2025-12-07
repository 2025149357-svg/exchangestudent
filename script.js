
// =============================
// MAIN SCRIPT - UNIVERSAL
// =============================
document.addEventListener("DOMContentLoaded", () => {


  // ============================
  // MOBILE MENU (Homepage + Dashboard)
  // ============================
  const menuBtn = document.getElementById("menuBtn");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");

  // Homepage mobile menu
  menuBtn?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden");
  });

  // Dashboard hamburger
  sidebarToggle?.addEventListener("click", () => {
    mobileMenu?.classList.remove("hidden");
    mobileOverlay?.classList.remove("hidden");
  });

  // Dashboard overlay
  mobileOverlay?.addEventListener("click", () => {
    mobileMenu?.classList.add("hidden");
    mobileOverlay.classList.add("hidden");
  });

  // Close Mobile Toggle
const closeMobileMenu = document.getElementById("closeMobileMenu");

closeMobileMenu?.addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
  mobileOverlay.classList.add("hidden");
});

  // ============================
  // MOBILE PROGRAMS DROPDOWN
  // ============================
  const mobileProgramsBtn = document.getElementById("mobileProgramsBtn");
  const mobileProgramsDropdown = document.getElementById("mobileProgramsDropdown");

  mobileProgramsBtn?.addEventListener("click", () => {
    mobileProgramsDropdown.classList.toggle("hidden");
  });


  // ============================
  // DARK MODE (Dashboard only)
  // ============================
  const darkToggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });


  // ============================
  // SIDEBAR ACTIVE (Dashboard only)
  // ============================
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebarLinks.forEach((l) => l.classList.remove("bg-blue-50"));
      link.classList.add("bg-blue-50");
    });
  });


  // ============================
  // SEARCH FILTER (Dashboard)
  // ============================
  const searchInput = document.getElementById("searchInput");
  searchInput?.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();

    document
      .querySelectorAll("#applicationsTable tbody tr")
      .forEach((row) => {
        row.style.display = row.innerText.toLowerCase().includes(filter)
          ? ""
          : "none";
      });
  });


  // ============================
  // FORMS (Dashboard)
  // ============================
  const newAppForm = document.getElementById("newApplicationForm");
  const appsTableBody = document.querySelector("#applicationsTableBody");

  newAppForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const program = document.getElementById("programName").value;
    const university = document.getElementById("universityName").value;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${appsTableBody.children.length + 1}</td>
      <td>${program}</td>
      <td>${university}</td>
      <td><span class="badge bg-warning text-dark">Pending</span></td>
      <td><button class="btn btn-primary btn-sm">View</button></td>
    `;
    appsTableBody.appendChild(newRow);

    newAppForm.reset();
    bootstrap.Modal.getInstance(document.getElementById("newApplicationModal")).hide();
  });


  const updateProfileForm = document.getElementById("updateProfileForm");
  updateProfileForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("profileName").value;
    const email = document.getElementById("profileEmail").value;

    document.getElementById("profileNameDisplay").textContent = name;
    document.getElementById("profileEmailDisplay").textContent = email;

    updateProfileForm.reset();
    bootstrap.Modal.getInstance(document.getElementById("updateProfileModal")).hide();
  });


  // ============================
  // CHARTS (Dashboard Only)
  // ============================
  if (document.getElementById("studentsCountryChart")) {
    const studentsChart = new Chart(
      document.getElementById("studentsCountryChart"),
      {
        type: "bar",
        data: {
          labels: ["Japan", "Korea", "UK", "Indonesia", "Malaysia"],
          datasets: [
            {
              label: "Students",
              data: [12, 8, 5, 3, 7],
              backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
              borderRadius: 6,
            },
          ],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      }
    );
  }

});

// ============================
// DASHBOARD CHARTS ONLY
// ============================

// Utility: Create gradient for bar charts
function createGradient(ctx, colorStart, colorEnd) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 250);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
}

// ----------------------------
// Students Country Chart
// ----------------------------
const ctxStudents = document.getElementById('studentsCountryChart')?.getContext('2d');

if (ctxStudents) {
  new Chart(ctxStudents, {
    type: 'bar',
    data: {
      labels: ['Japan', 'Korea', 'UK', 'Indonesia', 'Malaysia'],
      datasets: [{
        label: 'Students',
        data: [12, 8, 5, 3, 7],
        backgroundColor: createGradient(ctxStudents, '#3B82F6', '#60A5FA'),
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

// ----------------------------
// Programs Country Chart
// ----------------------------
const ctxPrograms = document.getElementById('programsCountryChart')?.getContext('2d');

if (ctxPrograms) {
  new Chart(ctxPrograms, {
    type: 'bar',
    data: {
      labels: ['Japan', 'Korea', 'UK', 'Indonesia', 'Malaysia'],
      datasets: [{
        label: 'Programs',
        data: [3, 2, 1, 1, 2],
        backgroundColor: createGradient(ctxPrograms, '#10B981', '#34D399'),
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

// ----------------------------
// Status Doughnut Chart
// ----------------------------
const ctxStatus = document.getElementById('statusChart')?.getContext('2d');

if (ctxStatus) {
  new Chart(ctxStatus, {
    type: 'doughnut',
    data: {
      labels: ['Approved', 'Pending', 'Rejected'],
      datasets: [{
        data: [10, 5, 2],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444']
      }]
    },
    options: {
      responsive: true,
      cutout: '50%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { padding: 15, boxWidth: 20 }
        }
      }
    }
  });
}

// ----------------------------
// APPLICATIONS OVER TIME CHART
// ----------------------------

let timeChart;

const timeRanges = {
  daily:    { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], values: [2,5,3,8,2,6,4] },
  weekly:   { labels: ["Week 1","Week 2","Week 3","Week 4"], values: [10,17,12,20] },
  monthly:  { labels: ["Jan","Feb","Mar","Apr","May","Jun"], values: [22,31,25,33,29,38] },
  yearly:   { labels: ["2020","2021","2022","2023","2024"], values: [120,150,160,210,260] }
};

function loadTimeChart(range) {
  const canvas = document.getElementById("applicationsOverTimeChart");
  if (!canvas) return; // stop if not on dashboard

  const ctx = canvas.getContext("2d");

  if (timeChart) timeChart.destroy();

  timeChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeRanges[range].labels,
      datasets: [{
        label: "Applications",
        data: timeRanges[range].values,
        fill: true,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        borderWidth: 3,
        pointBackgroundColor: "#2563eb",
        tension: 0.35
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: "#eee" }, beginAtZero: true }
      }
    }
  });
}

// Default load (only if chart exists)
if (document.getElementById("applicationsOverTimeChart")) {
  loadTimeChart("daily");

  document.querySelectorAll(".timeTab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".timeTab").forEach(t => t.classList.remove("activeTab"));
      btn.classList.add("activeTab");

      loadTimeChart(btn.dataset.range);
    });
  });
}

// ----------------------------
// LOGIN FORM
// ----------------------------

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const emailField = document.getElementById("loginEmail");
    const passField = document.getElementById("loginPassword");
    const toast = document.getElementById("toast");
    const togglePassword = document.getElementById("togglePassword");
    const loginBtn = document.getElementById("loginBtn");
    const loginBtnText = document.getElementById("loginBtnText");
    const spinner = document.getElementById("spinner");

    // Demo valid login (modify if needed)
    const validEmail = "student@exchange.com";
    const validPass = "1234";

    // Show/hide password
    togglePassword.addEventListener("click", () => {
      const type = passField.type === "password" ? "text" : "password";
      passField.type = type;

      // Change icon based on password visibility
      const icon = type === "password" ? "bi-eye" : "bi-eye-slash";
      togglePassword.innerHTML = `<i class="bi ${icon}"></i>`; // Use Bootstrap icon
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailField.value.trim();
        const pass = passField.value.trim();

        // Show loading spinner
        spinner.classList.remove("hidden");
        loginBtnText.textContent = "Checking...";
        loginBtn.disabled = true;

        setTimeout(() => {

          if (email === validEmail && pass === validPass) {

                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: "Redirecting to dashboard...",
                    timer: 1500,
                    showConfirmButton: false
                });

                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1500);

          } else {

                // Error popup
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Your email or password is incorrect.",
                });

                // Toast
                toast.classList.add("show");
                setTimeout(() => toast.classList.remove("show"), 3000);

                // Shake + red border
                emailField.classList.add("border-red-500", "animate-shake");
                passField.classList.add("border-red-500", "animate-shake");

                setTimeout(() => {
                    emailField.classList.remove("animate-shake");
                    passField.classList.remove("animate-shake");
                }, 400);
          }

          // Reset loading
          spinner.classList.add("hidden");
          loginBtnText.textContent = "Login";
          loginBtn.disabled = false;

        }, 1200); // simulate loading time
    });

});

// ----------------------------
// REGISTER FORM
// ----------------------------

document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");
    const fullNameField = document.getElementById("fullName");
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");
    const toast = document.getElementById("toast");
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const registerBtn = document.getElementById("registerBtn");
    const registerBtnText = document.getElementById("registerBtnText");
    const spinner = document.getElementById("spinner");

    // Show/hide password
    togglePassword.addEventListener("click", () => {
      const type = passwordField.type === "password" ? "text" : "password";
      passwordField.type = type;

      // Change icon based on password visibility
      const icon = type === "password" ? "bi-eye" : "bi-eye-slash";
      togglePassword.innerHTML = `<i class="bi ${icon}"></i>`; // Use Bootstrap icon
    });

    // Show/hide confirm password
    toggleConfirmPassword.addEventListener("click", () => {
      const type = confirmPasswordField.type === "password" ? "text" : "password";
      confirmPasswordField.type = type;

      // Change icon based on password visibility
      const icon = type === "password" ? "bi-eye" : "bi-eye-slash";
      toggleConfirmPassword.innerHTML = `<i class="bi ${icon}"></i>`; // Use Bootstrap icon
    });

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullName = fullNameField.value.trim();
        const email = emailField.value.trim();
        const password = passwordField.value.trim();
        const confirmPassword = confirmPasswordField.value.trim();

        // Validate the fields
        if (!fullName || !email || !password || !confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "Missing Information",
            text: "Please fill in all the fields."
          });
          return;
        }

        if (password !== confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "Password Mismatch",
            text: "Passwords do not match."
          });
          return;
        }

        // Show loading spinner
        spinner.classList.remove("hidden");
        registerBtnText.textContent = "Creating Account...";
        registerBtn.disabled = true;

        setTimeout(() => {

          Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: "You can now login.",
            timer: 1500,
            showConfirmButton: false
          });

          // Reset form
          registerForm.reset();

          // Redirect to login page after success
          setTimeout(() => {
            window.location.href = "login.html";
          }, 1500);

          // Reset button and spinner
          spinner.classList.add("hidden");
          registerBtnText.textContent = "Register";
          registerBtn.disabled = false;

        }, 1500); // Simulate account creation process

    });

});

// ----------------------------
// HORIZONTAL SLIDER FOR PROGRAM
// ----------------------------

 document.addEventListener('DOMContentLoaded', () => {
  const sliderImages = [
    'images/bg1.jpg',
    'images/about1.jpg',
    'images/about3.jpg',
    'images/bg2.jpg',
    'images/bg5.jpg'
  ];

  const sliderContainer = document.querySelector('.slider');
  sliderImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('fade-slide');
    if (index === 0) img.classList.add('active');
    sliderContainer.appendChild(img);
  });

  const slides = document.querySelectorAll('.fade-slide');
  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
});


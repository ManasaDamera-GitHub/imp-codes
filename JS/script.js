document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simulate login (replace with actual API call)
  if (email === "instructor@example.com" && password === "password123") {
    alert("Login successful!");
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
    alert("Invalid email or password");
  }
});

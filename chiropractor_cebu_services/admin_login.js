// =========================
// Toggle Password
// =========================

const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("togglePassword");

toggleBtn.addEventListener("click", () => {
	const isPassword = passwordInput.type === "password";
	passwordInput.type = isPassword ? "text" : "password";
	toggleBtn.textContent = isPassword ? "🙈" : "👁";
});
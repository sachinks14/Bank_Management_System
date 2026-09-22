export const BASE_URL = "http://localhost:5000/api";

// helper so I don't have to repeat try/catch and headers everywhere
async function request(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || (typeof data === "string" ? data : "Something went wrong"));
  }

  return data;
}

export function loginUser(payload) {
  // payload: { mobileNo, password }
  return request("/auth/login", "POST", payload);
}

export function signupUser(payload) {
  // payload: { fullName, email, mobileNo, dateOfBirth, branch, password, amount, accountType }
  // Note: role is never sent - the backend always creates a plain customer account.
  return request("/auth/signup", "POST", payload);
}

export function createAccount(payload) {
  // Admin-only: create an account directly (still customer-only under the hood)
  return request("/admin/accountCreate", "POST", payload);
}

export function deleteAccount(accountId) {
  return request(`/admin/accounts/${accountId}`, "DELETE");
}

export function updateAccount(accountId, payload) {
  // payload: { fullName, mobileNo, dateOfBirth, email } - admin's direct edit
  return request(`/admin/accounts/${accountId}`, "PUT", payload);
}

export function getAccountTransactions(accId) {
  return request(`/admin/accounts/${accId}/transactions`, "GET");
}

export function getNotifications() {
  return request("/admin/notifications", "GET");
}

export function approveNotification(id) {
  return request(`/admin/notifications/${id}/approve`, "POST");
}

export function deleteNotification(id) {
  return request(`/admin/notifications/${id}`, "DELETE");
}

export function sendMoney(payload) {
  // payload: { fromAccount, toAccount, amount, pin, message }
  return request("/user/sendMoney", "POST", payload);
}

export function getBalance(pin) {
  return request("/user/balance", "POST", { pin });
}

export function createOrUpdatePin(payload) {
  // payload: { accId, newPin, oldPin } - leave oldPin as 0 when setting a PIN for the first time
  return request("/user/pin", "POST", payload);
}

// Three distinct requests, all landing as pending items in the admin's Notifications page.

export function requestAdminRole(accId) {
  return request("/user/requests", "POST", { accId, type: "ADMIN_REQUEST" });
}

export function requestOnlineBanking(accId) {
  return request("/user/requests", "POST", { accId, type: "ONLINE_BANKING_REQUEST" });
}

export function requestAccountUpdate(accId, updatePayload) {
  // updatePayload: { fullName, mobileNo, dateOfBirth, email }
  return request("/user/requests", "POST", { accId, type: "UPDATE", update: updatePayload });
}

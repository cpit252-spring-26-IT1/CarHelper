const API_BASE_URL = "http://localhost:8080/api";

export async function registerUser(user) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  const data = await response.json();
  return { response, data };
}

export async function loginUser(user) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  const data = await response.json();
  return { response, data };
}

export async function resetPassword(resetData) {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(resetData)
  });

  const data = await response.json();
  return { response, data };
}

export async function analyzeImage(file, language) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("language", language);

  const response = await fetch(`${API_BASE_URL}/diagnosis/image`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Image analysis failed");
  }

  return response.json();
}

export async function analyzeProblem(problemData, language) {
  const response = await fetch(`${API_BASE_URL}/diagnosis/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...problemData,
      language
    })
  });

  if (!response.ok) {
    throw new Error("Problem analysis request failed");
  }

  return response.json();
}
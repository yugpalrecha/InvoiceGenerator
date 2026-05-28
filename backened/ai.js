const input = document.querySelector("#input");

input?.addEventListener("keyup", handleEnter);

async function handleEnter(e) {
  if (e.key === "Enter") {
    const text = input.value.trim();
    if (!text) return;

    console.log("User input:", text);

    const res = await fetch("http://localhost:8000/api/ai/parse-invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_JWT_TOKEN"
      },
      body: JSON.stringify({
        text: text
      })
    });

    const data = await res.json();
    console.log("AI Response:", data);

    input.value = "";
  }
}

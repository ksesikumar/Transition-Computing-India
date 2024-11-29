document.addEventListener("DOMContentLoaded", async () => {
    const resultsList = document.getElementById("checklist-results");
  
    try {
      // Fetch checklist results from the server
      const response = await fetch("http://localhost:3000/api/checklist");
      const results = await response.json();
  
      results.forEach((rule) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${rule.name}: ${rule.status}`;
        listItem.className = rule.status.toLowerCase();
        resultsList.appendChild(listItem);
      });
    } catch (error) {
      resultsList.textContent = "Failed to load checklist results.";
      console.error("Error:", error.message);
    }
  });
  
export const formatDate = (isoString) => {
    if (!isoString) return ""; // Return empty string if no date provided
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0"); // Ensures two-digit format
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensures two-digit format
  
    // Function to determine the correct suffix (st, nd, rd, th)
    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // Covers 11th - 20th
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    return `${day}${getDaySuffix(day)} ${month}, ${year} at ${hours}:${minutes}`;
  };
  
  export const getTimeTaken = (createdAt, completedAt) => {
    if (!createdAt || !completedAt) return ""; // If either is missing, return empty
    
    const start = new Date(createdAt);
    const end = new Date(completedAt);
    let diff = Math.floor((end - start) / 1000); // Difference in seconds
  
    const months = Math.floor(diff / (30 * 24 * 60 * 60));
    diff %= 30 * 24 * 60 * 60;
    const days = Math.floor(diff / (24 * 60 * 60));
    diff %= 24 * 60 * 60;
    const hours = Math.floor(diff / (60 * 60));
    diff %= 60 * 60;
    const minutes = Math.floor(diff / 60);
  
    let result = [];
    if (months > 0) result.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days > 0) result.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours > 0) result.push(`${hours} hr${hours > 1 ? "s" : ""}`);
    if (minutes > 0) result.push(`${minutes} min`);
  
    return result.length > 0 ? result.join(" ") : "Less than a minute";
  };
  
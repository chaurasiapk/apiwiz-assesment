// ==============================
// JSON Validation Utility
// ==============================
export const isValidJson = (json: string) => {
  try {
    // Try parsing the input string
    JSON.parse(json);
    return true;
  } catch (error) {
    console.error("Invalid JSON:", error);
    return false;
  }
};

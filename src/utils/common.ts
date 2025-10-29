// ==============================
// Path Normalization Utility
// ==============================
export function normalizePath(path: string) {
  // Convert ["key"] or ['key'] to .key format
  return path.replace(/\[(?:'|")([^'"]+)(?:'|")\]/g, ".$1");
}

export async function generateSecureCode() {
  const timestamp = Date.now();
  const msgUint8 = new TextEncoder().encode(timestamp.toString());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  let code = "";
  for (let i = 0; i < 8; i++) {
    const val = hashArray[i] % 36;
    code += val < 26 ? String.fromCharCode(65 + val) : val - 26;
  }
  return code;
}

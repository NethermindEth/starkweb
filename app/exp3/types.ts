const abi = [
    { type: "function", name: "execute", inputs: [] },
    { type: "function", name: "isValidSignature", inputs: [] }
  ] as const; // <-- as const preserves literals
  
  type Names = typeof abi[number]["name"]; // "execute" | "isValidSignature"


  const abi2 = [
    { type: "function", name: "execute", inputs: [] },
    { type: "function", name: "isValidSignature", inputs: [] }
  ]; // <-- No as const
  
  type Names2 = typeof abi2[number]["name"]; // string


  function parseAbi<const T extends any[]>(abi: T): {
    functions: { name: T[number]["name"] }[]
  } {
    return { functions: abi.map(f => ({ name: f.name })) };
  }
  
  const parsed = parseAbi([{ name: "execute" }, { name: "isValidSignature" }] as const);
  type Names3 = typeof parsed.functions[number]["name"]; // "execute" | "isValidSignature"
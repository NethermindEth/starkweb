export function transformSignature(signature: (number | string)[]) {
    return signature.map(value => {
        return BigInt(value).toString();
    });
  }
  
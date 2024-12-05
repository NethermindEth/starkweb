import { ConnectKitButton, useSIWE } from 'starkwebkit';
import { useReadContract } from 'starkweb/react';
import { testAbi } from '../../utils/testAbi';

export default function Home({ address }: { address?: string }) {
  const { data, isSignedIn, signOut, signIn } = useSIWE();
  // console.log({ data, isSignedIn, signOut, signIn });

  const { data: decimals } = useReadContract({
    address: '0x005c475b6089156c0CD4Fc9d64De149992431c442AF882d6332e7c736c99DE91',
    abi: testAbi,
    functionName: 'decimals',
    args: []
  })

  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <ConnectKitButton />
      <div>{JSON.stringify(decimals)}</div>

    </div>
  );
}

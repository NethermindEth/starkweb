import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Web3Provider } from '../components/Web3Provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Web3Provider initialState={pageProps.initialState}>
        <Component {...pageProps} />
      </Web3Provider>
    </ThemeProvider>
  );
}

export default MyApp;

import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '../hooks/auth';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

import '../styles/css/bootstrap.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

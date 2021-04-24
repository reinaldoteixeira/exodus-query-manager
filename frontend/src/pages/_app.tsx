import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '../hooks/auth';
import FetchProvider from '../hooks/fetch';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

import '../styles/css/bootstrap.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <FetchProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <GlobalStyle />
        </ThemeProvider>
      </FetchProvider>
    </AuthProvider>
  );
};

export default App;

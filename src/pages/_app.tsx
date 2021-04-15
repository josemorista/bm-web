import { ThemeProvider } from 'styled-components';

import { theme } from '../themes';
import { GlobalStyles } from '../GlobalStyles';

function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Component {...pageProps} />
  </ThemeProvider>;
}

export default MyApp

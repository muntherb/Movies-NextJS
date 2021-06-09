import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastProvider } from 'react-toast-notifications';

import './common.css'

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const App = ({ Component, pageProps }) => {
  return(
  <ToastProvider autoDismiss={true} autoDismissTimeout={3000} placement="top-right">
      <Component {...pageProps} />;
  </ToastProvider>
  )
};

export default App;
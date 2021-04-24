import { SWRConfig } from 'swr';
import api from '../services/api';

const FetchProvider: React.FC = ({ children }) => (
  <SWRConfig
    value={{
      fetcher: (url) => api.get(url).then((response) => response.data),
      revalidateOnFocus: false,
    }}
  >
    {children}
  </SWRConfig>
);

export default FetchProvider;

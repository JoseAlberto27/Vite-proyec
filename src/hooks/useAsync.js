import { useCallback, useState } from 'react';
import { getErrorMessage } from '@utils/errorHandler.js';

export function useAsync(asyncFunction) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await asyncFunction(...args);
        setData(response);
        return response;
      } catch (requestError) {
        const message = getErrorMessage(requestError);
        setError(message);
        throw requestError;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction]
  );

  return { data, error, isLoading, execute };
}

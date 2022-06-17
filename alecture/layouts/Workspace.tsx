import React, { FC, useCallback } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';

const Workspace: FC = ({ children }) => {
  const { data, error, mutate } = useSWR('/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate();
      });
  }, []);

  return (
    <div>
      <button onClick={onLogout}>Log out</button>
      {children};
    </div>
  );
};

export default Workspace;

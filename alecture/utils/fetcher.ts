import axios from 'axios';

const fetcher = <Data>(url: string) =>
  axios
    .get<Data>(url, {
      withCredentials: true,
    })
    .then((resopnse) => resopnse.data);

export default fetcher;

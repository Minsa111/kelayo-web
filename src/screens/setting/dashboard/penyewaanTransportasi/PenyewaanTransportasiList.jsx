import { useEffect, useRef, useState } from 'react';
import {
  getAllRentTransportationAPI,
  getListRentTransportationByRoleAPI,
} from '../../../../api/rentTransportation';
import { TableRentTransportation } from '../../../../components';
import useSnackbar from '../../../../components/Snackbar';

export default (props) => {
  const { user } = props;
  const { openSnackbarError } = useSnackbar();
  const [rentTransportationList, setRentTransportationList] = useState([]);

  const [loading, setLoading] = useState(false);

  const signal = useRef();
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    if (signal.current) signal.current.abort();
    signal.current = new AbortController();

    setLoading(true);
    const params = {};
    if (user.role !== 'admin') params.id = user.id;
    const api =
      user.role === 'admin' ? getAllRentTransportationAPI : getListRentTransportationByRoleAPI;
    api(params, signal.current?.signal)
      .then((res) => setRentTransportationList(res))

      .catch((err) => openSnackbarError(err))
      .finally(() => setLoading(false));
  };
  return <TableRentTransportation data={rentTransportationList} loading={loading} />;
};

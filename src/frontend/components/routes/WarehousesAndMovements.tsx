import React, {FC} from 'react';
import WarehousesList from '../WarehousesList/WarehousesList';
import { useQuery, gql } from '@apollo/client';
import WarehouseBasicInfo from 'src/frontend/common/interfaces/IWarehouseBasicInfo';
import CreateExport from '../CreateExport/CreateExport';

const ALL_WAREHOUSES_QUERY = gql`
  query {
    AllWarehouses {
      id
      name
    }
  }
`;

const WarehousesAndMovements: FC = () => {

    const { data, loading, error } = useQuery(ALL_WAREHOUSES_QUERY);

    if (loading) return  <p>Loading...</p>;
    if (error) return <p>{data.message}</p>;

    const warehouses: WarehouseBasicInfo[] = data.AllWarehouses;

    return (
        <>
            <WarehousesList warehousesList={warehouses} />
            <CreateExport warehousesList={warehouses} />
        </>
    );
}

export default WarehousesAndMovements;
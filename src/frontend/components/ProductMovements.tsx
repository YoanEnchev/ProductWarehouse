import React, { useState, useEffect } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';

const ALL_WAREHOUSES_QUERY = gql`
  query {
    AllWarehouses {
      id
      name
    }
  }
`;

const WAREHOUSE_DETAILS_QUERY = gql`
  query GetWarehouseDetails($id: Int!) {
    WarehouseDetails(id: $id) {
      id
      name
      capacity
      freeCapacityRemaining
      imports {
        actionDate
        units
        fromWarehouse {
          id
          name
        }
        product {
          id
          name
        }
      }
      exports {
  			actionDate
        units
      	toWarehouse {
          id
          name
        }
      }
    }
  }   
`;

const ProductMovements: React.FC = () => {
  const { data: allWarehousesData, loading: allWarehousesLoading, error: allWarehousesError } = useQuery(ALL_WAREHOUSES_QUERY);
  const [getWarehouse, { data: warehouseDetailsData, loading: warehouseDetailsLoading, error: warehouseDetailsError }] = useLazyQuery(WAREHOUSE_DETAILS_QUERY);
  const [activeWarehouseId, setActiveWarehouseId] = useState<number | null>(null);

  if (allWarehousesLoading) return "Loading...";
  if (allWarehousesError) return <pre>{allWarehousesError.message}</pre>;

  const handleWarehouseSelection = (id: number) => {
    setActiveWarehouseId(id);
    getWarehouse({ variables: { id: id } });
  };

  const warehouseDetails = warehouseDetailsData ? warehouseDetailsData.WarehouseDetails : null;

  return (
    <div>
      <h1>Product Movements</h1>
      <p>Select warehouse and track movements.</p>

      <ul className="nav nav-pills">
        {allWarehousesData.AllWarehouses.map((warehouse) => (
          <li className="nav-item" key={warehouse.id}>
            <button
              className={"nav-link" + (warehouse.id === activeWarehouseId ? ' active' : '')}
              onClick={() => handleWarehouseSelection(warehouse.id)}
            >
              {warehouse.name}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        {warehouseDetailsLoading ? <p>Loading...</p> : <>
          {warehouseDetailsError ? <p>Error: {warehouseDetailsError}</p> : (warehouseDetails ? <>
            <p>Selected Warehouse ID: {warehouseDetails.id}</p>
            <p>Name: {warehouseDetails.name}</p>
            <p>Total Capacity: {warehouseDetails.capacity}</p>
            <p>Space remaining: {warehouseDetails.freeCapacityRemaining}</p>
          </> :<p>No warehouse has been selected.</p>)}
        </>}
      </div>
    </div>
  );
};

export default ProductMovements;

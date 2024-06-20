import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import Product from '../common/interfaces/IProduct';

const ALL_PRODUCTS_QUERY = gql`
  query AllProducts {
    AllProducts {
      id
      name
      sizePerUnit
      amountOfUnitsOutsideOfWarehouses
      isHazardous
    }
  }
`;

const ProductsList: FC = () => {
  const { loading, error, data } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products: Product[] = data.AllProducts;

  return (
    <div>
      <h3 className="text-center">Product List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Size Per Unit</th>
            <th>Amount outside of warehouse</th>
            <th>Hazardous</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.sizePerUnit}</td>
              <td>{product.amountOfUnitsOutsideOfWarehouses}</td>
              <td>{product.isHazardous ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;

import React, {FC} from 'react';
import ProductEntry from '../ProductEntry';
import ProductsList from '../ProductsList';

const ProductManagement: FC = () => {
  return (
    <>
      <ProductEntry />
      <ProductsList />
    </>
  );
}

export default ProductManagement;
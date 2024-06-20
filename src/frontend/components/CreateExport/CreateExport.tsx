import React, { FC, ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import ICreateExport from './ICreateExport';
import WarehouseBasicInfo from 'src/frontend/common/interfaces/IWarehouseBasicInfo';
import IOption from './IOption';
import Product from 'src/frontend/common/interfaces/IProduct';

const CREATE_EXPORT_MUTATION = gql`
  mutation CreateExport($input: CreateExportDto!) {
    createExport(createExportDto: $input) {
      fromWarehouseId
      toWarehouseId
      productId
      units
    }
  }
`;

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

const CreateExport: FC<ICreateExport> = ({warehousesList}) => {

  const [loadProducts, { loading: productsLoading, error: productsError, data: productsData }] = useLazyQuery(ALL_PRODUCTS_QUERY);

  useEffect(() => {
    loadProducts();
  }, []);

  const outsideOfWarehouseOption: IOption = {
    label: 'Outside of warehouse',
    value: ''
  }
  
  const warehouseOptions: IOption[] = [
    outsideOfWarehouseOption, 
    ...warehousesList.map((warehouse: WarehouseBasicInfo) => {
      const option: IOption = {
        label: warehouse.name,
        value: warehouse.id + ''
      } 

      return option;
    })
  ];

  const [fromWarehouseId, setFromWarehouseId] = useState<string>(warehouseOptions[0].value);
  const [toWarehouseId, setToWarehouseId] = useState<string>(warehouseOptions[1].value);
  const [productId, setProductId] = useState<string>('');
  const [units, setUnits] = useState<string>('');
  const [formSubmitErrorMessage, setFormSubmitErrorMessage] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fromWarehouseOptions: IOption[] = warehouseOptions.filter((op: IOption) => op.value != toWarehouseId);
  const toWarehouseOptions: IOption[] = warehouseOptions.filter((op: IOption) => op.value != fromWarehouseId);

  const [createExport] = useMutation(CREATE_EXPORT_MUTATION, {
    onCompleted: () => {
      setShowSuccessMessage(true);
      setFormSubmitErrorMessage('');
      setLoading(false);
    },
    onError: (error) => {
      // @ts-ignore
      setFormSubmitErrorMessage(error.graphQLErrors[0].extensions.originalError.message[0]);
      setShowSuccessMessage(false);
      setLoading(false);
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    createExport({
      variables: {
        input: {
          fromWarehouseId,
          toWarehouseId,
          productId,
          units: parseInt(units),
        },
      },
    });
  };

  const formFieldChange = () => {
    setFormSubmitErrorMessage('');
    setShowSuccessMessage(false);
  };

  const handleFromWarehouseIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFromWarehouseId(event.target.value);
    formFieldChange();
  };

  const handleToWarehouseIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setToWarehouseId(event.target.value);
    formFieldChange();
  };

  const handleProductIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setProductId(event.target.value);
    formFieldChange();
  };

  const handleUnitsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUnits(event.target.value);
    formFieldChange();
  };

  if (productsLoading) return <p>Loading...</p>;
  if (productsError) return <p>Error: {productsError.message}</p>

  const products: Product[] = productsData?.AllProducts || [];

  return (
    <>
      <h3 className="text-center mb-3">Create Export</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fromWarehouseId" className="form-label">From Warehouse</label>
          <select
            id="fromWarehouseId"
            name="fromWarehouseId"
            className="form-control"
            value={fromWarehouseId}
            onChange={handleFromWarehouseIdChange}
          >
            {fromWarehouseOptions.map((option: IOption, index: number) => <option value={option.value} key={index}>{option.label}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="toWarehouseId" className="form-label">To Warehouse</label>
          <select
            id="toWarehouseId"
            name="toWarehouseId"
            className="form-control"
            value={toWarehouseId}
            onChange={handleToWarehouseIdChange}
          >
            {toWarehouseOptions.map((option: IOption, index: number) => <option value={option.value} key={index}>{option.label}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="productId" className="form-label">Product</label>
          <select
            id="productId"
            name="productId"
            className="form-control"
            value={productId}
            onChange={handleProductIdChange}
          >
            {products.map((product: Product, index: number) => <option value={product.id} key={index}>{product.name}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="units" className="form-label">Amount of Units</label>
          <input
            type="number"
            min={1}
            id="units"
            name="units"
            className="form-control"
            value={units}
            onChange={handleUnitsChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>Submit</button>

        {isLoading ? <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div> : null}

        {formSubmitErrorMessage ? <p className="text-danger">{formSubmitErrorMessage}</p> : null}
        {showSuccessMessage ? <p className="text-success">Export created successfully.</p> : null}
      </form>
    </>
  );
};

export default CreateExport;

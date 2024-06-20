import React, { FC, ChangeEvent, FormEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductDto!) {
    createProduct(createProductDto: $input) {
      name
      sizePerUnit
      amountOfUnitsOutsideOfWarehouses
      isHazardous
    }
  }
`;

const ProductEntry: FC = () => {
    const [name, setName] = useState<string>('');
    const [sizePerUnit, setSizePerUnit] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [isHazardous, setIsHazardous] = useState<boolean>(false);

    const [formSubmitErrorMessage, setFormSubmitErrorMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION, {
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

        createProduct({
          variables: {
            input: {
              name: name,
              sizePerUnit: parseInt(sizePerUnit),
              amountOfUnitsOutsideOfWarehouses: parseInt(amount),
              isHazardous: isHazardous,
            },
          },
        });
    };

    const formFieldChange = () => {
        setFormSubmitErrorMessage('');
        setShowSuccessMessage(false);
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        formFieldChange();
    };

    const handleSizePerUnitChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSizePerUnit(event.target.value);
        formFieldChange();
    };

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
        formFieldChange();
    };

    const handleHazardousChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsHazardous(event.target.checked);
        formFieldChange();
    };

    return <>
        <h3 className="text-center mb-3">Product Creation</h3>
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" className="form-control" 
                    id="name" required
                    value={name}
                    onChange={handleNameChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="size-per-unit" className="form-label">Size Per Unit</label>
                <input type="number" name="size_per_unit" className="form-control" 
                    id="size-per-unit" required min="1" max="10"
                    value={sizePerUnit}
                    onChange={handleSizePerUnitChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input type="number" name="amount" className="form-control" 
                    id="amount" required min="1" max="1000"
                    value={amount}
                    onChange={handleAmountChange}/>
            </div>
            <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="is-hazardous" checked={isHazardous} 
                  onChange={handleHazardousChange}/>
                <label className="form-check-label" htmlFor="is-hazardous">
                    Is Hazardous
                </label>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>Create</button>

            {isLoading ? <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> : <></>}

            {formSubmitErrorMessage ? <p className="text-danger">{formSubmitErrorMessage}</p> : <></>}
            {showSuccessMessage ? <p className="text-success">Created product successfully.</p> : <></>}
        </form>
    </>
};

export default ProductEntry;
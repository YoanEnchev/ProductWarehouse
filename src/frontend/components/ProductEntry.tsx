import React, { FC, ChangeEvent, FormEvent, useState } from 'react';
import getAppBaseURL from '../helpers/getAppBaseURL';

const ProductEntry: FC = () => {

    const [name, setName] = useState<string>('');
    const [sizePerUnit, setSizePerUnit] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [isHazardous, setIsHazardous] = useState<boolean>(false);

    const [formSubmitErrorMessage, setFormSubmitErrorMessage] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)

        try {
            const res: Response = await fetch(`${getAppBaseURL()}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    sizePerUnit,
                    amount,
                    isHazardous
                }),
            })

            if (res.ok) {
                setShowSuccessMessage(true);
                return;
            }

            res.json().then(errResponse => setFormSubmitErrorMessage(errResponse.message));
        }
        catch (error) {
            setFormSubmitErrorMessage('Service not available. Please try again later.')
        }
        finally {
            setLoading(false)
        }
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

    return <form method="post" onSubmit={handleSubmit}>
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
};

export default ProductEntry;
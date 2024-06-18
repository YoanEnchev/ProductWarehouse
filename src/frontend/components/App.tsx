import React, {FC} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductEntry from './pages/ProductEntry';
import ProductMovements from './pages/ProductMovements';

export enum RoutePaths {
    Home = '/',
    ProductEntry = '/product-entry',
    ProductMovements = '/products-movements',
}

const App: FC = () => {
    return (
        <>
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to={RoutePaths.Home}>Products Warehouse</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to={RoutePaths.Home} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={RoutePaths.ProductEntry} className="nav-link">Product Entry</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={RoutePaths.ProductMovements} className="nav-link">Products Movements</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route path={RoutePaths.Home} element={<Home />} />
                    <Route path={RoutePaths.ProductEntry} element={<ProductEntry />} />
                    <Route path={RoutePaths.ProductMovements} element={<ProductMovements />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
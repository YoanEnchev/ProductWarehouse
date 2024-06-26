import React, {FC} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './routes/Home';
import ProductManagement from './routes/ProductManagement';
import WarehousesAndMovements from './routes/WarehousesAndMovements';
import NotFoundRoute from './routes/NotFoundRoute';

enum RoutePaths {
    Home = '/app/',
    ProductManagement = '/app/product-management',
    WarehousesAndMovements = '/app/warehouses',
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
                                    <Link to={RoutePaths.ProductManagement} className="nav-link">Products Management</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={RoutePaths.WarehousesAndMovements} className="nav-link">Warehouses And Movements</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Routes>
                        <Route path={RoutePaths.Home} element={<Home />} />
                        <Route path={RoutePaths.ProductManagement} element={<ProductManagement />} />
                        <Route path={RoutePaths.WarehousesAndMovements} element={<WarehousesAndMovements />} />
                        <Route path="*" element={<NotFoundRoute/>}/>
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
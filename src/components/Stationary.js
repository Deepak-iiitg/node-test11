import { useState, useEffect } from 'react';
import axios from 'axios';
function Stationary() {
    const [values, setValues] = useState({ name: '', desc: '', price: '', quantity: '' });
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const postData = async (e) => {
        e.preventDefault();
        const message = await axios.post('http://localhost:8000/product', values);
        console.log(message.data.message);
        getData();

    }
    const getData = async () => {
        
        let data = await axios.get('http://localhost:8000/product');
        data = data.data;
        setData(data);
    }
    const increase = async(id, quantity) => {
        let data = await axios.get('http://localhost:8000/product/'+id);
        data = data.data;
        console.log(data);
        data = data[0].quantity;
        data = data-quantity;
        await axios.put('http://localhost:8000/product/'+id,{quantity:data});
        getData();
        //setData(data);
    }
    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">StationaryManagement</span>
                </div>
            </nav>
            <form onSubmit={postData} className="container">
                <div className="form-group mt-3">
                    <label>Product Name</label>
                    <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="enter product name"
                        value={values.name || ''}
                        onChange={(e) => {
                            setValues({ ...values, name: e.target.value })
                        }}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="enter description"
                        value={values.desc || ''}
                        onChange={(e) => {
                            setValues({ ...values, desc: e.target.value })
                        }}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control mt-1"
                        placeholder="enter price"
                        value={values.price || ''}
                        onChange={(e) => {
                            setValues({ ...values, price: e.target.value })
                        }}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Quantity</label>
                    <input
                        type="number"
                        className="form-control mt-1"
                        placeholder="enter quantity"
                        value={values.quantity || ''}
                        onChange={(e) => {
                            setValues({ ...values, quantity: e.target.value })
                        }}
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                        Add Item
                    </button>
                </div>
            </form>
            <div className='container'>
                <table className="table caption-top table-striped table-dark">
                    <caption className='primary'>All Product</caption>
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((d, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{d.name}</td>
                                        <td>{d.description}</td>
                                        <td>{d.price}</td>
                                        <td>{d.quantity}</td>
                                        <td>
                                            <button onClick={async () => {
                                                await increase(d.id, 1)
                                            }} className='btn btn-danger'>Buy1</button>
                                            <button onClick={async () => {
                                                await increase(d.id, 2)
                                            }} className='btn btn-danger'>Buy2</button>
                                            <button onClick={async () => {
                                                await increase(d.id, 3)
                                            }} className='btn btn-danger'>Buy3</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Stationary;
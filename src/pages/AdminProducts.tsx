import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { AdminLayout } from "../components/Admin/AdminLayout";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

// Mock product data
const mockProducts = [
    { id: '1', name: 'Solar Panel 100W', category: 'Solar Panels', price: 15000, availability: true },
    { id: '2', name: 'Inverter 3KW', category: 'Inverters', price: 80000, availability: true },
    { id: '3', name: 'Battery 200Ah', category: 'Batteries', price: 120000, availability: false },
    { id: '4', name: 'Mounting Kit', category: 'Accessories', price: 5000, availability: true },
];

const AdminProducts = () => {
    const [products, setProducts] = useState(mockProducts);

    const handleEdit = (id: string) => {
        console.log('Edit product', id);
        // Implement edit logic here
    };

    const handleDelete = (id: string) => {
        console.log('Delete product', id);
        setProducts(products.filter(p => p.id !== id));
        // Implement delete logic here
    };

    const handleAddProduct = () => {
        console.log('Add new product');
        // Implement add product logic here
    };

    return (
        <AdminLayout>
            <Box sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" gutterBottom>Manage Products</Typography>
                    <Button variant="contained" color="primary" onClick={handleAddProduct}>
                        Add New Product
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell>Availability</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell component="th" scope="row">
                                        {product.id}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell align="right">${product.price.toLocaleString()}</TableCell>
                                    <TableCell>{product.availability ? 'In Stock' : 'Out of Stock'}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" onClick={() => handleEdit(product.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDelete(product.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </AdminLayout>
    );
};

export default AdminProducts;
// import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
// import { AdminLayout } from "../components/Admin/AdminLayout";
// import VisibilityIcon from '@mui/icons-material/Visibility';

// // Mock user data
// const mockUsers = [
//     { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'customer', plan: '6 Month Plan', subscriptionStatus: 'Active' },
//     { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'customer', plan: 'Pay Once', subscriptionStatus: 'N/A' },
//     { id: '3', name: 'Admin User', email: 'admin@echisolar.com', role: 'admin', plan: 'N/A', subscriptionStatus: 'N/A' },
// ];

// const AdminUsers = () => {
//     const handleViewDetails = (id: string) => {
//         console.log('View user details', id);
//         // Implement view details logic here
//     };

//     return (
//         <AdminLayout>
//             <Box sx={{ py: 4 }}>
//                 <Typography variant="h4" gutterBottom>Manage Users</Typography>

//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell>Role</TableCell>
//                                 <TableCell>Payment Plan</TableCell>
//                                 <TableCell>Subscription Status</TableCell>
//                                 <TableCell align="center">Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {mockUsers.map((user) => (
//                                 <TableRow key={user.id}>
//                                     <TableCell component="th" scope="row">
//                                         {user.id}
//                                     </TableCell>
//                                     <TableCell>{user.name}</TableCell>
//                                     <TableCell>{user.email}</TableCell>
//                                     <TableCell>{user.role}</TableCell>
//                                     <TableCell>{user.plan}</TableCell>
//                                     <TableCell>{user.subscriptionStatus}</TableCell>
//                                     <TableCell align="center">
//                                         <IconButton color="primary" onClick={() => handleViewDetails(user.id)}>
//                                             <VisibilityIcon />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </AdminLayout>
//     );
// };

// export default AdminUsers;

import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemText, ListItemButton, ListItemIcon } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import TopNav from "../navigation/TopNav";
import Footer from "../navigation/Footer";
import { Dashboard, ShoppingBag, Subscriptions, AccountCircle } from "@mui/icons-material";
import { useState } from "react";

const UserDashboardPage = () => {
    const { user } = useAuth();
    const [selected, setSelected] = useState('dashboard');

    // Mock data for subscription and orders
    const subscription = {
        plan: "6 Month Plan",
        status: "Active",
        nextPayment: "2025-11-30",
    };

    const orders = [
        { id: "1", date: "2025-10-15", total: "$250.00", status: "Delivered" },
        { id: "2", date: "2025-10-20", total: "$150.00", status: "Shipped" },
    ];

    const renderContent = () => {
        switch (selected) {
            case 'dashboard':
                return (
                    <Grid container spacing={3}>
                        {/* Subscription Details */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Subscription Details
                                </Typography>
                                <Typography><strong>Plan:</strong> {subscription.plan}</Typography>
                                <Typography><strong>Status:</strong> {subscription.status}</Typography>
                                <Typography><strong>Next Payment:</strong> {subscription.nextPayment}</Typography>
                            </Paper>
                        </Grid>

                        {/* User Information */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    User Information
                                </Typography>
                                <Typography><strong>Name:</strong> {user?.name}</Typography>
                                <Typography><strong>Email:</strong> {user?.email}</Typography>
                            </Paper>
                        </Grid>

                        {/* Order History */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Order History
                                </Typography>
                                <List>
                                    {orders.map((order) => (
                                        <ListItem key={order.id} divider>
                                            <ListItemText
                                                primary={`Order #${order.id}`}
                                                secondary={`Date: ${order.date} - Total: ${order.total} - Status: ${order.status}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                );
            case 'products':
                return <Typography>Manage your products here.</Typography>;
            case 'subscriptions':
                return <Typography>Manage your subscriptions here.</Typography>;
            case 'profile':
                return <Typography>Update your profile here.</Typography>;
            default:
                return null;
        }
    }

    return (
        <Box>
            <TopNav />
            <Container maxWidth="lg">
                <Box sx={{ mt: 4, display: 'flex' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2 }}>
                                <List>
                                    <ListItemButton selected={selected === 'dashboard'} onClick={() => setSelected('dashboard')}>
                                        <ListItemIcon><Dashboard /></ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                    </ListItemButton>
                                    <ListItemButton selected={selected === 'products'} onClick={() => setSelected('products')}>
                                        <ListItemIcon><ShoppingBag /></ListItemIcon>
                                        <ListItemText primary="Products" />
                                    </ListItemButton>
                                    <ListItemButton selected={selected === 'subscriptions'} onClick={() => setSelected('subscriptions')}>
                                        <ListItemIcon><Subscriptions /></ListItemIcon>
                                        <ListItemText primary="Subscriptions" />
                                    </ListItemButton>
                                    <ListItemButton selected={selected === 'profile'} onClick={() => setSelected('profile')}>
                                        <ListItemIcon><AccountCircle /></ListItemIcon>
                                        <ListItemText primary="Profile" />
                                    </ListItemButton>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            {renderContent()}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default UserDashboardPage;

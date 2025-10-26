"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  // { label: "Latest", href: "/shop?filter=latest" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { items } = useCart();

  const handleDrawerToggle = () => setMobileOpen((s) => !s);

  const drawer = (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleDrawerToggle} aria-label="close drawer">
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navLinks.map((link) => (
          <ListItemButton key={link.label} component="a" href={link.href} onClick={handleDrawerToggle}>
            <ListItemText primary={link.label} />
          </ListItemButton>
        ))}

        {!user ? (
          <>
            <ListItemButton component="a" href="/login" onClick={handleDrawerToggle}>
              <ListItemText primary="Login" />
            </ListItemButton>
            <ListItemButton component="a" href="/register" onClick={handleDrawerToggle}>
              <ListItemText primary="Sign up" />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton component="a" href="/profile" onClick={handleDrawerToggle}>
              <ListItemText primary={user.name} />
            </ListItemButton>
            <ListItemButton onClick={() => { logout(); handleDrawerToggle(); }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" elevation={0} sx={{ background: 'transparent', color: 'black', px: { xs: 2, md: 6 } }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box component="img" src="/images/logo.png" alt="Echi Solar" sx={{ height: 36 }} />
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Button key={link.label} href={link.href} sx={{ color: 'black', fontWeight: 'bold' }}>
              {link.label}
            </Button>
          ))}

          <Button href="/cart" startIcon={<Badge badgeContent={items.length} color="secondary"><ShoppingCart /></Badge>} sx={{ color: 'black' }}>
            Cart
          </Button>

          {!user ? (
            <>
              <Button href="/login" startIcon={<LoginIcon />}>
                Login
              </Button>
              <Button href="/register" startIcon={<PersonAdd />}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Button href="/profile" startIcon={<AccountCircle />}>
                {user.name}
              </Button>
              <Button onClick={logout} startIcon={<LogoutIcon />}>
                Logout
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="success" href="tel:+2347018090107" sx={{ background: '#f0f4ff', '&:hover': { background: '#e0ebff' } }}>
            <PhoneIcon />
          </IconButton>

          <Button variant="contained" startIcon={<SendIcon />} href="/cart" sx={{ background: '#2E7D4D', color: 'white', fontWeight: 'bold', borderRadius: 2, px: 3, '&:hover': { background: '#FFAB46' }, display: { xs: 'none', md: 'flex' } }}>
            Cart
          </Button>

          <IconButton edge="end" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }} aria-label="open menu">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="top" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
        {drawer}
      </Drawer>
    </AppBar>
  );
}


// "use client";
// import { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Button,
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemText,
//   Badge,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import PhoneIcon from "@mui/icons-material/Phone";
// import SendIcon from "@mui/icons-material/Send";
// import CloseIcon from "@mui/icons-material/Close";
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import ShoppingCart from '@mui/icons-material/ShoppingCart';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import { useAuth } from '../contexts/AuthContext';
// import { useCart } from '../contexts/CartContext';

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "Shop", href: "/shop" },
//   { label: "Latest", href: "/shop?filter=latest" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// export default function TopNav() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const { items } = useCart();

//   const handleDrawerToggle = () => setMobileOpen((s) => !s);

//   const drawer = (
//     <Box sx={{ width: '100%', p: 2 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//         <IconButton onClick={handleDrawerToggle} aria-label="close drawer">
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       <List>
//         {navLinks.map((link) => (
//           <ListItemButton key={link.label} component="a" href={link.href} onClick={handleDrawerToggle}>
//             <ListItemText primary={link.label} />
//           </ListItemButton>
//         ))}

//         {!user ? (
//           <>
//             <ListItemButton component="a" href="/login" onClick={handleDrawerToggle}>
//               <ListItemText primary="Login" />
//             </ListItemButton>
//             <ListItemButton component="a" href="/register" onClick={handleDrawerToggle}>
//               <ListItemText primary="Sign up" />
//             </ListItemButton>
//           </>
//         ) : (
//           <>
//             <ListItemButton component="a" href="/profile" onClick={handleDrawerToggle}>
//               <ListItemText primary={user.name} />
//             </ListItemButton>
//             <ListItemButton
//               onClick={() => {
//                 logout();
//                 handleDrawerToggle();
//               }}
//             >
//               <ListItemText primary="Logout" />
//             </ListItemButton>
//           </>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="static" elevation={0} sx={{ background: 'transparent', color: 'black', px: { xs: 2, md: 6 } }}>
//       <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
//         <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
//           <Box component="img" src="/images/logo.png" alt="Echi Solar" sx={{ height: 36 }} />
//         </Box>

//         <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
//           {navLinks.map((link) => (
//             <Button key={link.label} href={link.href} sx={{ color: 'black', fontWeight: 'bold' }}>
//               {link.label}
//             </Button>
//           ))}

//           <Button href="/cart" startIcon={<Badge badgeContent={items.length} color="secondary"><ShoppingCart /></Badge>} sx={{ color: 'black' }}>
//             Cart
//           </Button>

//           {!user ? (
//             <>
//               <Button href="/login" startIcon={<LoginIcon />}>
//                 Login
//               </Button>
//               <Button href="/register" startIcon={<PersonAdd />}>
//                 Sign up
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button href="/profile" startIcon={<AccountCircle />}>
//                 {user.name}
//               </Button>
//               <Button onClick={logout} startIcon={<LogoutIcon />}>
//                 Logout
//               </Button>
//             </>
//           )}
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <IconButton color="success" href="tel:+2347018090107" sx={{ background: '#f0f4ff', '&:hover': { background: '#e0ebff' } }}>
//             <PhoneIcon />
//           </IconButton>

//           <Button variant="contained" startIcon={<SendIcon />} href="/cart" sx={{ background: '#2E7D4D', color: 'white', fontWeight: 'bold', borderRadius: 2, px: 3, '&:hover': { background: '#FFAB46' }, display: { xs: 'none', md: 'flex' } }}>
//             Cart
//           </Button>

//           <IconButton edge="end" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }} aria-label="open menu">
//             <MenuIcon />
//           </IconButton>
//         </Box>
//       </Toolbar>

//       <Drawer anchor="top" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
//         {drawer}
//       </Drawer>
//     </AppBar>
//   );
// }
// "use client";
// // import { useState } from "react";
// // import {
// //   AppBar,
// //   Toolbar,
// //   IconButton,
// //   Button,
// //   Box,
// //   Drawer,
// //   List,
// //   ListItemButton,
// //   ListItemText,
// //   Badge,
// // } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import PhoneIcon from "@mui/icons-material/Phone";
// // import SendIcon from "@mui/icons-material/Send";
// // import CloseIcon from "@mui/icons-material/Close";
// // import AccountCircle from '@mui/icons-material/AccountCircle';
// // import ShoppingCart from '@mui/icons-material/ShoppingCart';
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import LoginIcon from '@mui/icons-material/Login';
// // import PersonAdd from '@mui/icons-material/PersonAdd';
// // import { useAuth } from '../contexts/AuthContext';
// // import { useCart } from '../contexts/CartContext';

// const navLinks = [
//   { label: "Shop", href: "/shop" },
//   { label: "Latest", href: "/shop?filter=latest" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// export default function TopNav() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const { items } = useCart();

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   const drawer = (
//     <Box sx={{ width: '100%', p:2 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//         <IconButton onClick={handleDrawerToggle}><CloseIcon /></IconButton>
//       </Box>
//       <List>
//         {navLinks.map((link) => (
//           <ListItemButton key={link.label} component="a" href={link.href} onClick={handleDrawerToggle}>
//             <ListItemText primary={link.label} />
//           </ListItemButton>
//         ))}
//         {!user ? (
//           <>
//             <ListItemButton component="a" href="/login" onClick={handleDrawerToggle}><ListItemText primary="Login" /></ListItemButton>
//             <ListItemButton component="a" href="/register" onClick={handleDrawerToggle}><ListItemText primary="Sign up" /></ListItemButton>
//           </>
//         ) : (
//           <>
//             <ListItemButton component="a" href="/profile" onClick={handleDrawerToggle}><ListItemText primary={user.name} /></ListItemButton>
//             <ListItemButton onClick={() => { logout(); handleDrawerToggle(); }}><ListItemText primary="Logout" /></ListItemButton>
//           </>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="static" elevation={0} sx={{ background: 'transparent', color: 'black', px: { xs: 2, md: 6 } }}>
//       <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
//         <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
//           <Box component="img" src="/images/logo.png" alt="Logo" sx={{ height: 36 }} />
//         </Box>

//         <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
//           {navLinks.map((link) => (
//             <Button key={link.label} href={link.href} sx={{ color: 'black', fontWeight: 'bold' }}>{link.label}</Button>
//           ))}

//           <Button href="/cart" startIcon={<Badge badgeContent={items.length} color="secondary"><ShoppingCart /></Badge>} sx={{ color: 'black' }}>Cart</Button>

//           {!user ? (
//             <>
//               <Button href="/login" startIcon={<LoginIcon />}>Login</Button>
//               <Button href="/register" startIcon={<PersonAdd />}>Sign up</Button>
//             </>
//           ) : (
//             <>
//               <Button href="/profile" startIcon={<AccountCircle />}>{user.name}</Button>
//               <Button onClick={logout} startIcon={<LogoutIcon />}>Logout</Button>
//             </>
//           )}
//         </Box>

//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <IconButton color="success" href="tel:+2347018090107" sx={{ background: '#f0f4ff', '&:hover': { background: '#e0ebff' } }}>
//             <PhoneIcon />
//           </IconButton>

//           <Button variant="contained" startIcon={<SendIcon />} href="/cart" sx={{ background: '#2E7D4D', color: 'white', fontWeight: 'bold', borderRadius: 2, px: 3, '&:hover': { background: '#FFAB46' }, display: { xs: 'none', md: 'flex' } }}>Cart</Button>

//           <IconButton edge="end" onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
//             <MenuIcon />
//           </IconButton>
//         </Box>
//       </Toolbar>

//       <Drawer anchor="top" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>{drawer}</Drawer>
//     </AppBar>
//   );
// }
// "use client";
// import { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Button,
//   Box,
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemText,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import PhoneIcon from "@mui/icons-material/Phone";
// import SendIcon from "@mui/icons-material/Send";
// import CloseIcon from "@mui/icons-material/Close";

// const navLinks = [
//   { label: "Shop", href: "/shop" },
//   { label: "Latest", href: "/shop?filter=latest" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// export default function TopNav() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <Box sx={{ width:"100%", p: 2, }}>
//       {/* Close button at the top */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", width:"100%" }}>
//         <IconButton onClick={handleDrawerToggle}>
//           <CloseIcon />
//         </IconButton>
//       </Box>

//       {/* Navigation links */}
//     import MenuIcon from "@mui/icons-material/Menu";
//         {navLinks.map((item) => (
//           <ListItemButton
//             key={item.label}
//     import AccountCircle from '@mui/icons-material/AccountCircle';
//     import ShoppingCart from '@mui/icons-material/ShoppingCart';
//     import LogoutIcon from '@mui/icons-material/Logout';
//     import LoginIcon from '@mui/icons-material/Login';
//     import PersonAdd from '@mui/icons-material/PersonAdd';
//     import { useAuth } from '../contexts/AuthContext';
//     import { useCart } from '../contexts/CartContext';
//             component="a"
//             href={item.href}
//             onClick={handleDrawerToggle} // close drawer on click
//           >
//             <ListItemText primary={item.label} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Box>
//   );
//       const { user, logout } = useAuth();
//       const { items } = useCart();

//   return (
//     <AppBar
//       position="static"
//       elevation={0}
//       sx={{
//         background: "transparent",
//         color: "black",
//         px: { xs: 2, md: 6 },
//       }}
//     >
//       <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
//         {/* Logo */}
//         <Box
//           component="a"
//           href="/"
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//           }}
//         >
//           <Box
//             component="img"
//             src="/images/logo.png" // replace with your actual logo path
//             alt="Logo"
//             sx={{ height: 30 }}
//           />
//         </Box>

//         {/* Desktop Links */}
//         <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
//           {navLinks.map((item) => (
//             <Button
//               key={item.label}
//               href={item.href}
//               sx={{
//                 color: "black",
//                 fontWeight: "bold",
//                 "&:hover": { color: "#1976d2" },
//               }}
//             >
//               {item.label}
//             </Button>
//           ))}
//         </Box>

//         {/* Right Side Icons */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <IconButton
//             color="success"
//             href="tel:+2347018090107"
//             sx={{
//               background: "#f0f4ff",
//               "&:hover": { background: "#e0ebff" },
//             }}
//           >
//             <PhoneIcon />
//           </IconButton>

//           <Button
//             variant="contained"
//             startIcon={<SendIcon />}
//             href="/cart"
//             sx={{
//               background: "#2E7D4D",
//               color: "white",
//               fontWeight: "bold",
//               borderRadius: 2,
//               px: 3,
//               "&:hover": { background: "#FFAB46" },
//               display: { xs: "none", md: "flex" },
//             }}
//           >
//             Cart
//           </Button>

//           {/* Mobile Menu Button */}
//           <IconButton
//             color="inherit"
//             edge="end"
//             onClick={handleDrawerToggle}
//             sx={{ display: { md: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Box>
//       </Toolbar>

//       {/* Drawer for Mobile */}
//       <Drawer
//         anchor="top"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}
//       >
//         {drawer}
//       </Drawer>
//     </AppBar>
//   );
// }

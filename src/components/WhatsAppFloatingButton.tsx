import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { COMPANY_WHATSAPP_URL } from "../config/company";

const WhatsAppFloatingButton = () => {
  const [consentVisible, setConsentVisible] = useState(false);

  useEffect(() => {
    try {
      setConsentVisible(!localStorage.getItem("echi_consent"));
    } catch {
      setConsentVisible(false);
    }
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        left: { xs: 14, md: 20 },
        bottom: {
          xs: consentVisible ? "calc(env(safe-area-inset-bottom, 0px) + 78px)" : "calc(env(safe-area-inset-bottom, 0px) + 14px)",
          md: consentVisible ? 84 : 20,
        },
        zIndex: 1200,
      }}
    >
      <IconButton
        component="a"
        href={COMPANY_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with EchiSolar on WhatsApp"
        sx={{
          width: { xs: 52, md: 56 },
          height: { xs: 52, md: 56 },
          backgroundColor: "#25D366",
          color: "#FFFFFF",
          boxShadow: "0 10px 24px rgba(37, 211, 102, 0.4)",
          border: "1px solid rgba(255,255,255,0.75)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease",
          "&:hover": {
            backgroundColor: "#20BE5A",
            transform: "translateY(-2px)",
            boxShadow: "0 14px 28px rgba(37, 211, 102, 0.5)",
            filter: "saturate(1.08)",
          },
        }}
      >
        <FaWhatsapp size={28} />
      </IconButton>
    </Box>
  );
};

export default WhatsAppFloatingButton;

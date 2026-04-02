// PlayPro Store Constants

export const SITE_CONFIG = {
  name: "PlayPro Calculator",
  description: "India's #1 Pickleball Business Calculator",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://calculator.playpro.fit",
  supportEmail: "support@playpro.fit",
};

export const PRODUCTS = {
  calculator_store: {
    id: "calculator_store",
    name: "PlayPro™ Pickleball Business Blueprint & Calculator",
    description: "CAPEX + OPEX + Revenue + ROI sheets, fully editable, works in Excel & Google Sheets. Includes Vendor Directory (India) + Investor Pitch Deck Template.",
    price: 499,
    oldPrice: 1999,
    file_path: "products/PlayPro_Pickleball_Business_Blueprint.xlsx",
  }
};

export const BRAND_COLORS = {
  primary: "#b8ff47", // Neon Lime
  secondary: "#00a651", // Forest Green
  background: "#0B0F0E",
};

export const SIGNED_URL_EXPIRY = 604800; // 7 days in seconds

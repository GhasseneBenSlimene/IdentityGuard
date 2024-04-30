/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px", // Small-medium breakpoint (custom)
        md: "667px",
        mdl: "768px", // Medium-large breakpoint (custom)
        lg: "960px",
        lgl: "1024px", // Large-large breakpoint (custom)
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["Poppins", "sans-serif"],
        titleFont: ["Montserrat", "sans-serif"],
      },
      colors: {
        bodyColor: "#f5f5f5", // Dark bluish-gray (base)
        lightText: "#000000", // Light grayish-white for readability
        boxBg: "linear-gradient(145deg, #1e2024, #23272b)", // Subtle gradient for boxes
        designColor: "#007bff", // Royal blue accent color (complementary)
        primary: "#000000", // Gold for primary elements (optional)
        secondary: "#FFFFFF", // Light coral for secondary elements (optional)
      },
      backgroundImage: theme => ({
        'custom-bg': "url('./pages/Verifier/verif.jpeg')",
      })
    },
  },
  plugins: [],
};

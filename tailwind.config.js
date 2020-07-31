// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        "2xs": "0.7rem"
      },
      textColor: {
        "medium-emphasis": "rgba(255,255,255,0.8)",
        "low-emphasis": "rgba(255,255,255,0.6)"
      },
      backgroundColor: {
        "black-main": "#121212"
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      const selectUtilities = {
        ".unselectable": {
          "-webkit-user-select": "none",
          "-khtml-user-select": "none",
          "-moz-user-select": "none",
          "-ms-user-select": "none",
          "user-select": "none"
        }
      };

      addUtilities(selectUtilities);
    }
  ]
};

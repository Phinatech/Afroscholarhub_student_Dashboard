/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
				sm: { min: "300px", max: "767px" },
				// => @media (min-width: 640px and max-width: 767px) { ... }
				md: { min: "768px", max: "1023px" },
				// => @media (min-width: 768px and max-width: 1023px) { ... }
				lg: { min: "1024px", max: "5000px" },
				// => @media (min-width: 1024px and max-width: 1279px) { ... }
				xl: { min: "1280px", max: "5000px" },
				// => @media (min-width: 1280px and max-width: 1535px) { ... }
				"2xl": { min: "1536px" },
				// => @media (min-width: 1536px) { ... }
				xxl: { min: "1536px", max: "2560px" },
      },
      fontFamily:{
        mont : ['Montserrat', 'sans-serif'],
        pop : ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'auth-bg' : "url('/src/assets/authImages/signUpSelect1.png')",
        'auth-bg2' : "url('/src/assets/authImages/signinStudent.png')",
        'auth-bg3' : "url('/src/assets/authImages/signinExpert.png')",
      }
    },
  },
  plugins: [],
}
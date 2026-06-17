'use client';

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

// Client boundary for the MUI theme. Creating/holding the theme here (rather
// than passing it from the server layout) avoids serializing theme functions
// across the server/client boundary.
export default function ThemeRegistry({ children }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

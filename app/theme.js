import { createTheme } from "@mui/material/styles";

// Single source of truth for the app's look. Consolidates the colors that were
// previously hardcoded across components into one theme, while keeping the
// existing identity (blue primary, dark-grey AppBar, red destructive actions,
// the beige/navy data grid). Roboto is loaded in app/layout.js.

// Shared tokens reused by components (e.g. the DataGrid case colors) so they
// no longer live as magic hex values in JSX.
export const dataGridColors = {
	headerBg: "#E3DAC9",
	headerText: "#114e8b",
	cellText: "#1a3e72",
};

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#1976d2",
		},
		error: {
			main: "#d32f2f",
		},
		background: {
			default: "#f6f7f9",
			paper: "#ffffff",
		},
		text: {
			primary: "#1f2a37",
			secondary: "#5b6675",
		},
		// Custom token for the fixed top navigation bar.
		appbar: {
			main: "#2f3133",
			contrastText: "#ffffff",
		},
	},
	shape: {
		borderRadius: 10,
	},
	typography: {
		fontFamily: [
			"Roboto",
			"-apple-system",
			"BlinkMacSystemFont",
			"Segoe UI",
			"Arial",
			"sans-serif",
		].join(","),
		h1: { fontWeight: 700 },
		h2: { fontWeight: 700 },
		h3: { fontWeight: 700 },
		h4: { fontWeight: 700 },
		h5: { fontWeight: 600 },
		h6: { fontWeight: 600 },
		button: {
			textTransform: "none",
			fontWeight: 600,
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 8,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				rounded: {
					borderRadius: 14,
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
				},
			},
		},
	},
});

export default theme;

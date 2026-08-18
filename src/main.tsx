import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import {BrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>,
)
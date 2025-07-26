import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './providers/CartProvider.jsx';
import { AuthProvider } from './providers/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<CartProvider>
					{/* le paso app como children */}
					<App /> 
				</CartProvider>
			</AuthProvider>
		</BrowserRouter>
  </StrictMode>,
)

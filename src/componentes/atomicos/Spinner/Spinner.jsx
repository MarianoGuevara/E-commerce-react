import './Spinner.css'

export function Spinner({}) {
	const spinner = document.createElement('div');
        spinner.id = 'spinner';
        spinner.style.position = 'fixed';
        spinner.style.top = '0';
        spinner.style.left = '0';
        spinner.style.width = '100%';
        spinner.style.height = '100%';
        spinner.style.backgroundColor = 'rgba(128, 128, 128, 0.5)'; // Pantalla gris con opacidad
        spinner.style.display = 'flex';
        spinner.style.alignItems = 'center';
        spinner.style.justifyContent = 'center';
        spinner.style.color = 'white';
        spinner.style.fontSize = '24px';
        spinner.style.zIndex = '1000'; // Asegúrate de que esté por encima de otros elementos
    
        const texto = document.createElement('div');
        texto.textContent = '...'; // El texto que quieres mostrar
        spinner.appendChild(texto);
	
		return <div className='spinner'>...</div>
}
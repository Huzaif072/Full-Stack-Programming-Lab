import './styles/styles.css';
import logo from './assets/logo.png';

document.querySelector('#logo').src = logo;

document.getElementById('addToCartBtn').addEventListener('click', function () {
    window.location.href = 'debitStep.html';
});


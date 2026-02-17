import './styles/styles.css';
import logo from './assets/logo.png';

document.querySelector('#logo').src = logo;

document.getElementById('checkoutBtn').addEventListener('click', function () {
    window.location.href = 'submit.html';
});
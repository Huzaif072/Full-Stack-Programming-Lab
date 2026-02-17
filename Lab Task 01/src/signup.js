import './styles/styles.css';
import logo from './assets/logo.png';

document.querySelector('#logo').src = logo;

document.getElementById('signUpBtn').addEventListener('click', function () {
    window.location.href = 'membershipForm.html';
});
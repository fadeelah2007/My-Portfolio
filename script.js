document.addEventListener('DOMContentLoaded', () => {
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');

const icon = menuIcon.querySelector('i');
if (icon) {
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
     link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuIcon.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
            }
        });
    });
}

const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
if (toggleBtn) {
    toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    toggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
            
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
            
        const btn = form.querySelector('button');
        const originalBtnText = btn.innerHTML;

        btn.disabled = true;
        if (result) result.innerHTML = "Sending...";

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status == 200) {
                if (result) result.innerHTML = "Sent! ✨";
                form.reset();
            } else {
                const jsonRes = await response.json();
                if (result) result.innerHTML = "Error: " + jsonRes.message;
            }
        })
        .catch(error => {
            console.error(error);
            if (result) result.innerHTML = "Network Error. Please try again.";
        })
        .finally(() => {
            btn.disabled = false;
            setTimeout(() => {
                if (result) result.innerHTML = "";
                }, 5000);
            });
        });
    }
});
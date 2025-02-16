// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('urlInput');
    const button = document.querySelector('button');
    const qrContainer = document.getElementById('qrContainer');

    button.addEventListener('click', async () => {
        const url = input.value.trim();
        if (!url) {
            alert('Please enter a URL');
            return;
        }

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            if (!response.ok) throw new Error('Failed to generate QR code');

            const data = await response.json();
            qrContainer.innerHTML = `<img src="${data.qrCodeUrl}" alt="QR Code">`;
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while generating the QR code.');
        }
    });
});

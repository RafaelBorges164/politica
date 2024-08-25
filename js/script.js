function applyWatermark() {
    const fileInput = document.getElementById('upload');
    const watermarkText = document.getElementById('watermark').value;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('download-btn');
    const shareLinkDiv = document.querySelector('.share-link');
    const shareableLinkInput = document.getElementById('shareable-link');

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            ctx.font = '48px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);

            // Exibe o botão de download após aplicar a marca d'água
            downloadBtn.style.display = 'block';

            // Gera o link compartilhável
            const imgDataURL = canvas.toDataURL('image/png');
            const shareableLink = `${window.location.origin}${window.location.pathname}?image=${encodeURIComponent(imgDataURL)}&watermark=${encodeURIComponent(watermarkText)}`;
            shareableLinkInput.value = shareableLink;
            shareLinkDiv.style.display = 'block';
        }
        img.src = event.target.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const downloadLink = document.createElement('a');

    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'imagem-com-marca-dagua.png';
    downloadLink.click();
}

function loadFromUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const image = urlParams.get('image');
    const watermarkText = urlParams.get('watermark');

    if (image && watermarkText) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            ctx.font = '48px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);

            document.getElementById('download-btn').style.display = 'block';
        };
        img.src = image;
    }
}

// Carrega a imagem e a marca d'água a partir dos parâmetros da URL, se existirem
window.onload = loadFromUrlParams;

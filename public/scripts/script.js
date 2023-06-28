const form = document.querySelector('form');
const fileInfoDiv = document.querySelector('#file-info');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const fileInfos = await response.json();
        fileInfoDiv.innerHTML = '';

        fileInfos.forEach((fileInfo, index) => {
            const fileDetails = document.createElement('div');
            fileDetails.innerHTML = `
                <p>Nombre: ${fileInfo.filename}</p>
                <p>Nombre original: ${fileInfo.originalname}</p>
                <p>Tamaño: ${fileInfo.size} bytes</p>
                <p>Tipo MIME: ${fileInfo.mimetype}</p>
                <hr>
            `;
            fileDetails.classList.add('animate__animated', 'animate__fadeInUp');
            fileDetails.style.animationDelay = `${index * 0.2}s`;
            fileInfoDiv.appendChild(fileDetails);
        });

    } else {
        fileInfoDiv.innerHTML = 'Error al cargar los archivos.';
    }
});
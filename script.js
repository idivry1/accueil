document.getElementById('startButton').addEventListener('click', function() {
    const startTime = performance.now();
    const imageUrl = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'; // URL d'image pour tester

    fetch(imageUrl)
        .then(response => {
            const endTime = performance.now();
            const duration = endTime - startTime;
            document.getElementById('result').innerText = `Temps de chargement : ${duration.toFixed(2)} ms`;
            document.getElementById('result').classList.remove('hidden');
        })
        .catch(error => {
            document.getElementById('result').innerText = 'Erreur lors du test de connexion.';
            document.getElementById('result').classList.remove('hidden');
        });
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.catForm');
    const catFactDiv = document.getElementById('catFact');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        try {
            const response = await fetch('https://cat-fact.herokuapp.com/facts');

            if(!response.ok) {
                throw new Error('Could not fetch resource');
            }

            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomFact = data[randomIndex].text;

            catFactDiv.textContent = randomFact;
            catFactDiv.style.display = 'block'
        } catch(error) {
            console.error(error);
        }
    })
})


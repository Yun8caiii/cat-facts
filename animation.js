const button = document.getElementById('runawayButton');
          const body = document.body;
          const hoverCountDisplay = document.getElementById('hoverCount');
          const catFactDiv = document.getElementById('catFact');
          let hoverCount = 0;  // Initialize the hover count

          // Create an element for the "U SUCK HAHAH" message
          const suckMessage = document.createElement('div');
          suckMessage.textContent = 'U SUCK HAHAH';
          suckMessage.style.display = 'none';  // Initially hidden
          suckMessage.style.fontSize = '2em';
          suckMessage.style.color = 'red';
          document.body.appendChild(suckMessage);  // Append it to the body

          // Function to move the button to a random position
          function moveButton() {
            const x = Math.random() * (window.innerWidth - button.clientWidth);
            const y = Math.random() * (window.innerHeight - button.clientHeight);
            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
          }

          // Function to fetch a random cat fact
          async function fetchCatFact() {
            try {
              const response = await fetch('https://cat-fact.herokuapp.com/facts');
              const data = await response.json();
              
              // Select a random fact from the array of facts
              const randomFact = data[Math.floor(Math.random() * data.length)].text;
              
              // Display the fact in the #catFact div
              catFactDiv.textContent = randomFact;
              catFactDiv.style.display = 'block';  // Make sure the div is visible
            } catch (error) {
              console.error('Error fetching cat fact:', error);
              catFactDiv.textContent = 'Failed to fetch cat fact.';
            }
          }

          // Mouseover event to count how many times the button is hovered without clicking
          button.addEventListener('mouseover', () => {
            const shouldMove = Math.random() < 0.95;

            // Random color generation for the background
            const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
            body.style.backgroundColor = randomColor;

            if (shouldMove) {
              moveButton();

              // Increment the hover count and update the display
              hoverCount++;
              hoverCountDisplay.textContent = `missed: ${hoverCount}`;

              // If hover count is greater than 50, show the "U SUCK HAHAH" message
              if (hoverCount > 50) {
                suckMessage.style.display = 'block';  // Show the message
              }
            }
          });

          // Click event to move the button and fetch a cat fact when clicked
          button.addEventListener('click', (e) => {
            e.preventDefault();
            moveButton();  // Move the button on click
            fetchCatFact();  // Fetch and display a cat fact
          });
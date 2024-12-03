document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    
    startButton.addEventListener('click', function() {
        // Collect all the values
        const config = {
            filters: {
                firstCreator: document.getElementById('firstCreator').checked,
                devOut: document.getElementById('devOut').checked,
                fundedCex: document.getElementById('fundedCex').checked,
                uniqueSocials: document.getElementById('uniqueSocials').checked,
                oneSocial: document.getElementById('oneSocial').checked,
                websiteWorking: document.getElementById('websiteWorking').checked,
                uniqueImage: document.getElementById('uniqueImage').checked,
                uniqueName: document.getElementById('uniqueName').checked
            },
            parameters: {
                marketCap: document.getElementById('marketCap').value,
                minHolders: document.getElementById('minHolders').value,
                maxDevBuy: document.getElementById('maxDevBuy').value,
                minDevBuy: document.getElementById('minDevBuy').value,
                maxCoinAge: document.getElementById('maxCoinAge').value
            },
            webhook: document.getElementById('webhookUrl').value
        };

        // Validate webhook URL
        if (!config.webhook) {
            alert('Please enter a Discord webhook URL');
            return;
        }

        console.log('Monitor started with config:', config);
        // Here you would implement the actual monitoring logic
    });

    // Tutorial functionality
    const tutorial = {
        currentStep: 1,
        totalSteps: 4,
        overlay: document.getElementById('tutorialOverlay'),
        prevBtn: document.getElementById('prevStep'),
        nextBtn: document.getElementById('nextStep'),
        steps: document.querySelectorAll('.step'),
        dotsContainer: document.querySelector('.step-dots'),

        showTutorial() {
            this.currentStep = 1;
            this.overlay.style.display = 'flex';
            this.goToStep(1);
        },

        initialize() {
            // Create dots
            for (let i = 1; i <= this.totalSteps; i++) {
                const dot = document.createElement('div');
                dot.className = `dot ${i === 1 ? 'active' : ''}`;
                dot.addEventListener('click', () => this.goToStep(i));
                this.dotsContainer.appendChild(dot);
            }

            // Show first step
            this.steps[0].classList.add('active');

            // Add button listeners
            this.prevBtn.addEventListener('click', () => this.previousStep());
            this.nextBtn.addEventListener('click', () => this.nextStep());

            // Check if user has seen tutorial before
            if (!localStorage.getItem('tutorialSeen')) {
                this.overlay.style.display = 'flex';
            } else {
                this.overlay.style.display = 'none';
            }

            // Add show tutorial button listener
            document.getElementById('showTutorial').addEventListener('click', () => {
                this.showTutorial();
            });
        },

        updateButtons() {
            this.prevBtn.disabled = this.currentStep === 1;
            if (this.currentStep === this.totalSteps) {
                this.nextBtn.textContent = 'Finish';
            } else {
                this.nextBtn.textContent = 'Next';
            }
        },

        updateDots() {
            const dots = this.dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index + 1 === this.currentStep);
            });
        },

        goToStep(step) {
            this.steps.forEach(s => s.classList.remove('active'));
            this.steps[step - 1].classList.add('active');
            this.currentStep = step;
            this.updateButtons();
            this.updateDots();
        },

        previousStep() {
            if (this.currentStep > 1) {
                this.goToStep(this.currentStep - 1);
            }
        },

        nextStep() {
            if (this.currentStep < this.totalSteps) {
                this.goToStep(this.currentStep + 1);
            } else {
                // Tutorial complete
                localStorage.setItem('tutorialSeen', 'true');
                this.overlay.style.display = 'none';
            }
        }
    };

    // Initialize tutorial
    tutorial.initialize();
});

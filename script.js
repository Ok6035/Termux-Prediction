document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const input = document.getElementById("period-input");
    const button = document.getElementById("predict-button");
    const banner = document.getElementById("banner");
    const terminal = document.getElementById("terminal");

    const bannerText = `
  _   _  _____  __   __  _____  _   _  _____ 
 | | | ||  _  | \\ \\ / / |  _  || | | ||  _  |
 | |_| || | | |  \\ V /  | | | || | | || | | |
 |  _  || | | |  /   \\  | | | || | | || | | |
 | | | || |_| | / /^\\ \\ | |_| || |_| || |_| |
 \\_| |_/ \\_____/ \\/   \\/ \\_____/ \\_____/ \\_____/ 
 
      TERMUX PREDICTION SYSTEM v4.0.2
    `;
    banner.textContent = bannerText;
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const log = (message, className = "log-info") => {
        const p = document.createElement("p");
        p.textContent = message;
        p.className = className;
        output.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;
    };

    const createProgressBar = async (duration) => {
        const p = document.createElement("p");
        p.className = "log-info";
        p.innerHTML = `
            <div class="progress-container">
                <div class="progress-bar-outer" style="flex-grow: 1; background-color: #333; border-radius: 3px; padding: 2px;">
                    <div class="progress-bar" style="height: 12px; width: 0%; background-color: #33ff33; border-radius: 2px; transition: width 0.2s linear;"></div>
                </div>
                <span class="progress-text" style="margin-left: 10px; width: 40px;">0%</span>
            </div>
        `;
        output.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;

        const progressBar = p.querySelector(".progress-bar");
        const progressText = p.querySelector(".progress-text");

        for (let i = 0; i <= 100; i++) {
            progressBar.style.width = `${i}%`;
            progressText.textContent = `${i}%`;
            await sleep(duration * 10);
        }
    };

    const calculatePrediction = (period) => {
        const colorCode = period % 3;
        const number = period % 10;
        let probability = ((period * 371) % 1000) % 100;

        if (probability < 65) {
            probability += 35;
        }
        if (probability > 100) {
            probability = 98; // Cap probability
        }
        
        let color;
        switch (colorCode) {
            case 0: color = "RED"; break;
            case 1: color = "GREEN"; break;
            case 2: color = "VIOLET"; break;
        }

        return { color, number, probability };
    };

    const runPredictionSequence = async () => {
        const period = input.value;
        if (!period || !/^\d+$/.test(period)) {
            log("[!] Invalid input! Please enter numbers only.", "log-error");
            return;
        }
        
        button.disabled = true;
        input.disabled = true;
        output.innerHTML = "";

        const hackingPhrases = [
            "Initializing intrusion protocol...",
            "Bypassing firewall...",
            "Injecting payload...",
            "Decrypting secure channels...",
            "Establishing backdoor...",
            "Compromising target servers...",
            "Extracting sensitive prediction data..."
        ];

        log(`> target --period ${period}`);
        await sleep(500);
        log("okwin hack 4.0.2 initializing...", "log-success");
        const initialAccuracy = Math.floor(Math.random() * (100 - 85 + 1)) + 85;
        log(`Last known accuracy: ${initialAccuracy}%`, "log-warning");
        await sleep(1000);

        log(hackingPhrases[Math.floor(Math.random() * hackingPhrases.length)], "log-process");
        await createProgressBar(2);
        
        log("Connecting to 999okwin.in server...", "log-process");
        await createProgressBar(3);
        log("Connection established. Bypassing security...", "log-success");
        await sleep(500);

        log(hackingPhrases[Math.floor(Math.random() * hackingPhrases.length)], "log-process");
        await createProgressBar(4);

        log("Fetching result data...", "log-process");
        await sleep(1500);
        log("Success! Data acquired.", "log-success");
        await sleep(500);
        
        const prediction = calculatePrediction(Number(period));
        
        let chanceText;
        let chanceClass;
        if (prediction.probability > 85) {
            chanceText = "[+] High chance of winning!";
            chanceClass = "result-chance-high";
        } else {
            chanceText = "[!] Moderate chance of winning.";
            chanceClass = "result-chance-moderate";
        }

        const resultHTML = `
            <div class="result-container">
                <p class="result-title">=== PREDICTION RESULTS ===</p>
                <div class="result-item"><span>Period Number:</span> <span class="result-number">${period}</span></div>
                <div class="result-item"><span>Predicted Color:</span> <span class="result-color-${prediction.color}">${prediction.color}</span></div>
                <div class="result-item"><span>Predicted Number:</span> <span class="result-number">${prediction.number}</span></div>
                <div class="result-item"><span>Winning Probability:</span> <span class="result-probability">${prediction.probability}%</span></div>
                <p class="${chanceClass}" style="text-align: center; margin-top: 10px;">${chanceText}</p>
            </div>
        `;
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = resultHTML;
        output.appendChild(resultDiv);
        terminal.scrollTop = terminal.scrollHeight;

        button.disabled = false;
        input.disabled = false;
        input.value = "";
        input.focus();
    };

    button.addEventListener("click", runPredictionSequence);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            runPredictionSequence();
        }
    });

    input.focus();
});

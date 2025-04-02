document.addEventListener("DOMContentLoaded", () => {
    class TrieNode {
        constructor() {
            this.children = {};
            this.isEndOfWord = false;
        }
    }

    class Trie {
        constructor() {
            this.root = new TrieNode();
        }

        insert(word) {
            let node = this.root;
            for (let char of word) {
                if (!node.children[char]) {
                    node.children[char] = new TrieNode();
                }
                node = node.children[char];
            }
            node.isEndOfWord = true;
        }

        search(word) {
            let node = this.root;
            for (let char of word) {
                if (!node.children[char]) {
                    return false;
                }
                node = node.children[char];
            }
            return node.isEndOfWord;
        }
    }

    // Ensure words.js loaded properly
    if (typeof wordsList === "undefined") {
        console.error("Error: words.js failed to load. Make sure it exists.");
        return;
    }

    const trie = new Trie();
    wordsList.forEach(word => trie.insert(word.toLowerCase()));

    let score = 0;
    let timeLeft = 30;
    let timer;
    const timerElement = document.getElementById("timer");
    const messageElement = document.getElementById("message");
    const startButton = document.getElementById("startButton");
    const wordInput = document.getElementById("wordInput");
    const submitButton = document.getElementById("submitButton");
    const scoreElement = document.getElementById("score");

    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        wordInput.style.display = "inline-block";
        submitButton.style.display = "inline-block";
        wordInput.disabled = false;
        wordInput.focus();
        startTimer();
    });

    submitButton.addEventListener("click", () => {
        const input = wordInput.value.trim().toLowerCase();
        
        if (input && trie.search(input)) {
            score++;
            messageElement.textContent = "✅ Correct!";
            messageElement.style.color = "lime";
            messageElement.classList.add("fade");
        } else {
            messageElement.textContent = "❌ Incorrect. Try again!";
            messageElement.style.color = "red";
        }
        
        scoreElement.textContent = score;
        wordInput.value = "";
        setTimeout(() => messageElement.classList.remove("fade"), 1000);
    });

    function startTimer() {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.textContent = timeLeft;
            } else {
                clearInterval(timer);
                messageElement.textContent = `⏳ Time's up! Final Score: ${score}`;
                messageElement.style.color = "yellow";
                wordInput.disabled = true;
                submitButton.disabled = true;
            }
        }, 1000);
    }
});

// Language translations
const translations = {
    en: {
        title: "Photography Pose Assistant",
        subtitle: "Get personalized pose suggestions for your perfect shot!",
        languageQuestion: "What language are you comfortable with?",
        outfitQuestion: "What outfit are you wearing?",
        casual: "Casual Fit",
        formal: "Formal",
        wedding: "Wedding",
        recommendedPoses: "Recommended Poses",
        startOver: "Start Over",
        selectLanguage: "Please select a language to continue.",
        selectOutfit: "Please select an outfit to continue."
    },
    es: {
        title: "Asistente de Poses Fotográficas",
        subtitle: "¡Obtén sugerencias de poses personalizadas para tu foto perfecta!",
        languageQuestion: "¿En qué idioma te sientes cómodo?",
        outfitQuestion: "¿Qué tipo de ropa llevas puesta?",
        casual: "Casual",
        formal: "Formal",
        wedding: "Boda",
        recommendedPoses: "Poses Recomendadas",
        startOver: "Empezar de Nuevo",
        selectLanguage: "Por favor, selecciona un idioma para continuar.",
        selectOutfit: "Por favor, selecciona un tipo de ropa para continuar."
    },
    fr: {
        title: "Assistant de Poses Photo",
        subtitle: "Obtenez des suggestions de poses personnalisées pour votre photo parfaite !",
        languageQuestion: "Dans quelle langue êtes-vous à l'aise ?",
        outfitQuestion: "Quel type de tenue portez-vous ?",
        casual: "Décontracté",
        formal: "Formel",
        wedding: "Mariage",
        recommendedPoses: "Poses Recommandées",
        startOver: "Recommencer",
        selectLanguage: "Veuillez sélectionner une langue pour continuer.",
        selectOutfit: "Veuillez sélectionner une tenue pour continuer."
    },
    de: {
        title: "Fotografie-Posen-Assistent",
        subtitle: "Erhalten Sie personalisierte Posen-Vorschläge für Ihr perfektes Foto!",
        languageQuestion: "In welcher Sprache fühlen Sie sich wohl?",
        outfitQuestion: "Welche Kleidung tragen Sie?",
        casual: "Leger",
        formal: "Formell",
        wedding: "Hochzeit",
        recommendedPoses: "Empfohlene Posen",
        startOver: "Neu Starten",
        selectLanguage: "Bitte wählen Sie eine Sprache aus, um fortzufahren.",
        selectOutfit: "Bitte wählen Sie eine Kleidung aus, um fortzufahren."
    }
};

// Pose suggestions based on outfit type
const poseSuggestions = {
    casual: [
        { title: "Natural Walk", icon: "walking", description: "Walk naturally while looking slightly away from the camera" },
        { title: "Relaxed Lean", icon: "child", description: "Lean against a wall with crossed legs" },
        { title: "Candid Laugh", icon: "smile", description: "Create a genuine laugh while looking down slightly" },
        { title: "Street Style", icon: "street-view", description: "Stand with hands in pockets, casual stance" }
    ],
    formal: [
        { title: "Professional Stance", icon: "user-tie", description: "Stand straight with hands clasped in front" },
        { title: "Executive Pose", icon: "briefcase", description: "Sit in chair with confident posture" },
        { title: "Business Portrait", icon: "user-suit", description: "Three-quarter turn with subtle smile" },
        { title: "Power Pose", icon: "crown", description: "Stand with arms crossed, confident expression" }
    ],
    wedding: [
        { title: "Romantic Gaze", icon: "heart", description: "Look lovingly at your partner" },
        { title: "Classic Veil", icon: "ring", description: "Gentle pose with flowing veil movement" },
        { title: "First Dance", icon: "music", description: "Dancing pose with natural movement" },
        { title: "Elegant Portrait", icon: "camera", description: "Classic bridal pose with bouquet" }
    ]
};

// Current state
let currentLanguage = 'en';
let currentOutfit = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const languageSection = document.getElementById('language-selection');
    const outfitSection = document.getElementById('outfit-selection');
    const poseResults = document.getElementById('pose-results');
    const langButtons = document.querySelectorAll('.lang-btn');
    const outfitButtons = document.querySelectorAll('.outfit-btn');
    const startOverBtn = document.getElementById('start-over');
    const langError = document.getElementById('lang-error');
    const outfitError = document.getElementById('outfit-error');

    // Language selection
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            selectLanguage(lang);
            langButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            langError.classList.add('hidden');
        });
    });

    // Outfit selection
    outfitButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const outfit = btn.dataset.outfit;
            selectOutfit(outfit);
            outfitButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            outfitError.classList.add('hidden');
        });
    });

    // Start over button
    startOverBtn.addEventListener('click', () => {
        resetApp();
    });

    // Initialize the app
    updateUIText();
});

function selectLanguage(lang) {
    currentLanguage = lang;
    updateUIText();
    
    // Show outfit selection with animation
    const languageSection = document.getElementById('language-selection');
    const outfitSection = document.getElementById('outfit-selection');
    
    languageSection.classList.add('section-exit');
    setTimeout(() => {
        languageSection.classList.add('hidden');
        outfitSection.classList.remove('hidden');
        outfitSection.classList.add('section-enter');
    }, 500);
}

function selectOutfit(outfit) {
    currentOutfit = outfit;
    showPoseSuggestions();
}

function showPoseSuggestions() {
    const outfitSection = document.getElementById('outfit-selection');
    const poseResults = document.getElementById('pose-results');
    const posesContainer = document.getElementById('poses-container');
    
    // Clear previous suggestions
    posesContainer.innerHTML = '';
    
    // Add new suggestions
    poseSuggestions[currentOutfit].forEach(pose => {
        const poseCard = document.createElement('div');
        poseCard.className = 'pose-card';
        poseCard.innerHTML = `
            <div class="flex items-center mb-3">
                <i class="fas fa-${pose.icon} text-2xl text-indigo-600 mr-3"></i>
                <h3 class="text-lg font-semibold">${pose.title}</h3>
            </div>
            <p class="text-gray-600">${pose.description}</p>
        `;
        posesContainer.appendChild(poseCard);
    });
    
    // Show results section with animation
    outfitSection.classList.add('section-exit');
    setTimeout(() => {
        outfitSection.classList.add('hidden');
        poseResults.classList.remove('hidden');
        poseResults.classList.add('section-enter');
    }, 500);
}

function updateUIText() {
    const texts = translations[currentLanguage];
    
    // Update all translatable elements
    document.querySelector('h1').textContent = texts.title;
    document.querySelector('header p').textContent = texts.subtitle;
    document.querySelector('#language-selection h2').textContent = texts.languageQuestion;
    document.querySelector('#outfit-selection h2').textContent = texts.outfitQuestion;
    document.querySelector('#pose-results h2').textContent = texts.recommendedPoses;
    document.querySelector('#start-over').innerHTML = `<i class="fas fa-redo mr-2"></i>${texts.startOver}`;
    
    // Update outfit buttons text
    const outfitButtons = document.querySelectorAll('.outfit-btn span');
    outfitButtons[0].textContent = texts.casual;
    outfitButtons[1].textContent = texts.formal;
    outfitButtons[2].textContent = texts.wedding;
    
    // Update error messages
    document.getElementById('lang-error').textContent = texts.selectLanguage;
    document.getElementById('outfit-error').textContent = texts.selectOutfit;
}

function resetApp() {
    const languageSection = document.getElementById('language-selection');
    const outfitSection = document.getElementById('outfit-selection');
    const poseResults = document.getElementById('pose-results');
    
    // Reset selections
    currentOutfit = null;
    document.querySelectorAll('.lang-btn, .outfit-btn').forEach(btn => btn.classList.remove('selected'));
    
    // Show language section
    poseResults.classList.add('section-exit');
    setTimeout(() => {
        poseResults.classList.add('hidden');
        outfitSection.classList.add('hidden');
        languageSection.classList.remove('hidden');
        languageSection.classList.add('section-enter');
    }, 500);
}

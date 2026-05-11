// ===== QUIZ STATE =====
const answers = {};
const totalSteps = 7; // steps 1-7 (step 5 is interlude, not a question)
let currentStep = 1;
let currentSlide = 0;

// ===== NAVIGATION =====
function goToStep(stepNum) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));

    const targetId = stepNum === 'loading' ? 'step-loading' : stepNum === 'result' ? 'step-result' : `step-${stepNum}`;
    const target = document.getElementById(targetId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Update progress bar (steps 1-7 map to 0%-100%)
    if (typeof stepNum === 'number' && stepNum >= 1 && stepNum <= totalSteps) {
        const pct = ((stepNum - 1) / totalSteps) * 100;
        document.getElementById('progress-fill').style.width = `${pct}%`;
    } else if (stepNum === 'loading' || stepNum === 'result') {
        document.getElementById('progress-fill').style.width = '100%';
    }

    currentStep = stepNum;
}

// ===== SELECT ANSWER =====
function selectAnswer(stepNum, element) {
    const answer = element.getAttribute('data-answer');
    answers[stepNum] = answer;

    // Visual feedback — deselect siblings, select this one
    const parent = element.closest('.options-grid');
    parent.querySelectorAll('button').forEach(c => c.classList.remove('selected'));
    element.classList.add('selected');

    // Determine next step
    setTimeout(() => {
        if (stepNum < totalSteps) {
            goToStep(stepNum + 1);
        } else {
            showLoading();
        }
    }, 400);
}

// ===== LOADING SCREEN =====
function showLoading() {
    goToStep('loading');

    setTimeout(() => {
        goToStep('result');
    }, 3800);
}

// ===== CAROUSEL =====
function goToSlide(index) {
    const slides = document.querySelectorAll('.proof-slide');
    const dots = document.querySelectorAll('.dot');

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

// Auto-rotate carousel
setInterval(() => {
    const slides = document.querySelectorAll('.proof-slide');
    if (slides.length > 0 && document.getElementById('step-5').classList.contains('active')) {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
}, 3500);

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    goToStep(1);
});

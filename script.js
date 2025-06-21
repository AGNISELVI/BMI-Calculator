(() => {
  'use strict';

  const form = document.getElementById('bmiForm');
  const weightInput = document.getElementById('weightInput');
  const heightInput = document.getElementById('heightInput');
  const resultCard = document.getElementById('result');
  const bmiValueEl = document.getElementById('bmiValue');
  const bmiCategoryEl = document.getElementById('bmiCategory');
  const bmiAdviceEl = document.getElementById('bmiAdvice');
  const resultLink = document.getElementById('resultLink');

  const bmiCategories = [
    { max: 16.0, category: 'Severe Thinness', color: '#dc2626', advice: 'You are severely underweight. Please consult a healthcare provider.' },
    { max: 17.0, category: 'Moderate Thinness', color: '#f87171', advice: 'You are moderately underweight. Consider a nutritious diet.' },
    { max: 18.5, category: 'Mild Thinness', color: '#fbbf24', advice: 'You are slightly underweight. A healthy diet and exercise may help.' },
    { max: 25.0, category: 'Normal', color: '#16a34a', advice: 'Your BMI is normal. Keep maintaining a healthy lifestyle.' },
    { max: 30.0, category: 'Overweight', color: '#facc15', advice: 'You are overweight. Regular exercise and diet adjustments are recommended.' },
    { max: 35.0, category: 'Obese Class I', color: '#f97316', advice: 'Obesity Class I. Seek guidance for healthy weight management.' },
    { max: 40.0, category: 'Obese Class II', color: '#ea580c', advice: 'Obesity Class II. Consult a healthcare professional for advice.' },
    { max: Infinity, category: 'Obese Class III', color: '#b45309', advice: 'Obesity Class III. Medical intervention may be necessary.' },
  ];

  function calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    return Math.round(bmi * 10) / 10;
  }

  function getBMICategory(bmi) {
    return bmiCategories.find(cat => bmi <= cat.max);
  }

  function isValidInput(value, min, max) {
    return !isNaN(value) && value >= min && value <= max;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    let valid = true;

    if (!isValidInput(weight, 20, 500)) {
      weightInput.setCustomValidity('Weight must be between 20 and 500 kg.');
      valid = false;
    } else {
      weightInput.setCustomValidity('');
    }

    if (!isValidInput(height, 100, 250)) {
      heightInput.setCustomValidity('Height must be between 100 and 250 cm.');
      valid = false;
    } else {
      heightInput.setCustomValidity('');
    }

    if (!valid) {
      form.reportValidity();
      if (weightInput.validationMessage) weightInput.focus();
      else heightInput.focus();
      return;
    }

    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);

    bmiValueEl.textContent = bmi.toFixed(1);
    bmiCategoryEl.textContent = category.category;
    bmiCategoryEl.style.color = category.color;
    bmiAdviceEl.textContent = category.advice;

    resultCard.classList.add('show');
    resultCard.focus();
    resultLink.style.opacity = '1';
    resultLink.style.pointerEvents = 'auto';
  }

  form.addEventListener('submit', handleSubmit);
})();

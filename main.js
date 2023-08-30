const form = document.getElementById('form');
const dayI = document.getElementById('day-input');
const monthI = document.getElementById('month-input');
const yearI = document.getElementById('year-input');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputWrapper = element.parentElement;
    const errorDisplay = inputWrapper.querySelector('.error-message');

    errorDisplay.innerText = message;
    inputWrapper.classList.add('error');
    inputWrapper.classList.remove('success')
}

const setSuccess = element => {
    const inputWrapper = element.parentElement;
    const errorDisplay = inputWrapper.querySelector('.error-message');

    errorDisplay.innerText = '';
    inputWrapper.classList.add('success');
    inputWrapper.classList.remove('error');
};

const validateInputs = () => {
    const dayValue = dayI.value.trim();
    const monthValue = monthI.value.trim();
    const yearValue = yearI.value.trim();


    if(dayValue === '') {
        setError(dayI, 'This field is required');
    } else {
        setSuccess(dayI);
    }

    if(monthValue === '') {
        setError(monthI, 'This field is required');
    } else {
        setSuccess(monthI);
    }

    if(yearValue === '') {
        setError(yearI, 'This field is required');
    } else {
        setSuccess(yearI);
    }

};
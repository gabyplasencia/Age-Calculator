const form = document.getElementById('form');
const dayI = document.getElementById('day-input');
const monthI = document.getElementById('month-input');
const yearI = document.getElementById('year-input');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs(dayI, monthI, yearI );

});

const setError = (element, message) => {
    const formHead = element.closest(".form__head");
    const inputWrapper = element.parentElement;
    const errorDisplay = inputWrapper.querySelector('.error-message');
    errorDisplay.innerText = message;
    formHead.classList.add('error');
}

const setSuccess = element => {
    const formHead = element.closest(".form__head");
    const ageNumber = document.querySelector('.age');
    const inputWrapper = element.parentElement;
    const errorDisplay = inputWrapper.querySelector('.error-message');
    errorDisplay.innerText = '';
    formHead.classList.remove('error');
    ageNumber.classList.add('success');
};

const validateInputs = (dayI, monthI, yearI) => {
    const currentDate = new Date(); 
    let success = true;

    const day = dayI.value.trim();
    const month = monthI.value.trim();
    const year = yearI.value.trim();

    const lastDayOfMonth = new Date(year, parseInt(month), 0).getDate();
    if(day === '') {
        setError(dayI, 'This field is required');
        success = false;
    } else if(!parseInt(day) || day <=0  || day > 31 || day > lastDayOfMonth){
        setError(dayI, 'Must be a valid day');
        success = false;
    } else {
        setSuccess(dayI);
    }

    if(month === '') {
        setError(monthI, 'This field is required');
        success = false;
    } else if(!parseInt(month) || month <= 0 || month > 12){
        setError(monthI, 'Must be a valid month');
        success = false;
    } else if(success){
        setSuccess(monthI);
    }

    if(year === '') {
        setError(yearI, 'This field is required');
        success = false;
    } else if(!parseInt(year) || year > currentDate.getFullYear()){
        setError(yearI, 'Must be a valid year');
        success = false;
    } else if(success){
        setSuccess(yearI);
    }

    if(!success){
        document.getElementById('age-year').innerHTML = '--';
        document.getElementById('age-month').innerHTML = '--';
        document.getElementById('age-day').innerHTML = '--'; 
        return;
    }
        const yearAge = currentDate.getFullYear() - year;
        const monthAge = currentDate.getMonth() - month;
        const dayAge = currentDate.getDate() - day;
    
        document.getElementById('age-year').innerHTML = yearAge;
        document.getElementById('age-month').innerHTML = monthAge;
        document.getElementById('age-day').innerHTML = dayAge; 
    
};


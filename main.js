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
    
    let birthMonth,birthDay,birthYear;
    const day = dayI.value;
    const month = monthI.value;
    const year = yearI.value;

    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    const months = [31,28,31,30,31,30,31,31,30,31,30,31];

    leapChecker(currentYear);

    function leapChecker(year){
        if(year % 4 === 0 || (year % 100 === 0 && year % 400 === 0)){
            months[1] = 29;
        }
        else{
            months[1] = 28;
        }
    }

    birthYear = currentYear - year;

    if(currentMonth >= month){
        birthMonth = currentMonth - month;
    }
    else{
        birthYear--;
        birthMonth = 12 + currentMonth - month;
    }

    if(currentDay >= day){
        birthDay = currentDay - day;
    }
    else{
        birthMonth--;
        let days = months[currentMonth - 2];
        day = days + currentDay - day;
        if(birthMonth < 0){
            birthMonth = 11;
            birthYear--;
        }
    }

    const lastDayOfMonth = new Date(year, parseInt(month), 0).getDate();
    if(day === '') {
        setError(dayI, 'This field is required');
        success = false;
    } else if(!parseInt(day) || day <=0  || day > 31 || day > lastDayOfMonth){
        setError(dayI, 'Must be a valid day');
        success = false;
    } else if(day > currentDay && month == currentMonth && year == currentYear){
        setError(dayI, 'Must be in the past');
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
    } else if(month > currentMonth && year == currentYear){
        setError(monthI, 'Must be in the past');
        success = false;
    } else if(success){
        setSuccess(monthI);
    }

    if(year === '') {
        setError(yearI, 'This field is required');
        success = false;
    } else if(!parseInt(year)){
        setError(yearI, 'Must be a valid year');
        success = false;
    }  else if(year > currentYear){
        setError(yearI, 'Must be in the past');
        success = false;
    }   else if(success){
        setSuccess(yearI);
    }

    if(!success){
        document.getElementById('age-year').innerHTML = '--';
        document.getElementById('age-month').innerHTML = '--';
        document.getElementById('age-day').innerHTML = '--'; 
        return;
    }
    
        document.getElementById('age-year').innerHTML = birthYear;
        document.getElementById('age-month').innerHTML = birthMonth;
        document.getElementById('age-day').innerHTML = birthDay; 
    
};
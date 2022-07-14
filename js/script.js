const nameField = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
const color = document.getElementById('color');
const design = document.getElementById('design');
const shirtColors = color.children;
const activity = document.getElementById('activities');
const activityCost = document.getElementById('activities-cost');
let costDisplayed = document.getElementById('activities-cost').textContent;
let totalCost = 0;
const checkbox = document.querySelectorAll('.checkbox');
const activitySet = document.getElementById('activities');

// variables for dispolaying or hiding payment method 
const creditCardDiv = document.getElementById('credit-card');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');

const paymentMethod = document.getElementsByClassName('payment-method-box')[0];
const payment = document.getElementById('payment');
const creditCard = payment[1];
const payPal = payment[2];
const bitcoin = payment[3];


// variables for form validation
const name = document.getElementById('name');
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.getElementsByTagName('form')[0];
const mainEvent = document.querySelector('[name^=all]');
const numberBox = document.getElementsByClassName('num-box')[0];
const zip = document.getElementById('zip');


// focuses on the name field on windows load
window.addEventListener('load', () => {
    nameField.focus();
    otherJobRole.style.visibility = 'hidden';
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
    color.disabled = true;
    creditCard.selected = 'true';
});

// SHOWS OR HIDE THE OTHER JOB ROLE 
jobRole.addEventListener('change', (e) => {
    const job = e.target.value;
    if (job === 'other') {
        otherJobRole.style.visibility = 'inherit';
    }
    else {
        otherJobRole.style.visibility = 'hidden';
    }
});

// DISPLAYS COLORS BASED ON THEME SELECTED 
design.addEventListener('change', (e) => {
    color.disabled = false;
    for (let i = 0; i < shirtColors.length; i++) {
        shirtColors[i].disabled = true;
    }

    if (e.target.value === 'js puns') {

        for (let i = 0; i < shirtColors.length; i++) {
            shirtColors[i].selected = false;
        }

        for (let i = 1; i <= 3; i++) {
            shirtColors[i].disabled = false;
        }

    }

    if (e.target.value === 'heart js') {

        for (let i = 0; i < shirtColors.length; i++) {
            shirtColors[i].selected = false;
        }
        for (let i = 4; i <= 6; i++) {
            shirtColors[i].disabled = false;
        }

    }
});


// SUMS UP COST OF THE I=EVENT BASED ON ACTIVITY SELECTED 
activity.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        if (e.target.checked) {
            totalCost += parseInt(e.target.getAttribute('data-cost'));
        }
        else {
            totalCost -= parseInt(e.target.getAttribute('data-cost'));
        }
    }
    activityCost.innerHTML = `Total: $${totalCost}`

});


// when creedit card is selected, display credit card info and hide other payment methods 

payment.addEventListener('change', (e) => {
    if (e.target.value === 'credit-card') {
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
        creditCardDiv.style.display = "block";
    }

    if (e.target.value === 'paypal') {
        bitcoinDiv.style.display = 'none';
        creditCardDiv.style.display = "none";
        paypalDiv.style.display = 'block';

    }

    if (e.target.value === 'bitcoin') {
        creditCardDiv.style.display = "none";
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'block';

    }



});

form.addEventListener('submit', validate, false);

function validate(e) {
    toTestName(e);
    toTestEmail(e);
    toTestActiivity(e);
    if (creditCard.selected) {
        toTestCreditCard(e);
        toTestZipCode(e);
        toTestCvv(e);
    }
}

//     // NAME VALIDATION
function toTestName(e) {
    let suppliedName = name.value; // get the value from the named field 
    suppliedName = testName(suppliedName); // test the name if it meets requiremrnt 

    if (suppliedName === false) {
        e.preventDefault();
        name.parentElement.classList.add('not-valid');
        name.parentElement.classList.remove('valid');
        name.parentElement.lastElementChild.style.display = "inline";

    }
}

// EMAIL VALIDATION
function toTestEmail(e) {

    let suppliedEmail = email.value;
    suppliedEmail = testEmail(suppliedEmail);

    if (suppliedEmail === false) {
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');
        email.parentElement.lastElementChild.style.display = 'block';
        e.preventDefault();
    }

}
// EVENT VALIDATION 
function toTestActiivity(e) {

    if (totalCost == 0) {
        e.preventDefault();
        activity.classList.add('not-valid');
        activity.classList.remove('valid');
        activity.lastElementChild.style.display = 'block';

    }
}

// CARD VALIDATION

function toTestCreditCard(e) {
    let cardNumberSupplied = cardNumber.value;
    cardNumberSupplied = testCreditCard(cardNumberSupplied);
    if (cardNumberSupplied === false) {
        numberBox.classList.add("not-valid");
        document.getElementById('cc-hint').style.display = 'block';
        e.preventDefault();
    }

}

//         // ZIP CODE VALIDATION
function toTestZipCode(e) {

    let zipCode = zip.value;
    zipCode = testZipCode(zipCode);
    if (zipCode === false) {
        zip.parentElement.classList.add("not-valid");
        document.getElementById('zip-hint').style.display = 'block';
        e.preventDefault();
    }
}

// CVV VALIDATION
function toTestCvv(e) {
    let cvvCode = cvv.value;
    cvvCode = cvvTest(cvvCode);
    if (cvvCode === false) {
        cvv.parentElement.classList.add("not-valid");
        document.getElementById('cvv-hint').style.display = 'block';
        e.preventDefault();
    }
}

// function to test the name 
function testName(suppliedName) {
    let regex = /^\s*\w+\s*\w*\s*\w*\s*$/; // ensures first name and surname is filled , other name optional
    return regex.test(suppliedName);
}

// function to test the email 
function testEmail(suppliedEmail) {
    let regex = /^[\w-\._]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(suppliedEmail);
}

// REGEX VALIDATION FOR CREDIT CARD
function testCreditCard(cardNumber) {
    let regex = /^\d{13,16}$/;
    document.getElementById('cc-hint').textContent = "Credit card number must be between 13 - 16 digits";
    if (cardNumber.length < 13) {
        document.getElementById('cc-hint').textContent = "The number supplied is less than 13!";
    }
    else if (cardNumber.length > 16) {
        document.getElementById('cc-hint').textContent = "The number supplied is greater than 16!";
    }
    return regex.test(cardNumber);
}

function testZipCode(zipCode) {
    let regex = /^\d{5}$/;
    return regex.test(zipCode);
}

function cvvTest(cvvCode) {
    let regex = /^\d{3}$/;
    return regex.test(cvvCode);
}


// FORM VALIDATION FOR NAME FIIELD ON LOSS OF FOCUS 
name.addEventListener('focusout', (e) => {
    toTestName(e);
});

name.addEventListener('focusin', (e) => {
    name.parentElement.classList.remove('not-valid');
    name.parentElement.lastElementChild.style.display = "none";
});


// FORM VALIDATION FOR EMAIL FIIELD ON LOSS OF FOCUS
email.addEventListener('focusout', (e) => {
    toTestEmail(e);
});

// REMOVE THE WARNING FOR  EMAIL FIIELD WHEN FIELD IS IN FOCUS
email.addEventListener('focusin', (e) => {
    email.parentElement.classList.remove('not-valid');
    email.parentElement.lastElementChild.style.display = 'none';
})

// FORM VALIDATION FOR ACTIVITY FIIELD ON LOSS OF FOCUS
activity.addEventListener('focusout', (e) => {
    toTestActiivity(e);
});

// REMOVE THE WARNING FOR  ACTIVITY FIIELD WHEN FIELD IS IN FOCUS
activity.addEventListener('focusin', (e) => {
    activity.classList.remove('not-valid');
    activity.lastElementChild.style.display = 'none';
});

// FORM VALIDATION FOR CARD FIELD ON LOSS OF FOCUS
cardNumber.addEventListener('focusout', (e) => {
    if (creditCard.selected) {
        toTestCreditCard(e);
    }
});

// REMOVE THE WARNING FOR  CARD NUMBER FIIELD WHEN FIELD IS IN FOCUS
cardNumber.addEventListener('focusin', (e) => {
    numberBox.classList.remove("not-valid");
    document.getElementById('cc-hint').style.display = 'none';
});

zip.addEventListener('focusout', (e) => {
    toTestZipCode(e);
});

zip.addEventListener('focusin', (e) => {
    zip.parentElement.classList.remove("not-valid");
    document.getElementById('zip-hint').style.display = 'none';
});

cvv.addEventListener('focusout', (e) => {
    toTestCvv(e);
});

cvv.addEventListener('focusin', (e) => {
    cvv.parentElement.classList.remove("not-valid");
    document.getElementById('cvv-hint').style.display = 'none';
});

//PREVENTING CONFLICTING ACTIVITIES FROM BEING SELECTED 
activitySet.addEventListener('change', (e) => {
    const selected = e.target;

    const eventTime = selected.getAttribute('data-day-and-time');
    for (let i = 0; i < checkbox.length; i++) {
        if (selected.checked) {
            if (eventTime === checkbox[i].getAttribute('data-day-and-time') && selected !== checkbox[i]) {
                checkbox[i].disabled = true;
                checkbox[i].parentElement.classList.add('disabled');
            }
        }else {
            checkbox[i].disabled = false;
            checkbox[i].parentElement.classList.remove('disabled');
        }
    }
});

// HANDLES FOCUS IN AND OUT OF THE ACTIVITY SECTIION 

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('focusin', (e) => {
      checkbox[i].parentElement.classList.add('focus');
    });

    checkbox[i].addEventListener('focusout', (e) => {
      checkbox[i].parentElement.classList.remove('focus');
    });
  }
function validation(form) {

    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error-label').remove();
            parent.classList.remove('error')
        }
    }

    function creatError(input, text) {
        const parent = input.parentNode;
        let errorLabel = parent.querySelector('.error-label');

        if (!errorLabel) {
            errorLabel = document.createElement('label');
            errorLabel.classList.add('error-label');
            parent.classList.add('error');
            parent.append(errorLabel);
        }

        errorLabel.textContent = text;
    }

    let result = true;

    const allInputs = form.querySelectorAll('input');


    for (const input of allInputs) {
        removeError(input)

        if (input.dataset.minLength) {
            if (input.value.length < input.dataset.minLength && input.value != "") {
                removeError(input);
                creatError(input, `Минимальное количество символов: ${input.dataset.minLength}`);
                result = false;
            }
        }

        if (input.dataset.maxLength) {
            if (input.value.length > input.dataset.maxLength && input.value != "") {
                removeError(input);
                creatError(input, `Максимальное количество символов: ${input.dataset.maxLength}`);
                result = false;
            }
        }

        if (input.dataset.required == "true") {
            if (input.value == "") {
                removeError(input);
                creatError(input, 'Это поле обязательно для заполнения!');
                result = false;
            }
        }
    }

    return result;
}

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (validation(this) === true) {
        alert('Форма проверена успешно!');
    }
})

// Регулярка для текстовых инпутов

const textRegex = /[A-Za-z0-9!"№;^&@#$%^&*()-+=_~.,<>?`]/g;
let inputsText = document.querySelectorAll('.input-text');

for (const input of inputsText) {
    input.oninput = function () {
        this.value = this.value.replace(textRegex, '');
    }
}
// Для номера телефона

$('.input-phone').mask('+7 (999) 999-99-99');

$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};

$('input[type="tel"]').click(function () {
    $(this).setCursorPosition(4);  // set position number
});

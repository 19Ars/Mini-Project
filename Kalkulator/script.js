function addChar(input, character) {
    if (input.value == null || input.value === "0") {
        input.value = character;
    } else {
        input.value += character;
    }
}

function processInput(form, operation) {
    const display = form.display;
    let result;

    switch (operation) {
        case 'exp':
            result = Math.exp(display.value);
            display.value = `exp(${display.value}) = ${result}`;
            break;
        case 'ln':
            result = Math.log(display.value);
            display.value = `ln(${display.value}) = ${result}`;
            break;
        case 'sqrt':
            result = Math.sqrt(display.value);
            display.value = `sqrt(${display.value}) = ${result}`;
            break;
        case 'sq':
            result = Math.pow(display.value, 2);
            display.value = `${display.value}^2 = ${result}`;
            break;
        case 'cos':
            result = Math.cos(display.value);
            display.value = `cos(${display.value}) = ${result}`;
            break;
        case 'sin':
            result = Math.sin(display.value);
            display.value = `sin(${display.value}) = ${result}`;
            break;
        case 'tan':
            result = Math.tan(display.value);
            display.value = `tan(${display.value}) = ${result}`;
            break;
        default:
            showAlert("Operasi tidak valid");
            return;
    }
}

function deleteChar(input) {
    input.value = input.value.substring(0, input.value.length - 1);
}

function changeSign(input) {
    if (input.value.substring(0, 1) === "-") {
        input.value = input.value.substring(1, input.value.length);
    } else {
        input.value = "-" + input.value;
    }
}

function compute(form) {
    try {
        form.display.value = eval(form.display.value);
    } catch (e) {
        showAlert("Error in calculation");
        form.display.value = "Error";
    }
}

function showAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        background: '#333',
        color: '#fff',
        confirmButtonColor: '#444'
    });
}
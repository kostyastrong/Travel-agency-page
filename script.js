const openPopButtons = document.querySelectorAll('[data-pop-up-target]')
const closePopButtons = document.querySelectorAll('[data-pop-up-close]')
const overlay = document.getElementById('overlay')

// post form

document.forms.contact.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = document.querySelector('#contact-name').value;
    var tel = document.querySelector('#contact-phone').value;
    var email = document.querySelector('#contact-email').value;
    var description = document.querySelector('#contact-description').value;
    // TODO: how to rewrite these fields as if i wanted to reuse them?
    if (validatePrevent(name, tel, email, description)) {
        return;
    }
    createPost({
        title: name,
        body: tel,
    });
});

function createPost(newPost) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title: newPost.title,
            body: newPost.body
        })
    }).then(res => res.json()).then((post) => {
        console.log(post);
    })
}


// validate form
function validatePrevent(name, tel, email, description) {
    if (checkLang(name, 'name') || checkLang(description, 'description')) {
        return true;
    }
    if (alertNonEmptyEmail(email)) {
        return true;
    }

    return false;
}

function checkLang(s, field_abbreviation) {
    if (!s.match(/^[a-zA-Zа-яА-Я0-9_.,'"!?;:& ]+$/i)) {
        alert('Please provide en/ru ' + field_abbreviation);
        return true;
    }
    return false;
}

function alertNonEmptyEmail(email) {
    if (email != '' && !validateEmail(email)) {
        alert('Please provide correct email or do not fill that field');
        return true;
    }
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validate = () => {
    var result = document.getElementById('contact-email-result');
    const email = document.getElementById('contact-email').value;
    result.innerHTML = '';
    if (email == '') {
        return;
    }

    if (validateEmail(email)) {
        result.innerHTML = email + ' is valid.';
        result.style.color = 'green';
    } else {
        result.innerHTML = email + ' is invalid.';
        result.style.color = 'red';
    }
    // console.log(result.innerHTML, document.getElementById('contact-email-result').innerHTML);
}

document.getElementById('contact-email').addEventListener('input', validate);


// pop-up methods
openPopButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = document.querySelector(button.dataset.popUpTarget);
        openPopUp(popup);
    })
})

overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.pop-up.active');
    popups.forEach(popup => {
        closePopUp(popup);
    })
})

closePopButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.pop-up');
        closePopUp(popup);
    })
})

function openPopUp(popup) {
    console.log(popup);
    if (popup == null) return;  // no pop-up inside
    popup.classList.add('active');
    overlay.classList.add('active');
}

function closePopUp(popup) {
    if (popup == null) return;  // no pop-up inside
    popup.classList.remove('active');
    overlay.classList.remove('active');
}
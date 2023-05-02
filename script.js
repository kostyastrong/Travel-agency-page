const openPopButtons = document.querySelectorAll('[data-pop-up-target]')
const closePopButtons = document.querySelectorAll('[data-pop-up-close]')
const overlay = document.getElementById('overlay')



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
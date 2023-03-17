'use strict'



function Init() {
    const form = document.getElementById('form');
    form.addEventListener('submit', handleForm);
    document.querySelector('main').addEventListener('keydown', (e) => {
        if (e.key == "Enter") {
            onSubmit();
        }
    });
}

function handleForm(event) { event.preventDefault(); }

function onSubmit() {
    const userName = document.getElementById('userName').value;
    const commentText = document.getElementById('commentText').value;
    const validation = document.getElementById('validation-error');
    const dateObj = new Date;
    const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`
    let date = document.getElementById('date').value;
    if (date === '') {
        date = dateObj.toLocaleDateString();
    } else {
        date = date.split('-').reverse().join('.')
    }
    if (date === dateObj.toLocaleDateString()) { date = 'Сегодня' };
    if (date === new Date((dateObj.setDate(dateObj.getDate() - 1))).toLocaleDateString()) { date = 'Вчера' };
    date = `${date} ${time}`;
    if (userName.trim() && commentText.trim()) {
        addComment(userName, commentText, date);
        validation.textContent = "";
    } else {
        validation.textContent = "Поля имени пользователя и комментария должны быть заполнены";
    }
}

function addComment(userName, commentText, date) {
    const comment = document.createElement('div');
    const commentHtml = `<div class='comment__row'> <h3>${userName}</h3> <span class="comment__date">${date}</span></div><div class='comment__row'> <p>${commentText}</p> <svg width="20px" height="20px" onclick="deleteComment(this)" viewBox=" 0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.5 3V1.5C4.5 0.947715 4.94772 0.5 5.5 0.5H9.5C10.0523 0.5 10.5 0.947715 10.5 1.5V3M0 3.5H15M1.5 3.5V13.5C1.5 14.0523 1.94772 14.5 2.5 14.5H12.5C13.0523 14.5 13.5 14.0523 13.5 13.5V3.5M7.5 7V12M4.5 9V12M10.5 9V12" stroke="#000000" /> </svg></div>`;
    comment.className = 'comment-list__item'
    comment.innerHTML = commentHtml;
    console.log(comment.button);
    document.getElementById('comment-list').append(comment)
}

function deleteComment(e) {
    e.parentNode.parentNode.remove();
}

window.onload = Init;
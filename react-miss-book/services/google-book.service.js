
'use strict';

const url = 'https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%2520javascript'

getContacts(printBooks)

function printBooks(books) {
    console.log(books)
}

function getContacts(onSuccess) {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const res = JSON.parse(xhr.responseText)
            console.log(res);
            onSuccess(res)
        }
    }

    // xhr.onload = () => {
    //     if (xhr.status === 200) {
    //         const res = JSON.parse(xhr.responseText)
    //         onSuccess(res)
    //     }
    // }

    xhr.open('GET', url, true)
    xhr.send()
}
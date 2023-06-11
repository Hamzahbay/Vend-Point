// Back to landing page button
document.querySelector('.back img').addEventListener('click', function(e) {
    window.location.href = '/?animation=off'
})

// Submit form
document.querySelector('#submit-btn').addEventListener('click', function(e) {
    if( document.getElementById('name').value == '' ) {
        if( document.getElementById('password').value == '' ) {
            document.getElementById('password').style.border = 'solid 1px red'
        }
        if( document.getElementById('password').value != '' ) {
            document.getElementById('password').style.border = 'solid 1px lightgray'
        }
        document.getElementById('name').style.border = 'solid 1px red'
        return document.querySelector('.error-message').innerHTML = `<p class="validate-message">Mohon isi form untuk melanjutkan</p>`
    }
    if( document.getElementById('password').value == '' ) {
        if( document.getElementById('name').value != '' ) {
            document.getElementById('name').style.border = 'solid 1px lightgray'
        }
        document.getElementById('password').style.border = 'solid 1px red'
        return document.querySelector('.error-message').innerHTML = `<p class="validate-message">Mohon isi form untuk melanjutkan</p>`
    }
    document.getElementById('log-form').submit()
    document.querySelector('.loading').classList.remove('display-none')
})
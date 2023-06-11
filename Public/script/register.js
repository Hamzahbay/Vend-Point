// Back to landing page button
document.querySelector('.back img').addEventListener('click', function(e) {
    window.location.href = '/?animation=off'
})

// Set button file
document.querySelector('.file-btn').addEventListener('click', function(e) {
    document.querySelector('.open-dialog').submit()
    // window.location.href = `/register/open-dialog?dataName=${this.dataset.query1}&passwordChecker=${this.dataset.query2}`
})

const valueBefore = document.getElementById('dirPath').value
document.getElementById('dirPath').addEventListener('keyup', function(e) {
    this.value = valueBefore
})
if( document.getElementById('dirPath').value == '' ) {
    document.getElementById('dirPath').addEventListener('click', function(e) {
        document.querySelector('.open-dialog').submit()
        // window.location.href = `/register/open-dialog?dataName=${this.dataset.query1}&passwordChecker=${this.dataset.query2}`
    })
}

if( document.getElementById('dirPath').value != '' ) document.getElementById('dirPath').nextElementSibling.style.backgroundColor = 'rgb(0, 220, 0)'

// Submit form
document.querySelector('#submit-btn').addEventListener('click', function(e) {
    // Data validate
    let validate = []
    let errMessage = ''
    let symbolRegex = /^[a-zA-Z0-9]+$/
    for( let i = 0; i < document.querySelectorAll('.container .first-content .box .box-content .input-form').length; i++ ) {
        if( document.querySelectorAll('.container .first-content .box .box-content .input-form')[i].value == '' ) {
            validate.push(document.querySelectorAll('.container .first-content .box .box-content .input-form')[i])
            document.querySelectorAll('.container .first-content .box .box-content .input-form')[i].style.border = 'solid 1px red'
        }
    }
    
    if( validate.length == 0 ) {
        if( symbolRegex.test(document.querySelector('#adminName').value) == true ) {
            if( isNaN(document.querySelector('#adminName').value) == true ) {
                if( document.querySelector('#checkPassword') != undefined ) {
                    if( document.querySelector('#checkPassword').value == document.querySelector('#adminPassword').value ) {
                        document.getElementById('reg-form').submit()
                        document.querySelector('.loading').classList.remove('display-none')
                    } else {
                        errMessage = `<p class="validate-message">Sandi tidak cocok</p>`
                        document.querySelector('#checkPassword').style.border = 'solid 1px red'
                    }
                } else {
                    document.getElementById('reg-form').submit()
                    document.querySelector('.loading').classList.remove('display-none')
                }
            } else {
                document.querySelector('#adminName').style.border = 'solid 1px red'
                errMessage = `<p class="validate-message">Mohon pastikan nama yang dimasukkan mengandung setidaknya satu huruf.</p>`
            }
        } else {
            document.querySelector('#adminName').style.border = 'solid 1px red'
            errMessage = `<p class="validate-message">Mohon masukkan nama yang hanya mengandung huruf dan angka.</p>`
        }
    } else if( validate.length >= 1 ) {
        errMessage = `<p class="validate-message">Mohon isi form untuk melanjutkan.</p>`
    }

    document.querySelector('.container .first-content .box .error-message').innerHTML = errMessage
})

// Loading
// let v = document.querySelector('.loading-primary h1')

// const loadingAnimate = () => {
//     for( let i = 0; i <= 360; i++ ) {
//         v.style.transform = `rotate(${i}deg)`
//     }
// }

// loadingAnimate()
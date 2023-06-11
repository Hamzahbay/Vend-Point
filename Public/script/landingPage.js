// socket.io
const socket = io()

// make landing page animation
let animateTitle = document.querySelector('.title .animate')
let primaryTitle = animateTitle.querySelector('.primary h1')
let secondaryTitle = animateTitle.querySelector('.secondary h1')
let footer = document.querySelector('.footer')
let contain = document.querySelector('.contain')
let btnDetail = document.querySelector('.btn-detail')

const startAnimation = () => {
    setTimeout(() => {
        primaryTitle.style.opacity = 1
        setTimeout(() => {
            primaryTitle.style.fontSize = '500%'
            secondaryTitle.style.fontSize = '500%'
            document.body.style.backgroundColor = '#F6F1F1'
            setTimeout(() => {
                primaryTitle.parentElement.parentElement.style.transform = 'translateX(-20%)'
                secondaryTitle.style.opacity = '1'
                setTimeout(() => {
                    animateTitle.parentElement.style.top = '30%'
                    setTimeout(() => {
                        footer.style.opacity = 1
                        contain.style.opacity = 1
                    }, 200)
                }, 800)
            }, 1500)
        }, 2000)
    }, 1000)

    setTimeout(() => {
        contain.style.display = 'block'
    }, 5400)
}

const noAnimation = () => {
    document.querySelector('.title .animate .primary h1').style.transition = 'linear 100ms'
    primaryTitle.style.opacity = 1
    primaryTitle.style.fontSize = '500%'
    secondaryTitle.style.fontSize = '500%'
    secondaryTitle.parentElement.style.display = 'block'
    primaryTitle.parentElement.parentElement.style.transform = 'translateX(-20%)'
    document.body.style.animation = 'none'
    animateTitle.parentElement.style.top = '30%'
    document.body.style.backgroundColor = '#F6F1F1'
    
    setTimeout(() => {
        footer.style.opacity = 1
        contain.style.opacity = 1
        secondaryTitle.style.opacity = '1'
    }, 600)
    setTimeout(() => {
        contain.style.display = 'block'
    }, 580)
}

const setAnimation = () => {
    if( animateTitle.parentElement.dataset.animation == 'on' ) return startAnimation()
    if( animateTitle.parentElement.dataset.animation == 'off' ) return noAnimation()
}

for( let i = 0; i < contain.firstElementChild.children.length; i++ ) {
    contain.firstElementChild.children[i].addEventListener('mousemove', function(e) {
        btnDetail.style.display = 'block'
        btnDetail.innerText = this.dataset.detail
        btnDetail.style.top = `${e.clientY + 10}px`
        btnDetail.style.left = `${e.clientX + 10}px`
        
        btnDetail.addEventListener('mouseover', function(ee) {
            btnDetail.style.display = 'none'
        })
    })

    contain.firstElementChild.children[i].addEventListener('mouseout', function(e) {
        btnDetail.style.display = 'none'
    })
}

setAnimation()

// popup
document.querySelector('#newDataBtn').addEventListener('click', function(e) {
    document.querySelector('.popup').classList.remove('display-none')
    document.querySelector('#popup-title-swap').innerText = 'Tambah Data Baru'
    document.querySelector('.popup-activate').classList.remove('display-none')
    
    setTimeout(() => {
        document.querySelector('.popup').style.opacity = '1'
        document.querySelector('.popup-activate').style.opacity = '1'
    }, 100)

    document.querySelector('.new-data').classList.remove('display-none')
})
document.querySelector('#existingDataBtn').addEventListener('click', function(e) {
    document.querySelector('.popup').classList.remove('display-none')
    document.querySelector('#popup-title-swap').innerText = 'Data Terbaru'
    document.querySelector('.popup-activate').classList.remove('display-none')

    setTimeout(() => {
        document.querySelector('.popup').style.opacity = '1'
        document.querySelector('.popup-activate').style.opacity = '1'
    }, 100)

    document.querySelector('.existing-data').classList.remove('display-none')
})

document.querySelector('#submit-btn').addEventListener('click', function(e) {
    if( document.getElementById('dataName').value == '' ) {
        return false
    }
    
    document.querySelector('.popup-submit-btn').classList.remove('display-none')
    document.querySelector('.popup-submit-btn-activate').classList.remove('display-none')
})

document.querySelector('.popup .popup-close').addEventListener('click', function(e) {
    this.parentElement.parentElement.classList.add('display-none')
    document.querySelector('.popup-activate').classList.add('display-none')
    document.querySelector('.new-data').classList.add('display-none')
    document.querySelector('.existing-data').classList.add('display-none')
    document.querySelector('.popup').style.opacity = '0'
    document.querySelector('.popup-activate').style.opacity = '0'
})
document.querySelector('.popup-submit-btn .popup-close').addEventListener('click', function(e) {
    this.parentElement.parentElement.classList.add('display-none')
    document.querySelector('.popup-submit-btn-activate').classList.add('display-none')
})

document.querySelector('#submit-btn-popup').addEventListener('click', function(e) {
    document.querySelector('#newDataForm').submit()
})

document.getElementById('passwordCheck').addEventListener('change', function(e) {
    if( this.checked == false ) return document.getElementById('passwordChecker').checked = false
    if( this.checked == true ) return document.getElementById('passwordChecker').checked = true
})

if( document.getElementById('passwordCheck').checked == false ) document.getElementById('passwordChecker').checked = false
if( document.getElementById('passwordCheck').checked == true ) document.getElementById('passwordChecker').checked = true

document.getElementById('newDataForm').addEventListener('keydown', function(e) {
    if( e.key === 'Enter' ) {
        e.preventDefault()

        if( document.getElementById('dataName').value == '' ) {
            return false
        }

        document.querySelector('.popup-submit-btn').classList.remove('display-none')
        document.querySelector('.popup-submit-btn-activate').classList.remove('display-none')
    }
})

document.getElementById('dataName').addEventListener('keyup', function(e) {
    // let symbolRegex = /[^a-zA-Z0-9()]/g
    let symbolRegex = /[^a-zA-Z0-9_\-()]/g
    if( symbolRegex.test(this.value) == true ) {
        this.value = this.value.replace(/[^a-zA-Z0-9_\-()]/g, '')
    }
})

let dataOption = document.querySelectorAll('.existing-data .data-box .card')
dataOption.forEach(x => {
    x.addEventListener('click', function() {
        if( this.classList.contains('open-other') == false ) {
            let urlDestination = `/open-data?id=${encodeURI(this.dataset.id)}`
            window.location.href = urlDestination
        } else if( this.classList.contains('open-other') == true ) {
            window.location.href = `/open-data/open-dialog`
        }
    })
    x.querySelector('img').addEventListener('mousemove', function(e) {
        let thisParent = this.parentElement.parentElement
        let cardDetail
        if( thisParent.classList.contains('open-other') == false ) {
            thisParent = thisParent.dataset
            cardDetail = `<p>Lokasi: ${thisParent.path}</p><p>Sandi: ${thisParent.setPassword == 'true'?'aktif':'tidak aktif'}</p><p>Terakhir dibuka: ${thisParent.endTime}, oleh ${thisParent.endTimeName}</p>`
        } else if( thisParent.classList.contains('open-other') == true ) {
            cardDetail = `<p>Pilih folder atau file lainya.</p><p>pilih folder atau file yang telah dibuat sebelumnya.</p><p>Pilih file dengan ekstensi ".db".</p>`
        }

        btnDetail.style.display = 'block'
        btnDetail.innerHTML = cardDetail
        btnDetail.style.top = `${e.clientY + 10}px`
        btnDetail.style.left = `${e.clientX + 10}px`
    })
    x.querySelector('img').addEventListener('mouseout', function(e) {
        btnDetail.style.display = 'none'
    })
})

if( document.querySelector('.error-message') != undefined ) {
    document.querySelector('.error-message').innerText = document.querySelector('.error-message').innerText.split('-').reduce((acc, curr) => acc + ' ' + curr)
    
    setTimeout(() => document.querySelector('.error-message').style.bottom = '20px', 500)
    setTimeout(() => {
        document.querySelector('.error-message').style.bottom = '-50px'
        setTimeout(() => document.querySelector('.error-message').remove(), 1000)
    }, 3200)
}

// document.querySelector('.loading').classList.remove('display-none')
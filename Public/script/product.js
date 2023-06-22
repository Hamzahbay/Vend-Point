// navbar
for( let i = 0; i < document.querySelectorAll('.card').length; i++ ) {
    document.querySelectorAll('.card')[i].addEventListener('mouseover', function(e) {
        this.firstElementChild.style.transform = 'scale(1.3)'
    })
    document.querySelectorAll('.card')[i].addEventListener('mouseout', function(e) {
        this.firstElementChild.style.transform = 'scale(1)'
    })
}

document.querySelector('.nav-btn img').addEventListener('click', function(e) {
    if( document.querySelector('.nav-btn img').parentElement.dataset.status == 'open' ) {
        document.querySelector('.navbar').style.left = '-25rem'
        this.parentElement.dataset.status = 'close'
        this.classList.add('display-none')

        document.querySelector('.nav-open').classList.add('display-none')
    
        setTimeout(() => {
            this.setAttribute('src', 'img/menu-blue.png')
            this.classList.remove('display-none')
        }, 300)
    } else if( document.querySelector('.nav-btn img').parentElement.dataset.status == 'close' ) {
        document.querySelector('.navbar').style.left = '0'
        this.parentElement.dataset.status = 'open'
        this.classList.add('display-none')

        document.querySelector('.nav-open').classList.remove('display-none')
    
        setTimeout(() => {
            this.setAttribute('src', 'img/left-arrow.png')
            this.classList.remove('display-none')
        }, 300)
    }
})

document.querySelector('.nav-open').addEventListener('click', function(e) {
    document.querySelector('.navbar').style.left = '-25rem'
        document.querySelector('.nav-btn img').parentElement.dataset.status = 'close'
        document.querySelector('.nav-btn img').classList.add('display-none')

        document.querySelector('.nav-open').classList.add('display-none')
    
        setTimeout(() => {
            document.querySelector('.nav-btn img').setAttribute('src', 'img/menu-blue.png')
            document.querySelector('.nav-btn img').classList.remove('display-none')
        }, 300)
})

for( let i = 0; i < document.querySelectorAll('.navbar .card').length; i++ ) {
    document.querySelectorAll('.navbar .card')[i].addEventListener('click', function(e) {
        window.location.href = this.dataset.href
    })
}
// end navbar

window.addEventListener('focus', function(e) {
    location.reload()
})

for( let i = 0; i < document.querySelectorAll('.container .content .box .box-list').length; i++ ) {
    document.querySelectorAll('.container .content .box .box-list')[i].addEventListener('click', function(e) {
        window.location.href = this.dataset.href
    })
}

// right click action for warehouse
document.querySelectorAll('.warehouse').forEach(warehouse => {
    warehouse.addEventListener('contextmenu', function(e) {
        document.querySelector('.warehouseContexMenu').setAttribute('data-id', this.dataset.id)
        document.querySelector('.warehouseContexMenu').classList.remove('display-none')
        document.querySelector('.warehouseContexMenu').style.left = e.clientX + 'px'
        document.querySelector('.warehouseContexMenu').style.top = e.clientY + 'px'
    })
})
document.querySelectorAll('.warehouseContexMenu .item').forEach(item => {
    item.addEventListener('click', function(e) {
        location.href = this.dataset.link + this.parentElement.dataset.id
    })
})
document.body.addEventListener('click', function(e) {
    document.querySelector('.warehouseContexMenu').classList.add('display-none')
})
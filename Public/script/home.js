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


// Get the canvas element
const ctx = document.getElementById('myChart').getContext('2d')
const ctx1 = document.getElementById('myChart1').getContext('2d')
const ctx2 = document.getElementById('myChart2').getContext('2d')

// Define the chart data
let data = {
  labels: ['09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00'],
  datasets: [{
    label: 'Penjualan Hari Ini',
    data: [45000, 21000, 230000, 500000, 154000, 55000],
    // fill: 'origin',
    // backgroundColor: [
    //   'rgba(255, 99, 132, 0.2)',
    //   'rgba(54, 162, 235, 0.2)',
    //   'rgba(255, 206, 86, 0.2)',
    //   'rgba(75, 192, 192, 0.2)',
    //   'rgba(153, 102, 255, 0.2)',
    //   'rgba(255, 159, 64, 0.2)'
    // ],
    // borderColor: [
    //   'rgba(255, 99, 132, 1)',
    //   'rgba(54, 162, 235, 1)',
    //   'rgba(255, 206, 86, 1)',
    //   'rgba(75, 192, 192, 1)',
    //   'rgba(153, 102, 255, 1)',
    //   'rgba(255, 159, 64, 1)'
    // ],
    borderWidth: 2
  }]
}

// Define the chart options
let options = {
  scales: {
    y: {
      beginAtZero: true
    },
    x: {
        beginAtZero: true
    },
    responsive: true
  }
}

// Create the chart
let myChart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
})

data = {
    labels: ['Umum', 'Ganjar', 'Jokowi', 'Prabowo', 'Mega Puan'],
    datasets: [{
        label: 'Rp',
        clip: false,
        data: [234000, 21000, 230000, 50000, 55000],
        borderWidth: 2
    }]
}

myChart = new Chart(ctx1, {
  type: 'doughnut',
  data: data,
//   options: options
})

data = {
    labels: ['Pensil', 'Buku', 'Penghapus'],
    datasets: [{
        label: '',
        clip: false,
        data: [7, 6, 10],
        borderWidth: 2
    }]
}

myChart = new Chart(ctx2, {
    type: 'pie',
    data: data,
  //   options: options
})


document.querySelector('.plus-report-box').addEventListener('mouseover', function(e) {
    document.querySelector('.plus-report-box-mouseover').classList.remove('display-none')
    document.querySelector('.plus-report-box-mouseover').style.top = e.pageY + 20 + 'px'
    document.querySelector('.plus-report-box-mouseover').style.left = e.pageX + 20 + 'px'
})
document.querySelector('.plus-report-box').addEventListener('mouseout', function(e) {
    document.querySelector('.plus-report-box-mouseover').classList.add('display-none')
})

document.querySelector('.cancel-btn-memo-form-popup').addEventListener('click', function(e) {
    document.querySelector('.memo-form-popup').style.display = 'none'
    setTimeout(() => {
        document.querySelector('.memo-form-popup').firstElementChild.style.marginTop = '15%'
        document.querySelector('.memo-form-popup').firstElementChild.style.opacity = 0
    }, 10)
})
document.querySelector('.plus-report-box').addEventListener('click', function(e) {
    document.querySelector('.memo-form-popup').style.display = 'block'
    document.querySelector('.memo-form-popup').style.overflow = 'hidden'
    setTimeout(() => {
        document.querySelector('.memo-form-popup').firstElementChild.style.marginTop = '10%'
        document.querySelector('.memo-form-popup').firstElementChild.style.opacity = 1
    }, 10)
    setTimeout(() => {
        document.querySelector('.memo-form-popup').style.overflow = 'auto'
    }, 300)
})


document.getElementById('reminderMemo').addEventListener('click', function(e) {
    document.querySelector('.for-ctn-add-date-div').classList.remove('display-none')
})
document.getElementById('stickyMemo').addEventListener('click', function(e) {
    document.querySelector('.for-ctn-add-date-div').classList.add('display-none')
})
if( document.getElementById('memoType').value == 'reminderMemo' ) document.querySelector('.for-ctn-add-date-div').classList.remove('display-none')


document.querySelector('.others-memo').addEventListener('click', function(e) {
    document.querySelector('.memo-reminder-popup').classList.remove('display-none')
    document.querySelector('.memo-reminder-popup').style.overflow = 'hidden'
    setTimeout(() => {
        document.querySelector('.memo-reminder-popup').firstElementChild.style.marginTop = '10%'
        document.querySelector('.memo-reminder-popup').firstElementChild.style.opacity = 1
    }, 10)
    setTimeout(() => {
        document.querySelector('.memo-reminder-popup').style.overflow = 'auto'
    }, 300)
})
document.querySelector('.close-memo-popup').addEventListener('click', function(e) {
    document.querySelector('.memo-reminder-popup').classList.add('display-none')
    setTimeout(() => {
        document.querySelector('.memo-reminder-popup').firstElementChild.style.marginTop = '15%'
        document.querySelector('.memo-reminder-popup').firstElementChild.style.opacity = 0
    }, 10)
})
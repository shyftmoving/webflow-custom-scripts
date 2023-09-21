const fromField = document.getElementById('phx2-field-from')
const toField = document.getElementById('phx2-field-to')
const dateField = document.getElementById('phx2-field-date')
const dateFieldHidden = document.getElementById(
  'phx2-modal-date-input-form-input-field'
)
const sizeField = document.getElementById('phx2-field-size')
const goBtn = document.getElementById('phx2-widget-form-submit')
const iconFrom = document.querySelector('.phx2-widget-form-input-icon-from svg')
const iconTo = document.querySelector('.phx2-widget-form-input-icon-to svg')
const iconDate = document.querySelector('.phx2-widget-form-input-icon-date svg')
const iconSize = document.querySelector('.phx2-widget-form-input-icon-size svg')
// const iconFromWrap = document.getElementById('widget-js-icon-wrap-from')
// const iconToWrap = document.getElementById('widget-js-icon-wrap-to')
// const iconDateWrap = document.getElementById('widget-js-icon-wrap-date')

const errorWrap = document.getElementById('phx2-error-outer')
const errorText = document.getElementById('phx2-error-text')
const dateModal = document.getElementById('phx2-modal-date-wrap')
const sizeModal = document.getElementById('phx2-modal-size-wrap')
const dateModalSubmit = document.getElementById(
  'phx2-modal-date-input-form-submit'
)
const sizeModalSubmit = document.getElementById(
  'phx2-modal-size-input-form-submit'
)
const longDinstanceHouse = document.getElementById(
  'phx2-modal-size-house-input-wrap'
)
const localMoveFootage = document.getElementById('phx2-modal-size-footage-wrap')
const sizeModalHouseRadio = document.querySelectorAll(
  '.phx2-modal-size-house-radio-button'
)
const sizeModalCategoryRadio = document.querySelectorAll(
  '.phx2-modal-size-rooms-radio-button'
)
const sizeModalError = document.getElementById('phx2-modal-size-error')
const dateModalError = document.getElementById('phx2-modal-date-error')
const dateModalFlexibile = document.getElementById('phx2-modal-date-flexible')
const sizeModalPets = document.getElementById('phx2-modal-size-pets-wrap')
const sizeModalStorage = document.getElementById('phx2-modal-size-storage-wrap')
const sizeModalVehicle = document.getElementById('phx2-modal-size-vehicle-wrap')
const sizeModalVehicleDetails = document.getElementById(
  'phx2-modal-size-vehicleDetails'
)
const sizeModalFootage = document.getElementById(
  'phx2-modal-size-footage-input-field-2'
)
const sizeModalFootageUnitRadio = document.querySelectorAll(
  '.phx2-modal-size-footage-radio-wrap'
)

let fromAddress = ''
let fromZip = ''
let fromCountry = ''
let fromCoords = null
let toAddress = ''
let toCoords = null
let distance = 0
let localMove = false
let moveDate = ''
let moveDateFlexible = false
let allFieldsHaveData = false
let finalUrl = ''
let range = 0
let sizeHouse = ''
let sizeCategory = ''
let sizePets = false
let sizeStorage = false
let sizeVehicle = false
let sizeVehicleDetails = ''
let sizeFootage = ''
let sizeFootageUnit = 'imperial'

dateField.addEventListener('click', function () {
  dateModal.style.display = 'flex'
})

sizeField.addEventListener('click', function () {
  if (fromAddress === '' || toAddress === '' || fromZip === '') {
    errorWrap.style.display = 'block'
    errorText.innerHTML =
      'Please fill in the "Moving from" and "Moving to" fields first'
    return
  } else {
    errorWrap.style.display = 'none'
  }
  if (localMove === true) {
    localMoveFootage.style.display = 'block'
    longDinstanceHouse.style.display = 'none'
  } else {
    localMoveFootage.style.display = 'none'
    longDinstanceHouse.style.display = 'block'
  }
  if (screen.height < 800) {
    sizeModal.style.display = 'block'
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  } else {
    sizeModal.style.display = 'flex'
  }
})

dateModalSubmit.addEventListener('click', function (e) {
  e.preventDefault()
  dateField.value = dateFieldHidden.value
  moveDate = dateFieldHidden.value
  if (moveDate === '') {
    dateModalError.style.display = 'block'
    return
  } else {
    dateModalError.style.display = 'none'
  }
  moveDateFlexible = getCheckboxValue(dateModalFlexibile)
  console.log('moveDateFlexible: ' + moveDateFlexible)
  if (moveDate != '') {
    iconDate.style.color = '#3E9268'
  } else {
    iconDate.style.color = '#FF0066'
  }
  dateModal.style.display = 'none'
  checkAllFieldsHaveData()
  sizeField.focus()
  sizeField.click()
})

sizeModalSubmit.addEventListener('click', function (e) {
  e.preventDefault()

  sizeCategory = getRadioValue(sizeModalCategoryRadio)
  sizeHouse = getRadioValue(sizeModalHouseRadio)
  sizeFootage = sizeModalFootage.value
  sizeFootageUnit = getRadioValue(sizeModalFootageUnitRadio)
  if (sizeFootageUnit === 'square feet') {
    sizeFootageUnit = 'imperial'
  } else if (sizeFootageUnit === 'square meters') {
    sizeFootageUnit = 'metric'
  } else {
    sizeFootageUnit = 'imperial'
  }

  if (localMove === false) {
    if (sizeHouse === '' || sizeCategory === '') {
      sizeModalError.style.display = 'block'
      return
    } else {
      sizeModalError.style.display = 'none'
    }
  } else {
    if (sizeFootage === '' || sizeFootageUnit === '' || sizeCategory === '') {
      sizeModalError.style.display = 'block'
      return
    } else {
      sizeModalError.style.display = 'none'
    }
  }

  sizeField.value = sizeCategory

  sizePets = getCheckboxValue(sizeModalPets)
  sizeStorage = getCheckboxValue(sizeModalStorage)
  sizeVehicle = getCheckboxValue(sizeModalVehicle)
  if (sizeVehicle) {
    sizeVehicleDetails = sizeModalVehicleDetails.value
  } else {
    sizeVehicleDetails = ''
  }
  iconSize.style.color = '#3E9268'
  sizeModal.style.display = 'none'
  document.getElementsByTagName('body')[0].style.overflow = 'auto'
  checkAllFieldsHaveData()
})

sizeModalVehicle.addEventListener('click', function (e) {
  e.stopPropagation()
  let isVehicleChecked = getCheckboxValue(sizeModalVehicle)
  if (isVehicleChecked) {
    sizeModalVehicleDetails.style.display = 'none'
  } else {
    sizeModalVehicleDetails.style.display = 'block'
  }
})

function getCheckboxValue(elem) {
  for (const parentElement of elem.children) {
    const childElementWithClass = parentElement.classList.contains(
      'w--redirected-checked'
    )

    if (childElementWithClass) {
      return true
    }
  }
  return false
}

function getRadioValue(elem) {
  for (const parentElement of elem) {
    const childElementWithClass = parentElement.querySelector(
      '.w--redirected-checked'
    )

    if (childElementWithClass) {
      return parentElement.getElementsByTagName('span')[0].textContent
    }
  }
  return ''
}

let fromFieldGPlaces = new google.maps.places.Autocomplete(fromField)
let toFieldGPlaces = new google.maps.places.Autocomplete(toField)

dateField.setAttribute('readonly', '')
dateField.style.cursor = 'pointer'

// dateField.addEventListener('click', function () {
//   if (dateSelectWrapHidden) {
//     dateSelectWrap.classList.add('widget-js-dateSelectWrap-show')
//     dateSelectWrap.classList.remove('widget-js-dateSelectWrap-hide')
//     dateSelectWrapHidden = false
//     if (!isInViewport(dateSelectWrap)) {
//       dateSelectWrap.scrollIntoView({
//         behavior: 'smooth',
//         block: 'end'
//       })
//     }
//   } else {
//     dateSelectWrap.classList.add('widget-js-dateSelectWrap-hide')
//     dateSelectWrap.classList.remove('widget-js-dateSelectWrap-show')
//     dateSelectWrapHidden = true
//   }
// })

flatpickr(dateFieldHidden, {
  minDate: new Date(),
  maxDate: new Date().fp_incr(999),
  dateFormat: 'm/d/Y',
  inline: true
})

google.maps.event.addListener(
  fromFieldGPlaces,
  'place_changed',
  async function () {
    fromZip = ''
    fromCountry = ''
    fromCoords = []
    errorWrap.style.display = 'none'
    fromField.style.color = '#000'
    let place = fromFieldGPlaces.getPlace()
    for (var i = 0; i < place.address_components.length; i += 1) {
      var addressObj = place.address_components[i]
      for (var j = 0; j < addressObj.types.length; j += 1) {
        if (addressObj.types[j] === 'postal_code') {
          fromZip = addressObj.long_name
          localStorage.currentResidenceZip = addressObj.long_name
        }
        if (addressObj.types[j] === 'country') {
          fromCountry = addressObj.short_name
          localStorage.movingFromCountry = addressObj.short_name
        }
        if (addressObj.types[j] === 'locality') {
          localStorage.currentResidenceCity = addressObj.long_name
        }
        if (addressObj.types[j] === 'administrative_area_level_1') {
          localStorage.currentResidenceState = addressObj.long_name
          localStorage.currentResidenceStateCode = addressObj.short_name
        }
        if (addressObj.types[j] === 'route') {
          localStorage.currentResidenceAddress = addressObj.long_name
        }
        if (addressObj.types[j] === 'street_number') {
          localStorage.currentResidenceStreetNumber = addressObj.long_name
        }
      }
    }
    fromCoords = place.geometry.location

    if (fromZip === '' && fromCountry === 'US') {
      errorWrap.style.display = 'block'
      errorText.innerHTML =
        'We need your Zip code to proceed, please add a specific FROM address or Zip code'
      fromField.style.color = '#808080'
    } else {
      fromAddress = place.formatted_address
      toField.focus()
      iconFrom.style.color = '#3E9268'
      fromField.style.color = '#000'
    }
    await calculateDistance()
    checkAllFieldsHaveData()
  }
)

google.maps.event.addListener(
  toFieldGPlaces,
  'place_changed',
  async function () {
    toCoords = []
    let place = toFieldGPlaces.getPlace()
    toAddress = place.formatted_address
    toCoords = place.geometry.location
    for (var i = 0; i < place.address_components.length; i += 1) {
      var addressObj = place.address_components[i]
      for (var j = 0; j < addressObj.types.length; j += 1) {
        if (addressObj.types[j] === 'country') {
          localStorage.movingToCountry = addressObj.short_name
        }
        if (addressObj.types[j] === 'locality') {
          localStorage.destinationResidenceCity = addressObj.long_name
        }
        if (addressObj.types[j] === 'administrative_area_level_1') {
          localStorage.destinationResidenceState = addressObj.long_name
          localStorage.destinationResidenceStateCode = addressObj.short_name
        }
        if (addressObj.types[j] === 'postal_code') {
          localStorage.destinationResidenceZip = addressObj.long_name
        }
        if (addressObj.types[j] === 'route') {
          localStorage.destinationResidenceAddress = addressObj.long_name
        }
        if (addressObj.types[j] === 'street_number') {
          localStorage.destinationResidenceStreetNumber = addressObj.long_name
        }
      }
    }
    dateField.focus()
    dateField.click()
    iconTo.style.color = '#3E9268'
    await calculateDistance()
    checkAllFieldsHaveData()
  }
)

// DISTANCE CALCULATOR
async function calculateDistance() {
  if (fromCoords === null || toCoords === null) {
    console.log('No coords')
    return
  }
  return new Promise((resolve, reject) => {
    const service = new google.maps.DistanceMatrixService()
    service.getDistanceMatrix(
      {
        origins: [fromCoords],
        destinations: [toCoords],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
      },
      (response, status) => {
        if (status === 'OK') {
          distance = response.rows[0].elements[0].distance.text
          distance = parseInt(distance.replace(/,/g, ''))

          if (distance <= 50) {
            localMove = true
            console.log('Local Move value changed: ' + localMove)
          } else {
            localMove = false
            console.log('Local Move value changed: ' + localMove)
          }
          console.log('DISTANCE')
          console.log(distance)
          console.log(typeof distance)
        } else {
          console.log('Error: ' + status)
          reject(new Error('Distance calculation failed'))
        }
      }
    )
  })
}

// DISTANCE CALCULATOR

fromField.oninput = function () {
  if (fromField.value == '') {
    iconFrom.style.color = '#FF0066'
    fromAddress = ''
  }
  if (fromField.value != fromAddress) {
    fromAddress = ''
    iconFrom.style.color = '#FF0066'
  }
  checkAllFieldsHaveData()
}

toField.oninput = function () {
  if (toField.value == '') {
    iconTo.style.color = '#FF0066'
    toAddress = ''
  }
  if (toField.value != fromAddress) {
    toAddress = ''
    iconTo.style.color = '#FF0066'
  }
  checkAllFieldsHaveData()
}

function checkAllFieldsHaveData() {
  console.log('checkAllFieldsHaveData')
  // console.log('Local Move value: ' + localMove)
  // console.log('fromAddress: ' + fromAddress)
  // console.log('toAddress: ' + toAddress)
  // console.log('moveDate: ' + moveDate)
  // console.log('fromField.value: ' + fromField.value)
  // console.log('sizeHouse: ' + sizeHouse)
  // console.log('sizeCategory: ' + sizeCategory)

  if (localMove === true) {
    if (
      fromAddress &&
      toAddress &&
      moveDate &&
      fromField.value != '' &&
      sizeCategory &&
      sizeFootage &&
      sizeFootageUnit
    ) {
      allFieldsHaveData = true
      goBtn.style.cursor = 'pointer'
      goBtn.style.backgroundColor = '#000000'
    } else {
      allFieldsHaveData = false
      goBtn.style.cursor = 'not-allowed'
      goBtn.style.backgroundColor = '#c7c7c7'
    }
  } else {
    if (
      fromAddress &&
      toAddress &&
      moveDate &&
      fromField.value != '' &&
      sizeHouse &&
      sizeCategory
    ) {
      allFieldsHaveData = true
      goBtn.style.cursor = 'pointer'
      goBtn.style.backgroundColor = '#000000'
    } else {
      allFieldsHaveData = false
      goBtn.style.cursor = 'not-allowed'
      goBtn.style.backgroundColor = '#c7c7c7'
    }
  }
}

// iconFromWrap.addEventListener('click', function () {
//   fromField.focus()
// })
// iconToWrap.addEventListener('click', function () {
//   toField.focus()
// })
// iconDateWrap.addEventListener('click', function () {
//   dateField.click()
// })

goBtn.addEventListener('click', function (e) {
  e.preventDefault()
  if (localMove === true) {
    finalUrl =
      'https://stage-journey.shyftmoving.com/' +
      '?origin=' +
      encodeURIComponent(fromAddress) +
      '&destination=' +
      encodeURIComponent(toAddress) +
      '&date=' +
      encodeURIComponent(moveDate) +
      '&flexibleDate=' +
      encodeURIComponent(moveDateFlexible) +
      '&leadSource=aarp' +
      '&homeSize=' +
      encodeURIComponent(sizeFootage) +
      '&homeSizeUnit=' +
      encodeURIComponent(sizeFootageUnit) +
      '&pets=' +
      encodeURIComponent(sizePets) +
      '&storage=' +
      encodeURIComponent(sizeStorage) +
      '&vehicleDetails=' +
      encodeURIComponent(sizeVehicleDetails) +
      '&homeCategory=' +
      encodeURIComponent(sizeCategory)

    if (allFieldsHaveData) {
      window.location.href = finalUrl
    }
  } else {
    toLocalStorage()
    window.location.href = '/get-quote'
  }
})

function toLocalStorage() {
  localStorage.movingFrom = fromAddress
  // localStorage.movingFromLat = this.movingFromLat
  // localStorage.movingFromLng = this.movingFromLng
  localStorage.movingTo = toAddress
  // localStorage.movingToLat = this.movingToLat
  // localStorage.movingToLng = this.movingToLng
  localStorage.movingDate = moveDate
  localStorage.movingDateFlexible = moveDateFlexible
  localStorage.movingSize = JSON.stringify(this.movingSize) //JSON.parse to get data
  let movingSizeData = {
    moveType: sizeHouse,
    moveObjects: sizeCategory,
    moveVehicle: sizeVehicleDetails,
    movePets: sizePets,
    moveStorage: sizeStorage
  }

  localStorage.movingSize = JSON.stringify(movingSizeData)
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

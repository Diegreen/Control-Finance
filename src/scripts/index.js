import './modal.js'

// Variáveis globais
let insertedValue = [
    {
      id: 0,
      value: 19.0,
      categoryID: 0,
    },
    {
      id: 1,
      value: 400.0,
      categoryID: 1,
    },
    {
      id: 2,
      value: 193.0,
      categoryID: 1,
    },
  ];
  
let insertedValuesfiltered = insertedValue;

function transformValueToPrice(value) {
  const valueToPrice = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return valueToPrice
}

function addAllInsertedValuesToSum() {
  let total = 0

  insertedValue.map((item) => {
    if (item.categoryID === 1) total = total - item.value  
      else total = total + item.value
  })

  return transformValueToPrice(total)
}

function renderTotalValuesDOM() {
  const total = addAllInsertedValuesToSum()

  const totalElement = document.querySelector('#totalValue')
  
  totalElement.innerHTML = total
}

function renderArrayOnScreen() {
  const listValuesContainer = document.querySelector('.list__values')

  let html = ''

  insertedValuesfiltered.forEach((item) => {
    html += `<div class="listItem">
      <span class="value">${transformValueToPrice(item.value)}</span>
      <span class="category">${item.categoryID === 0 ? 'Entrada' : 'Saída'}</span>
      <button class="removeItensOnlist" onClick="excludeItemArray(${item.id})"><img src="/src/assets/trash.svg" alt="#"> </button>
    </div>`
  })

  listValuesContainer.innerHTML = html
}


function filterArrayRendered(category) {
  // 0 = categoryId = 0 || 1 = categoryId 1 || 2 = todos
  if (category == 0) {
    insertedValuesfiltered = insertedValue.filter((item) => item.categoryID === 1) 
  } else if (category == 1) {
    insertedValuesfiltered = insertedValue.filter((item) => item.categoryID === 0) 
  } else {
    insertedValuesfiltered = insertedValue
  }

  renderArrayOnScreen()
}

function filterButtonsHandle(event) {
  const element = event.target

  element.classList.add('active')

  filterArrayRendered(element.value)
}

// controle das funçoes após a pagina ser carregada
document.addEventListener('DOMContentLoaded', function() {
  const entryFilterButton = document.querySelector('#entryFilter')
  const expensesFilterButton = document.querySelector('#expenseFilter')
  const allFilterButton = document.querySelector('#nonFilter')

  const formExpenses = document.querySelector('#addExpenseToArray')

  formExpenses.addEventListener('submit', (event) => {
    formSubmit(event)
    entryFilterButton.classList.remove('active')
    expensesFilterButton.classList.remove('active')
    allFilterButton.classList.add('active')  
    filterArrayRendered()
    renderTotalValuesDOM()
  })

  entryFilterButton.addEventListener('click', (event) => {
    entryFilterButton.classList.remove('active')
    expensesFilterButton.classList.remove('active')
    allFilterButton.classList.remove('active')  
    filterButtonsHandle(event)
  })
  expensesFilterButton.addEventListener('click', (event) => {
    entryFilterButton.classList.remove('active')
    expensesFilterButton.classList.remove('active')
    allFilterButton.classList.remove('active')  
    filterButtonsHandle(event)
  })
  allFilterButton.addEventListener('click', (event) => {
    entryFilterButton.classList.remove('active')
    expensesFilterButton.classList.remove('active')
    allFilterButton.classList.remove('active')  
    filterButtonsHandle(event)
  })

  renderTotalValuesDOM()
  renderArrayOnScreen()

  handleModal()
  inputMasks()
});

function formSubmit(event) {
  event.preventDefault()

  const form = event.target

  const value = convertToNumber(form.valueInput.value)
  const isEntry = Number(form.isEntryInput.value)

  console.log(isEntry)
  const submitData = {
    id: insertedValue.length + 1,
    categoryID: isEntry,
    value
  }

  insertedValue.push(submitData)
}
  
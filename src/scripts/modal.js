function handleModal() {
  openModalButton = document.querySelector('.insert-value')
  modalContainer = document.querySelector('.modal__controller')
  closeModalButtonX = document.querySelector('.modal__closeModal')
  cancelModalButton = document.querySelector('.modal__cancelModal')

  openModalButton && openModalButton.addEventListener('click', () => {
    modalContainer.showModal()
  })

  closeModalButtonX && closeModalButtonX.addEventListener('click', () => {
    modalContainer.close()
  })

  cancelModalButton && cancelModalButton.addEventListener('click', () => {
    modalContainer.close()
  })
}

function inputMasks() {
  openModalButton = document.querySelector('.input_valueModal')

  openModalButton.addEventListener('keyup', (event) => formatPrice(event))
}

function formatPrice(event) {
  let value = event.target.value;
  
  // Remove todos os caracteres, exceto os dígitos numéricos
  value = value.replace(/\D/g, '');
  
  // Formata o valor como preço em formato R$
  value = (value / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  
  event.target.value = value;
}

function convertToNumber(value) {
  value = value.replace(/\D/g, '');

  // Converte para número
  const numericValue = parseFloat(value) / 100;

  return numericValue 
}

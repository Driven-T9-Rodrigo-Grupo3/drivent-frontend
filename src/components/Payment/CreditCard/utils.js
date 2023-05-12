export function paymentDataValidation(payment) {
  if (payment.cardData.issuer === 'unknown') {
    return 'Insira um cartão de crédito válido.';
  }

  if (!payment.cardData.name || !payment.cardData.number || !payment.cardData.expirationDate || !payment.cardData.cvv) {
    return 'Preencha todos os dados do formulário.';
  }

  if (payment.cardData.number.length < 15 ) {
    return 'Você forneceu um número de cartão de crédito em formato inválido.';
  }

  if (payment.cardData.cvv.length !== 3) {
    return 'O CVC fornecido é inválido.';
  }

  const month = Number(payment.cardData.expirationDate.slice(0, 2));
  const year = Number(payment.cardData.expirationDate.slice(3));
  const expirationDate = new Date(`20${year}-${month}-01`);
  
  if (expirationDate <= new Date()) {
    return 'Data de expiração inválida.';
  }

  if (month > 12) {
    return 'O mês inserido é inválido.';
  }

  return true;
}

export function sanitizeCreditCardNumber(creditCardNumber) {
  return creditCardNumber.replace(/\D/g, '');
}

function parseExpirationDate(validThru) {
  const [month, year] = validThru.split('/');
  const adjustedYear = `20${year}`;
  const expirationDate = new Date(adjustedYear, month - 1, 1);

  return expirationDate;
}

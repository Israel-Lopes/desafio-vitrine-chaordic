let carrossel = document.getElementById('carrossel');
let position = -1289;
let nextBtn = document.getElementById("next-btn");
let previusBtn = document.getElementById("previous-btn");

nextBtn.onclick = () => {
    if (position <= -2289) {
        return;
    }
    position -= 200;
    carrossel.style.left = `${position}px`;
};

previusBtn.onclick = () => {
    if (position >= -1289) {
        return;
    }
    position += 200;
    carrossel.style.left = `${position}px`;
};

fetch('../X.json')
    .then(response => response.json())
    .then(json => X(json))
    .catch(error => console.error('Erro ao carregar arquivo JSON:', error));

function X(response) {
    console.log(response);

    let productsHtml = ''; // Criar uma variável para armazenar o HTML dos produtos

    for (let i = 0; i < response.data.recommendation.length; i++) {
        let item = response.data.recommendation[i];

        // Adicionar o HTML dos produtos à variável productsHtml
        productsHtml += `
            <li id="${item.businessId}" class="product">
                <a href="${item.detailUrl}">
                    <img src="${item.imageName}" />
                    <div>${item.name}</div>
                    <div>
                        ${item.oldPrice ? "De: " + item.oldPrice : ''}
                    </div>
                    <div class="price-color">
                        Por:  <strong class="price">${item.price}</strong>
                    </div>
                    <div class="price-color">${item.productInfo.paymentConditions}</div>
                </a>
            </li>
        `;
    }

    carrossel.innerHTML = productsHtml; // Atualizar o conteúdo do carrossel com os produtos
}

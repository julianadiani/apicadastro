const lista = document.getElementById('listaClientes');
const API = 'https://crudcrud.com/api/f640a28460aa4258bc9d21e93c0185c6/clientes';

// Carrega clientes na tela
fetch(API)
  .then(res => res.json())
  .then(clientes => {
    clientes.forEach(cliente => renderizaCliente(cliente));
  });

document.getElementById("add").addEventListener("click", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  if (!nome || !email) return;

  fetch(API, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, email })
  })
    .then(res => res.json())
    .then(cliente => {
      renderizaCliente(cliente);
      document.getElementById("nome").value = "";
      document.getElementById("email").value = "";
    });
});

function renderizaCliente(cliente) {
  const item = document.createElement('li');
  item.setAttribute('data-id', cliente._id);
  item.innerHTML = `
    <strong>${cliente.nome}</strong> - ${cliente.email}
    <button onclick="remover('${cliente._id}')">Excluir</button>
  `;
  lista.appendChild(item);
}

function remover(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE"
  }).then(() => {
    const item = document.querySelector(`li[data-id="${id}"]`);
    if (item) lista.removeChild(item);
  });
}
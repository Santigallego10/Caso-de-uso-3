class Libro {
  constructor(titulo, autor, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
  }
}

class Biblioteca {
  constructor() {
    this.inventario = [];
    this.librosPrestados = [];
  }

  agregarLibro(libro) {
    this.inventario.push(libro);
  }
  eliminarLibro(libro) {
    const index = this.inventario.indexOf(libro);
    if (index !== -1) {
      this.inventario.splice(index, 1);
    }
  }
  buscarPorTitulo(titulo) {
    return this.inventario.filter((libro) =>
      libro.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  }
  prestarLibro(libro) {
    const index = this.inventario.indexOf(libro);
    if (index !== -1) {
      this.inventario.splice(index, 1);
      this.librosPrestados.push(libro);
    }
  }
  devolverLibro(libro) {
    const index = this.librosPrestados.indexOf(libro);
    if (index !== -1) {
      this.librosPrestados.splice(index, 1);
      this.agregarLibro(libro);
    }
  }
}

const biblioteca = new Biblioteca();

biblioteca.agregarLibro(new Libro("Clean Code", "Robert C. Martin", "123"));
biblioteca.agregarLibro(
  new Libro("JavaScript: The Definitive Guide", "David Flanagan", "456")
);
biblioteca.agregarLibro(
  new Libro(
    "Design Patterns",
    "Erich Gamma, John Vlissides, Richard Helm, Ralph Johnson",
    "789"
  )
);

mostrarInventario();

function prestarLibro(isbn) {
  const libroPrestado = biblioteca.inventario.find(
    (libro) => libro.isbn === isbn
  );
  if (libroPrestado) {
    biblioteca.prestarLibro(libroPrestado);
    mostrarLibrosPrestados();
  }
}

function devolverLibro(isbn) {
  const libroDevuelto = biblioteca.librosPrestados.find(
    (libro) => libro.isbn === isbn
  );
  if (libroDevuelto) {
    biblioteca.devolverLibro(libroDevuelto);
    mostrarLibrosPrestados();
  }
}

function mostrarLibrosPrestados() {
  const librosPrestadosUl = document.getElementById("librosPrestados");
  librosPrestadosUl.innerHTML = "";

  biblioteca.librosPrestados.forEach((libro) => {
    const libroLi = document.createElement("li");
    libroLi.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const titulo = document.createElement("span");
    titulo.textContent = libro.titulo;

    const autor = document.createElement("span");
    autor.textContent = libro.autor;

    const devolverBtn = document.createElement("button");
    devolverBtn.classList.add("btn", "btn-primary", "btn-sm");
    devolverBtn.textContent = "Devolver";
    devolverBtn.onclick = function () {
      devolverLibro(libro.isbn);
    };

    libroLi.appendChild(titulo);
    libroLi.appendChild(autor);
    libroLi.appendChild(devolverBtn);
    librosPrestadosUl.appendChild(libroLi);
  });
}

function buscarLibro() {
  const input = document.getElementById("searchInput").value;
  const resultados = biblioteca.buscarPorTitulo(input);
  mostrarResultados(resultados);
}

function mostrarResultados(resultados) {
  const resultadosDiv = document.getElementById("resultados");

  resultados.forEach((libro) => {
    const libroCard = document.createElement("div");
    libroCard.classList.add("card", "mt-3");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = libro.titulo;

    const autor = document.createElement("p");
    autor.classList.add("card-text");
    autor.textContent = `Autor: ${libro.autor}`;

    const isbn = document.createElement("p");
    isbn.classList.add("card-text");
    isbn.textContent = `ISBN: ${libro.isbn}`;

    const prestarBtn = document.createElement("button");
    prestarBtn.classList.add("btn", "btn-primary");
    prestarBtn.textContent = "Prestar";
    prestarBtn.onclick = function () {
      prestarLibro(libro.isbn);
    };

    cardBody.appendChild(titulo);
    cardBody.appendChild(autor);
    cardBody.appendChild(isbn);
    cardBody.appendChild(prestarBtn);
    libroCard.appendChild(cardBody);
    resultadosDiv.appendChild(libroCard);
  });
}

function agregarLibro(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const isbn = document.getElementById("isbn").value;

  const nuevoLibro = new Libro(titulo, autor, isbn);
  biblioteca.agregarLibro(nuevoLibro);

  event.target.reset();

  const input = document.getElementById("searchInput").value;
  const resultados = biblioteca.buscarPorTitulo(input);
  mostrarResultados(resultados);
  mostrarInventario();
}

document
  .getElementById("agregarLibroForm")
  .addEventListener("submit", agregarLibro);

function eliminarLibro(isbn) {
  const libroEliminado = biblioteca.inventario.find(
    (libro) => libro.isbn === isbn
  );
  if (libroEliminado) {
    biblioteca.eliminarLibro(libroEliminado);
    mostrarInventario();
  }
}

function mostrarInventario() {
  const inventarioUl = document.getElementById("inventario");
  inventarioUl.innerHTML = "";
  biblioteca.inventario.forEach((libro) => {
    const libroLi = document.createElement("li");
    libroLi.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const titulo = document.createElement("span");
    titulo.textContent = libro.titulo;

    const autor = document.createElement("span");
    autor.textContent = libro.autor;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.classList.add("btn", "btn-danger", "btn-sm");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.onclick = function () {
      eliminarLibro(libro.isbn);
    };

    libroLi.appendChild(titulo);
    libroLi.appendChild(autor);
    libroLi.appendChild(eliminarBtn);
    inventarioUl.appendChild(libroLi);
  });
}

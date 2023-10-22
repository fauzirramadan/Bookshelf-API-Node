const nanoid = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedt = newDate().toISOString();
  const updatedt = newDate().toISOString();

  if (name === undefined) {
    const response = h.response({
      success: 'fail',
      message: 'Gagal menambakahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      success: 'fail',
      message: 'Gagal menambakahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedt,
    updatedt,
  };

  books.push(newBook);
  const isAdded = bookshelf.filter((book) => book.id === id).length > 0;

  if (isAdded) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    success: 'fail',
    message: 'Gagal menambakahkan buku',
  });
  response.code(500);
  return response;
};

const getAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const filteredBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        filteredBook,
      },
    });
    response.code(200);
    return response;
  }

  if (reading !== undefined) {
    const filteredBook = books.filter((book) => (reading === 0 ? books.reading === false : books.reading === true));
    const response = h.response({
      status: 'success',
      data: {
        filteredBook,
      },
    });
    response.code(200);
    return response;
  }

  if (finished !== undefined) {
    const filteredBook = books.filter((book) => (finished === 0 ? books.finished === false : books.finished === true));
    const response = h.response({
      status: 'success',
      data: {
        filteredBook,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: { book },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedt = newDate().toISOString();

  const index = books.findIndex((book) => book.id === id)[0];

  if (name === undefined) {
    const response = h.response({
      success: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      success: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedt,
    };

    const response = h.response({
      success: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    success: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id)[0];

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      success: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    success: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookHandler,
  deleteBookHandler,
};

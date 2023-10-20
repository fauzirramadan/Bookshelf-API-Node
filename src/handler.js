const nanoid = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedt = newDate().toISOString();
  const updatedt = insertedt;

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

const getAllBookHandler = () => ({
  status: 'success',
  data: { books },
});

const getDetailBook = (request, h) => {
  const { id } = request.params;
};

module.exports = {
  addBookHandler,
  getAllBookHandler,
  getDetailBook,
};
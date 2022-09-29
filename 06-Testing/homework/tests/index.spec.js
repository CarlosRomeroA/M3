const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => {
      agent.post('/sumArray').send({array: [5,3], num: 1})
      .expect(200)
    });
    it('responds with and object with message `true`', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
      }));
      it('responds with false if... ', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 1})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));
      it('responds with false if... ', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 10})
        .then((res) => {
          expect(res.body.result).toEqual(false);
      }));
  });

  describe('POST /numString', () => {
    it('reponds with 400 is string is a number', () => {
      agent.post('/numString').send({string: 80}).expect(400)
    })
    it('reponds with 400 is string is empty', () => {
      agent.post('/numString').send({string: ''}).expect(400)
    })
    it('reponds with 200 if...', () => {
      return agent.post('/numString').send({string: 'hola'})
      .then(res => {
        expect(res.body.result).toEqual(4)        
      })
    })
  })

  describe('POST /pluck', () => {
    const array = [
      {alumno: 'Carlos', edad: 37, carrera: 'fullstack'},
      {alumno: 'Nico', edad: 34, carrera: 'data'},
      {alumno: 'Leo', edad: 30, carrera: 'fullstack'}
    ]
    it('responds with 400 if...', () => {
      agent.post('/pluck').send({array: 101, prop: 'edad'}).expect(400)
    })
    it('responds with 400 if...', () => {
      agent.post('/pluck').send({array: array, prop: ''}).expect(400)
    })
    it('responds with 400 if...', () => {
      agent.post('/pluck').send({array: array, prop: 'edad'}).expect(200)
    })
    it('responds with 400 if...', () => {
      return agent.post('/pluck').send({array: array, prop: 'edad'})
      .then(res => {
        expect(res.body.result).toEqual([37, 34, 30])
      })
    })
  })

});


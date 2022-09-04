// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Todos", () => {
    let todo_Id = '';

    describe("4 ENDPOINTS", () => {
        // Test to get all todo items
        it("should get all todo items", (done) => {
            chai.request(app)
                .get('/api/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
         });

        // Test to post a single todo item
        it("should post a single todo item", (done) => {
            chai.request(app)
                .post('/api/todos?todoItem=TestItem&description=test&type=Test')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    todo_Id = res.body.data._id;
                    done();
                 });
        })
        // Test to update a single todo item
        it("should update a single todo item", (done) => {
             chai.request(app)
                 .put(`/api/todos/${todo_Id}?todoItem=TestItem2&description=test&type=Test`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });

        // Test to delete a single todo item
        it("should delete a single todo item", (done) => {
             chai.request(app)
                 .delete(`/api/todos/${todo_Id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     done();
                  });
         });
    });
});
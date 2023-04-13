const chai = require('chai');
const chaiHttp = require('chai-http');
const { after, describe, it } = require('mocha');
const app = require('../reddit');
chai.use(chaiHttp);
const agent = chai.request.agent(app);

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require('../models/post');

const should = chai.should();

describe('Posts', () => {
  // Post that we'll use for testing purposes
  const newPost = {
    title: 'post title',
    url: 'https://www.google.com',
    summary: 'post summary',
  };
  it('should create with valid attributes at POST /posts/new', (done) => {
    // TODO: test code goes here!
    // Checks how many posts there are now
        Post.estimatedDocumentCount()
        .then((initialDocCount) => {
            agent
            .post('/posts/new')
            // This line fakes a form post,
            // since we're not actually filling out a form
            .set('content-type', 'application/x-www-form-urlencoded')
            // Make a request to create another
            .send(newPost)
            .then((res) => {
                Post.estimatedDocumentCount()
                .then((newDocCount) => {
                    // Check that the database has status 200
                    res.should.have.status(200);
                    // Check that the database has one more post in it
                    newDocCount.should.equal(initialDocCount + 1);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
            })
            .catch((err) => {
                done(err);
            });
        })
        .catch((err) => {
            done(err);
        });
        
    });
    
    after(() => {
    Post.findOneAndDelete(newPost);
    });
});

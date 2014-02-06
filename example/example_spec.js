var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;


describe('protractor library', function() {
    it('should expose the correct global variables', function() {
        expect(protractor).to.exist;
        expect(browser).to.exist;
        expect(by).to.exist;
        expect(element).to.exist;
        expect($).to.exist;
    });
});

describe('angularjs homepage', function() {
    it('should greet the named user', function() {
        browser.get('http://www.angularjs.org');
        element(by.model('yourName')).sendKeys('Julie');
        var greeting = element(by.binding('yourName'));
        expect(greeting.getText()).to.eventually.equal('Hello Julie!');
    });

    describe('todo list', function() {
        var todoList;
        beforeEach(function() {
            browser.get('http://www.angularjs.org');
            todoList = element.all(by.repeater('todo in todos'));
        });
        it('should list todos', function() {
            expect(todoList.count()).to.eventually.equal(2);
            expect(todoList.get(1).getText()).to.eventually.equal('build an angular app');
        });
        it('should add a todo', function() {
            var addTodo = element(by.model('todoText'));
            var addButton = element(by.css('[value="add"]'));
            addTodo.sendKeys('write a protractor test');
            addButton.click();
            expect(todoList.count()).to.eventually.equal(3);
            expect(todoList.get(2).getText()).to.eventually.equal('write a protractor test');
        });
    });
});

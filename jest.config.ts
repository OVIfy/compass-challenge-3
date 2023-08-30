import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/middlewares'
const baseTestDir = '<rootDir>/test/middlewares'

        

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `<rootDir>/src/**/*.ts`
    ],
    testMatch : [
        `<rootDir>/test/**/*.ts`
    ]
}

export default config;

//Structure of a properly written unit test
/* 
    AAA principles:
    - arrange
    - act
    - assert

    Setup
    Teardown
*/

//jest measures - set of functions whhich exist us in comparing actual and expected objects/values e.g toBe
//toBe is for primitive types
//toEqual and toStrictEqual is for objects
//toHavelength for length of objects that have a length property
//toContain toContain<string> arrayContaining toBeTruthy


//F.I.R.S.T PRINCIPLES
/* 
 Fast
 Independent - test should not share their state with other tests or systems, 
                also the order in which tests are run doesn't matter, 
                contradiction with fat principle independent test setup takes plenty time
 Repeatable - with the same input the test should give the same output, 
                if a test writes into a database it should also clean itself so that the same value can be used again
 Self-validating - the test should be able to validate itself only true or false are allowed
 Thorough
*/

//TEST PROPERTIES
/*
    only
    skip
    todo
    concurrent
*/

//TEST ALIASES
/*
    xit - it.skip
    fit - it.only
*/

//JEST WATCH MODE

//CODE COVERAGE
/* istanbul ignore text */

//TDD - TEST DRIVEN DEVELOPMENT
/*
    great way of testing when for are extending an application or fixing bugs
    fail - pass - refactor
    coding katas instead of coding exercises
*/


//toContain not.toContain

//TEST DOUBLES
/*
    stubs
    fakes - simplified working implementation and they take a shortcut, services
    mocks - preprogramed with expectations, which object is called, how many times is it called, and track the way it is called
    spies - track information about how a unit is called in out test, are used to track method calls inside objects
    dummy

    some units aren't fast (for e.g accessing a database/database connections) replace them during tests 
    what are test doubles?
    pretend objects that can be used in place of a real object for testing purposes
*/

//TESTING/MOCKING STYLES LONDON/CHICAGO
//stubs
//chicago collection of pieces, test from a broader view, little use of mock
//London relies heavily on mock, why? because it considers a unit  a class, 
//because a class has dependencies, 
//for london style unit test, a lot of its dependencies will have to be mocked
//best way to define a unit according to the tutor is - a requirement

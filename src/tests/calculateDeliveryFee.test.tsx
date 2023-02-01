import React from 'react';
import { shallow } from 'enzyme';
import { calculateDeliveryFee } from '../components/calculateDeliveryFee/CalculateDeliveryFee';

// Test negative values
test('test negative values for cartValue', () => {
  const input = {
    cartValue: -1,
    deliveryDistance: 0,
    numberOfItems: 0,
    time: '',
  };
  expect(function () {
    calculateDeliveryFee(input);
  }).toThrow(new RangeError('Check the ranges of the values'));
});

test('test negative values for delivery distance', () => {
  const input = {
    cartValue: 0,
    deliveryDistance: -1,
    numberOfItems: 0,
    time: '',
  };
  expect(function () {
    calculateDeliveryFee(input);
  }).toThrow(new RangeError('Check the ranges of the values'));
});

test('test negative values for number of items', () => {
  const input = {
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: -1,
    time: '',
  };
  expect(function () {
    calculateDeliveryFee(input);
  }).toThrow(new RangeError('Check the ranges of the values'));
});

test('general cases', () => {
  expect(
    calculateDeliveryFee({
      cartValue: 15,
      deliveryDistance: 1499,
      numberOfItems: 2,
      time: '2023-02-01T21:43',
    })
  ).toBe(3);

  expect(
    calculateDeliveryFee({
      cartValue: 11,
      deliveryDistance: 1500,
      numberOfItems: 2,
      time: '2023-02-01T21:43',
    })
  ).toBe(3);

  expect(
    calculateDeliveryFee({
      cartValue: 13,
      deliveryDistance: 1501,
      numberOfItems: 2,
      time: '2023-02-01T21:43',
    })
  ).toBe(4);

  expect(
    calculateDeliveryFee({
      cartValue: 15,
      deliveryDistance: 1501,
      numberOfItems: 5,
      time: '2023-02-01T21:43',
    })
  ).toBe(4.5);

  expect(
    calculateDeliveryFee({
      cartValue: 15,
      deliveryDistance: 1501,
      numberOfItems: 13,
      time: '2023-02-01T21:43',
    })
  ).toBe(9.7);

  expect(
    calculateDeliveryFee({
      cartValue: 15,
      deliveryDistance: 1501,
      numberOfItems: 13,
      time: '2023-02-03T17:43',
    })
  ).toBe(11.64);

  expect(
    calculateDeliveryFee({
      cartValue: 9.65,
      deliveryDistance: 2001,
      numberOfItems: 13,
      time: '2023-02-01T17:43',
    })
  ).toBe(11.05);
});

test('more than 100 euro for car value', () => {
  expect(
    calculateDeliveryFee({
      cartValue: 100,
      deliveryDistance: 2000,
      numberOfItems: 5,
      time: '2023-02-01T17:43',
    })
  ).toBe(0);

  expect(
    calculateDeliveryFee({
      cartValue: 150,
      deliveryDistance: 3999,
      numberOfItems: 5,
      time: '2023-02-03T17:43',
    })
  ).toBe(0);

  expect(
    calculateDeliveryFee({
      cartValue: 150,
      deliveryDistance: 50900,
      numberOfItems: 15,
      time: '2023-02-03T15:43',
    })
  ).toBe(0);
});

test('maximum delivery fee', () => {
  expect(
    calculateDeliveryFee({
      cartValue: 99.99,
      deliveryDistance: 2000000,
      numberOfItems: 5,
      time: '2023-02-02T17:43',
    })
  ).toBe(15);

  expect(
    calculateDeliveryFee({
      cartValue: 99,
      deliveryDistance: 3999,
      numberOfItems: 50,
      time: '2023-02-01T17:43',
    })
  ).toBe(15);

  expect(
    calculateDeliveryFee({
      cartValue: 0.1,
      deliveryDistance: 2500,
      numberOfItems: 3000,
      time: '2023-02-03T15:43',
    })
  ).toBe(15);
});
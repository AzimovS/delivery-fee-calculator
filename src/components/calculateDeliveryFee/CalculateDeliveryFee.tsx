import { Delivery } from '../../types';

export const calculateDeliveryFee = (values: Delivery) => {
  if (
    values.cartValue < 0 ||
    values.deliveryDistance < 0 ||
    values.numberOfItems < 0
  ) {
    throw new RangeError('Check the ranges of the values');
  }
  if (values.cartValue >= 100) {
    return 0;
  }
  const orderSurcharge = Math.max(10 - values.cartValue, 0);
  const distanceFee =
    values.deliveryDistance <= 1000
      ? 2
      : 2 + Math.floor((values.deliveryDistance - 501) / 500);
  let perItemFee = 0;
  if (values.numberOfItems > 4) {
    perItemFee = (values.numberOfItems - 4) * 0.5;
    if (values.numberOfItems > 12) {
      perItemFee += 1.2;
    }
  }
  const day = new Date(values.time).getDay();
  const hours = new Date(values.time).getHours();
  let res = 0;
  if (day === 5 && hours >= 15 && hours < 19) {
    res = 1.2 * (orderSurcharge + distanceFee + perItemFee);
  } else {
    res = orderSurcharge + distanceFee + perItemFee;
  }
  return Math.round(Math.min(res, 15) * 100) / 100;
};

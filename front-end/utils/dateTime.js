const DAY_OF_WEEKS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  RANGES = [7, 14, 21, 28],
  DELIVERY_TIME_SEPARATOR = '-',
  DELIVERY_TIME_SUFFIX = ':00';

const getNextDayOfWeek = (date, dayOfWeekIndex, range) => {
  let resultDate = date;
  resultDate.setDate(
    date.getDate() + range + dayOfWeekIndex - date.getDay() - 7
  );
  return resultDate;
};

export const
  getNextDeliveryDate = (dayOfWeek, range = RANGES[0]) => {
    let dayOfWeekIndex = dayOfWeek ? DAY_OF_WEEKS.indexOf(dayOfWeek) : -1;
    if (dayOfWeekIndex !== -1) {
      return getNextDayOfWeek(new Date(), dayOfWeekIndex, range);
    }
  },
  getDeliveryDatesPerMonth = (orderDate, dayOfWeek) => {
    let dayOfWeekIndex = dayOfWeek ? DAY_OF_WEEKS.indexOf(dayOfWeek) : -1,
      ranges = RANGES;

    if (dayOfWeekIndex !== -1 && !isNaN(Date.parse(orderDate))) {
      // Get all next delivery date 4 weeks from order date
      orderDate = new Date(orderDate);
      if (dayOfWeekIndex - orderDate.getDay() < 0) {
        ranges = ranges.map(el => el + 7);
      }
      let deliveryDateList = ranges.map(range => {
        return getNextDayOfWeek(new Date(orderDate), dayOfWeekIndex, range);
      });
      // Get only previous delivery date
      let filteredDeliveryDateList = deliveryDateList.filter(date => {
        return date < new Date();
      });
      // Plus next nearest delivery date if available
      if (filteredDeliveryDateList.length < deliveryDateList.length) {
        filteredDeliveryDateList.push(
          deliveryDateList[filteredDeliveryDateList.length]
        );
      }
      return filteredDeliveryDateList;
    }
  },
  getNextPaymentDate = orderDate => {
    if (!isNaN(Date.parse(orderDate))) {
      let date = new Date(orderDate);
      return new Date(date.setMonth(date.getMonth() + 1));
    }
  },
  parseDeliveryTime = deliveryTime => {
    // Original delivery time format: 'HH:00-HH:00' -> will take into account only the last hour
    let splitDeliveryTime =
      deliveryTime && deliveryTime.split(DELIVERY_TIME_SEPARATOR);
    if (splitDeliveryTime && splitDeliveryTime[1]) {
      let trimDeliveryTime = splitDeliveryTime[1].replace(
        DELIVERY_TIME_SUFFIX,
        ''
      );
      return +trimDeliveryTime;
    }
  };

import * as API from '../services/http/api';
import Mock, { Random } from 'mockjs';
import { BASE_URL } from '../services/http/config';

const orderItems = () => {
  const items = [];
  for (let i = 0; i < 5; i++) {
    const item = {
      id: Random.id(),
      name: Random.cname(),
      location: Random.county(true),
      phone: Random.integer(11111111111, 19999999999),
      description: Random.cparagraph(3, 5),
      SOSTime: Random.datetime(),
      trappedNumber: Random.integer(1, 100),
    };
    items.push(item);
  }
  return items;
};

const helpItems = () => {
  const items = [];
  for (let i = 0; i < 5; i++) {
    const item = {
      id: Random.id(),
      name: Random.cname(),
      location: Random.county(true),
      phone: Random.integer(11111111111, 19999999999),
      'status|1': ['available', 'busy', 'rest'],
      'rescueTools|1-1': [
        '救援舟',
        '皮划艇',
        '手电筒',
        '发电机',
        '食物',
        '饮用水',
        '牵引车',
      ],
      description: Random.cparagraph(3, 12),
    };
    items.push(item);
  }
  return items;
};

Mock.mock('/api/order', 'get', {
  count: 500,
  page: 1,
  result: orderItems(),
});

Mock.mock('/api/rescue', 'get', {
  count: 500,
  page: 1,
  result: helpItems(),
});

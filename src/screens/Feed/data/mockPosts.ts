import { Post } from '../../../common/types/post';

export const mockPosts: Post[] = [
  {
    id: '1',
    author: { id: 'u1', name: 'Петр Федько', avatar: 'https://i.pravatar.cc/150?img=1' },
    title: 'Подготовка к лету',
    description: 'Когда вы начинаете бегать по утрам, но чувствуете, что каждый шаг даётся с трудом.',
    image: 'runner',
    type: 'free',
    likes: 12,
    comments: 5,
  },
  {
    id: '2',
    author: { id: 'u2', name: 'Леша Кринд', avatar: 'https://i.pravatar.cc/150?img=2' },
    title: '',
    description: '',
    image: 'graffiti',
    type: 'free',
    likes: 0,
    comments: 0,
  },
  {
    id: '3',
    author: { id: 'u1', name: 'Петр Федько', avatar: 'https://i.pravatar.cc/150?img=1' },
    title: '',
    description: 'Контент скрыт пользователем. Доступ откроется после доната.',
    image: 'runner',
    type: 'paid',
    likes: 0,
    comments: 0,
  },
  {
    id: '4',
    author: { id: 'u2', name: 'Леша Кринд', avatar: 'https://i.pravatar.cc/150?img=2' },
    title: '',
    description: 'Контент скрыт пользователем. Доступ откроется после доната.',
    image: 'graffiti',
    type: 'paid',
    likes: 0,
    comments: 0,
  },
];

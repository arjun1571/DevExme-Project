import { HomePage, TasksPage, ProfilePage } from './pages';
import { withNavigationWatcher } from './contexts/navigation';
import Topic from './pages/Topic/Topic';
import SubTopic from './pages/SubTopic/SubTopic';
import Artical from './pages/Artical/Artical';

const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    },
    {
        path: '/topic',
        element: Topic
    },
    {
        path: '/subtopic',
        element: SubTopic
    },
    {
        path: '/artical',
        element: Artical
    }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});

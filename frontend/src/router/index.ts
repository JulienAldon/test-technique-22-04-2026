import ActorsView from '@/views/ActorsView.vue'
import MoviesView from '@/views/MoviesView.vue'
import MovieView from '@/views/MovieView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: MoviesView,
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: MovieView,
    },
        {
      path: '/actors/',
      name: 'actor',
      component: ActorsView,
    }
  ],
})

export default router

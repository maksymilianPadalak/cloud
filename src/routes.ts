import AudioPlaygroundView from '@/views/AudioPlaygroundView'
import type { RouteRecordRaw } from 'vue-router'

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'Home',
    // component: HomeView,
    component: AudioPlaygroundView,
  },
  // {
  //   path: '/tuner',
  //   name: 'Tuner',
  //   component: () => import('@/views/TunerView/TunerView.vue'),
  // },
  // {
  //   path: '/audio-playground',
  //   name: 'AudioPlayground',
  //   component: () => import('@/views/AudioPlaygroundView'),
  // },
]

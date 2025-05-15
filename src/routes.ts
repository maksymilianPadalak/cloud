import HomeView from '@/views/HomeView'
import SimpleSynthView from '@/views/SimpleSynthView'
import type { RouteRecordRaw } from 'vue-router'

export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/simple-synth',
    name: 'SimpleSynth',
    component: SimpleSynthView,
  },
  {
    path: '/tuner',
    name: 'Tuner',
    component: () => import('@/views/TunerView/TunerView.vue'),
  },
  {
    path: '/audio-playground',
    name: 'AudioPlayground',
    component: () => import('@/views/AudioPlaygroundView'),
  },
]

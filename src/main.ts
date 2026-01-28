import { mount } from 'svelte'
import './core/styler.css';
import Web from './main.svelte';

const app = mount(Web, {
  target: document.getElementById('app')!,
})

export default app

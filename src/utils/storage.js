import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    Notify.failure('Set state error');
  }
}

export function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    Notify.failure('Get state error');
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    Notify.failure('Remove state error');
  }
}

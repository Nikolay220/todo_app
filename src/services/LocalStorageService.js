export default class LocalStorageService {
  static setTodos(todos) {
    localStorage.setItem('todos', todos)
  }
  static getTodos() {
    return localStorage.getItem('todos')
  }
}

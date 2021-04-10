import storage from "./ulti/storage.js";
const init = {
   todos: storage.get(),
   filter: "all",
   filters: {
      all: () => true,
      active: (todo) => !todo.completed,
      completed: (todo) => todo.completed,
   },
   editIndex: null,
};

const acts = {
   add({ todos }, title) {
      if (title) {
         todos.push({ title, completed: false });
         storage.set(todos);
      }
   },
   checked({ todos }, index) {
      todos[index].completed = !todos[index].completed;
      storage.set(todos);
   },
   markAll({ todos }, completed) {
      todos.forEach((todo) => (todo.completed = completed));
      storage.set(todos);
   },
   destroy({ todos }, index) {
      todos.splice(index, 1);
      storage.set(todos);
   },
   switchActiveFilter(state, type) {
      state.filter = type;
   },
   clearCompleted(state) {
      state.todos = state.todos.filter(state.filters.active);
      storage.set(state.todos);
   },
   changeToEdit(state, index) {
      state.editIndex = index;
   },
   savingEdit(state, title) {
      if (state.editIndex !== null) {
         if (title) {
            state.todos[state.editIndex].title = title;
            storage.set(state.todos);
         } else {
            this.destroy(state, state.editIndex);
         }
      }
      state.editIndex = null;
   },
   cancelEdit(state) {
      state.editIndex = null;
   },
};
export default function reducer(state = init, action, args) {
   acts[action] && acts[action](state, ...args);
   console.log(state);
   return state;
}

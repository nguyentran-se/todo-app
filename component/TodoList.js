import html from "../core.js";
import TodoItem from "./TodoItem.js";
import { connect } from "../store.js";

function TodoList(props) {
   const { todos, filter, filters, editIndex } = props;
   return html`
      <section class="main">
         <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            onchange="dispatch('markAll', this.checked)"
            ${todos.every(filters.completed) && "checked"}
         />
         <label for="toggle-all">Mark all as complete</label>
         <ul class="todo-list">
            ${todos
               .filter(filters[filter])
               .map((todo, index) => `${TodoItem({ todo, index, editIndex })}`)}
         </ul>
      </section>
   `;
}

export default connect()(TodoList);

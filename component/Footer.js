import html from "../core.js";
import { connect } from "../store.js";
function Footer(props) {
   const { todos, filter, filters } = props;
   return html`
      <footer class="footer">
         <span class="todo-count"
            ><strong>${todos.filter(filters.active).length}</strong> item
            left</span
         >
         <ul class="filters">
            ${Object.keys(filters).map(
               (type) =>
                  html`
                     <li>
                        <a
                           class=${filter === type && "selected"}
                           href="#"
                           onclick="dispatch('switchActiveFilter', '${type}')"
                           >${type[0].toUpperCase() + type.slice(1)}</a
                        >
                     </li>
                  `
            )}
         </ul>
         <button
            class="clear-completed"
            ${todos.every(filters.active) && "style='display: none'"}
            onclick="dispatch('clearCompleted')"
         >
            Clear completed
         </button>
      </footer>
   `;
}

export default connect()(Footer);

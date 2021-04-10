import html from "../core.js";

function TodoItem({ todo, index, editIndex }) {
   return html`
      <li
         class="${todo.completed && "completed"} 
         ${editIndex === index && "editing"}"
      >
         <div class="view">
            <input
               class="toggle"
               type="checkbox"
               ${todo.completed && "checked"}
               onchange="dispatch('checked', ${index})"
            />
            <label ondblclick="dispatch('changeToEdit', ${index})"
               >${todo.title}</label
            >
            <button
               class="destroy"
               onclick="dispatch('destroy', ${index})"
            ></button>
         </div>
         <input
            class="edit"
            value="${todo.title}"
            onkeyup="event.keyCode === 13 && dispatch('savingEdit', this.value.trim()) 
            || event.keyCode === 27 && dispatch('cancelEdit')"
            onblur="dispatch('savingEdit', this.value.trim())"
         />
      </li>
   `;
}

export default TodoItem;

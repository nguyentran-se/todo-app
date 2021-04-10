//[...strings]strings -> cũng array nhưng mà là array thô(raw) ko use đc
// value lúc này là các literal truyền vào từ bên kia
export default function html([...strings], ...values) {
   return (
      values
         .reduce((acc, curr) => acc.concat(curr, strings.shift()), [
            strings.shift(),
         ])
         .filter((x) => (x && x !== true) || x === 0)
         // x là truthy và x phải != true
         .join("")
   );
}

export function createStore(reducer) {
   // state là dữ liệu của store lưu trong reducer
   let state = reducer();
   /*
   1. Chứa những cái element render ra view
      roots này kiểu như object{root1: 'component của nó',root2... }
   2. Dùng obj Map để traverse dễ hơn, và đặt tên thì tuỳ thích
   */
   const roots = new Map();
   // thằng này sẽ traverse qua roots để render ra view
   function render() {
      // console.log(state);

      // traverse
      for (const [root, component] of roots) {
         // khá hay là những element của Map là array
         const output = component();
         root.innerHTML = output;
      }
   }
   return {
      // công đoạn này là set value cho roots{root1: ..., root2...}
      attach(component, root) {
         // component -> h1, div, ...
         // root này là node element
         roots.set(root, component);
         render();
      },
      // connect view với store, selector dữ liệu cụ thể của store
      //many arrow-func => số tham số = số lượng arrow
      connect(selector = (state) => state) {
         // nhận component rồi bỏ props vào luôn
         return (component) => (props, ...args) =>
            component(Object.assign({}, props, selector(state), ...args));
         //selector(state) dựa vào func truyền vào
      },
      dispatch(action, ...args) {
         // return lại 1 state mới <=> update lại store
         state = reducer(state, action, args);
         render();
      },
   };
}

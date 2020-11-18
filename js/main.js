new Vue({
  el: '#app',
  data() {
    return {
      todos: [],
      allTodos: [],
      currentTab: 'all',
      activeTodosCounter: 0
    };
  },
  methods: {
    addTodo(event) {
      if (event.target.value.trim() !== '') {
        const id = Date.now();
        const description = event.target.value;
        const active = true;
        const todo = {
          id,
          description,
          active
        };        
        this.allTodos.push(todo);
        event.target.value = '';
        this.todos = [...this.allTodos]
        this.activeTodosCounter = this.countActiveTodos;
        this.currentTab = 'all';
        Vue.nextTick(() => {
          this.tabChangeState('.btn-all');
        });
      }
    },
    removeTodo(id) {
      this.allTodos = this.allTodos.filter(item => {
        return item.id !== id;
      });
      this.activeTodosCounter = this.countActiveTodos;
      this.switchTab();
    },
    checkboxOnChange(id) {
      this.allTodos = this.allTodos.map(item => {
        if(item.id === id) {
          item.active = !item.active;
        }
        return item;
      });
      this.activeTodosCounter = this.countActiveTodos;
      this.switchTab();
    },
    activeTodosFilter() {
      return this.allTodos.filter(item => item.active === true);
    },
    completedTodosFilter() {
      return this.allTodos.filter(item => item.active === false);
    },
    allTabClick() {
      this.todos = [...this.allTodos];
      this.tabChangeState('.btn-all');
      this.currentTab = 'all';
    },
    activeTabClick() {
      this.todos = [...this.activeTodosFilter()];
      this.tabChangeState('.btn-active');
      this.currentTab = 'active';
    },
    completedTabClick() { 
      this.todos = [...this.completedTodosFilter()];
      this.tabChangeState('.btn-completed');
      this.currentTab = 'completed';
    },  
    switchTab() {
      switch(this.currentTab) {
        case 'all': 
          this.todos = [...this.allTodos];
          break;
        case 'active':
          this.todos = [...this.activeTodosFilter()];
          break;
        case 'completed':
          this.todos = [...this.completedTodosFilter()];
          break;
      }
    },
    btnClearClick() {
      const completedTodos = this.completedTodosFilter();
      this.allTodos = this.allTodos.filter(item => {
        return !completedTodos.includes(item);
      });
      this.activeTodosCounter = this.countActiveTodos;
      this.switchTab();
    },
    selectAllItemsClick() {
      switch(this.currentTab) {
        case 'all': 
          this.allTodos = this.allTodos.map(item => {
            item.active = false;
            return item;
          });
          this.todos = [...this.allTodos];
          this.activeTodosCounter = this.countActiveTodos;
          break;
        case 'active':
          this.allTodos = this.allTodos.map(item => {
            item.active = false;
            return item;
          });
          this.activeTodosCounter = this.countActiveTodos;
          this.todos = [...this.activeTodosFilter()];
          break;
        case 'completed':
          this.allTodos = this.allTodos.map(item => {
            item.active = true;
            return item;
          });
          this.activeTodosCounter = this.countActiveTodos;
          this.todos = [...this.completedTodosFilter()];
          break;
      }
    },
    tabChangeState(selector) {
      const elemsArray = document.querySelectorAll('.btn');
      elemsArray.forEach(item => item.classList.remove('active')); 
      document.querySelector(`${selector}`).classList.add('active');
    },
    renderStyle(item) {
      return item.active === false ? 'todo-item-checked todo-item-checked::before' : '';
    }
  },
  computed: {
    countActiveTodos() {
      return this.activeTodosFilter().length;
    }
  }
});
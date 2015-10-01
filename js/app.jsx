var STORE = {
  tasks: []
};

var TARSK_STATUS = {
  0: "pending",
  1: "completed",
  2: "deleted"
};

function toggleTaskStatus(id) {
  var pos = getPos(id);

  if(pos !== undefined) {
    var status = STORE.tasks[pos].status;
    status = (status) ? 0 : 1;

    STORE.tasks[pos].status = status;
  }
}

function addTask(taskTitle) {
  var id = STORE.tasks.length + 1;
  var task = {
    id: id,
    title: taskTitle,
    status: 0
  };

  STORE.tasks.push(task);
}

function removeTask(id) {
  var pos = getPos(id);

  if(pos !== undefined) {
    STORE.tasks[pos].status = 2;
  }
}

function getPos(id) {
  var tasks = STORE.tasks;
  var i = 0;
  var pos;
  tasks.forEach(function(task) {
    if(task.id === id) {
      pos = i;
    }
    i++;
  });

  return pos;
}

var AppContainer = React.createClass({
  getInitialState: function() {
    return {
      appTitle: "TASKS.do",
      tasks: STORE.tasks
    };
  },
  render: function() {
    return (
      <div>
        <h1>{this.state.appTitle}</h1>
        <CreateTask />
        <TaskList tasks={this.state.tasks}/>
      </div>
    );
  }
});

var CreateTask = React.createClass({
  onClick: function() {
    var taskInput = document.getElementById("task-input");
    var taskTitle = taskInput.value;

    addTask(taskTitle);
    taskInput.value = "";
  },
  render: function() {
    return (
      <div>
        <input type="text" id="task-input" /> <button onClick={this.onClick}>Add</button>
      </div>
    );
  }
});

var TaskList = React.createClass({
  render: function() {
    var tasks = this.props.tasks;
    var processedTasks = [];

    tasks.forEach(function(task) {
      if(task.status !== 2) {
        processedTasks.push(task);
      }
    });

    return (
      <div className="task-list">
        <ul>
          {processedTasks.map(
            task => <Task task={task} />
          )}
        </ul>
      </div>
    );
  }
});

var Task = React.createClass({
  onClick: function() {
    var task = this.props.task;
    toggleTaskStatus(task.id)
  },
  removeTask: function() {
    var task = this.props.task;
    removeTask(task.id);
  },
  render: function() {
    var task = this.props.task;
    var status = TARSK_STATUS[task.status];

    var checked = "";
    if(task.status === 1) {
      checked = "checked";
    }

    return (
      <li key={task.id}>
        <a className="deleteBtn" onClick={this.removeTask}>del</a>
        {task.status ? <input onClick={this.onClick} type="checkbox" checked /> : <input onClick={this.onClick} type="checkbox" />}
        <p className={status}>{task.title}</p>
      </li>
    );
  }
});

setInterval(function() {
  React.render(
    <AppContainer />,
    document.getElementById("container")
  );
}, 50);
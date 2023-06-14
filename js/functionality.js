function Register() {
  event.preventDefault();
  var getEmailsArray = JSON.parse(localStorage.getItem("userDetail") || "[]");
  let userInsertdetail = {
    email: document.getElementById("registrationForm").elements.signup_email.value,
    username: document.getElementById("registrationForm").elements.sign_name.value,
    credential_pass: document.getElementById("registrationForm").elements.signup_pass.value,
    user_type: document.getElementById("registrationForm").elements.user_type.value
  }
  if (!(userInsertdetail.email)) {
    alert('Invalid Detail');
  } else {
    if(getEmailsArray.includes(userInsertdetail.email)){
      alert('user already exists with given email id');
    } else{
      localStorage.setItem(userInsertdetail.email, JSON.stringify(userInsertdetail));
      getEmailsArray.push(userInsertdetail.email);
      localStorage.setItem('userDetail', JSON.stringify(getEmailsArray));
      alert('Registration done. please log in to continue');
      window.location.href = "index.html";
    }
  }

}

function login() {
  event.preventDefault();
  let email = document.getElementById("loginForm").elements.login_request_email.value;
  let password = document.getElementById("loginForm").elements.login_request_pswd.value;
  let detail = JSON.parse(localStorage.getItem(email));
  if (detail !== null && detail.credential_pass === password) {
    alert('Logged In Successfully');
    sessionStorage.setItem("session_email", detail.email);
    sessionStorage.setItem("set_user_type", detail.user_type);
    window.location.href = "myprojects.html";
  } else {
    alert('Wrong Detail');
  }
}

function logout() {
  event.preventDefault();
  sessionStorage.setItem("session_email", ' ');
  alert('Logged Out Successfully');
  window.location.href = "index.html";
}

function submitTask(value) {
  if (localStorage.getItem('CreatedTasks')) {
    var getProjectsArray = JSON.parse(localStorage.getItem("CreatedTasks"));
    var getProjectsList = document.getElementById("assign_task");
    if (getProjectsList) {
      for (var i = 0; i < getProjectsArray.length; i++) {
        if (value == getProjectsArray[i].TaskName) {
          document.getElementById("assign_admin_task_description").value = getProjectsArray[i].TaskDescription;
        }
      }
    }
  }
}

if (sessionStorage.getItem("session_email")) {
  console.log(sessionStorage.getItem('session_email'));
  document.getElementById("session-user").innerHTML = sessionStorage.getItem('set_user_type') + ": " + sessionStorage.getItem('session_email');

  function createNewTask() {
    event.preventDefault();
    var getTaskArray = JSON.parse(localStorage.getItem("CreatedTasks") || "[]");
    let getTaskObj = {
      TaskId: (Math.random() + 1).toString(36).substring(7),
      ProjectName: document.getElementById("createTaskForm").elements.assign_project.value,
      TaskName: document.getElementById("createTaskForm").elements.task_name.value,
      TaskDescription: document.getElementById("createTaskForm").elements.task_description.value,
      TaskStartDate: document.getElementById("createTaskForm").elements.task_start_date.value,
      TaskEndDate: document.getElementById("createTaskForm").elements.task_end_date.value,
      TaskEmail: sessionStorage.getItem('session_email')
    }
    getTaskArray.push(getTaskObj);
    localStorage.setItem('CreatedTasks', JSON.stringify(getTaskArray));
    alert('Task Created Successfully');
    window.location.href = "mytasks.html";
  }


  function assignProject() {
    event.preventDefault();
    var getAssignedProjectArray = JSON.parse(localStorage.getItem("AssignedProjects") || "[]");
    let getAssignedProjectObj = {
      AssignedId: (Math.random() + 1).toString(36).substring(7),
      AssignedProject: document.getElementById("assignProjectForm").elements.assign_project.value,
      AssignedEmail: document.getElementById("assignProjectForm").elements.assign_email.value,
      AssignedBy: sessionStorage.getItem('session_email')
    }
    getAssignedProjectArray.push(getAssignedProjectObj);
    localStorage.setItem('AssignedProjects', JSON.stringify(getAssignedProjectArray));
    alert('Project Assigned Successfully');
    window.location.href = "myprojects.html";
  }


  function assignTask() {
    event.preventDefault();
    var getAssignedTaskArray = JSON.parse(localStorage.getItem("AssignedTasks") || "[]");
    let getAssignedTaskObj = {
      AssignedTaskId: (Math.random() + 1).toString(36).substring(7),
      AssignedTask: document.getElementById("assignTaskForm").elements.assign_task.value,
      AssignedTaskEmail: document.getElementById("assignTaskForm").elements.assign_email.value,
      AssignedTaskDesription: document.getElementById("assignTaskForm").elements.assign_admin_task_description.value,
      AssignedTaskPrice: document.getElementById("assignTaskForm").elements.assign_admin_task_price.value,
      AssignedTaskPriority: document.getElementById("assignTaskForm").elements.assing_task_priority.value,
      AssignedTaskBy: sessionStorage.getItem('session_email')
    }
    getAssignedTaskArray.push(getAssignedTaskObj);
    localStorage.setItem('AssignedTasks', JSON.stringify(getAssignedTaskArray));
    alert('Task Assigned Successfully');
    window.location.href = "mytasks.html";
  }


  function createNewProject() {
    event.preventDefault();
    var getProjectArray = JSON.parse(localStorage.getItem("CreatedProjects") || "[]");
    let getProjectObj = {
      ProjectId: (Math.random() + 1).toString(36).substring(7),
      ProjectName: document.getElementById("createProjectForm").elements.project_name.value,
      ProjectDescription: document.getElementById("createProjectForm").elements.project_description.value,
      ProjectEmail: sessionStorage.getItem('session_email')
    }
    getProjectArray.push(getProjectObj);
    localStorage.setItem('CreatedProjects', JSON.stringify(getProjectArray));
    alert('Project Created Successfully');
    window.location.href = "myprojects.html";
  }


  function completeMarkedProject() {
    event.preventDefault();
    var getMarkCompletedProjectArray = JSON.parse(localStorage.getItem("MarkedCompletedProject") || "[]");
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes();
    let getMarkCompletedProjectObj = {
      ProjectCompletedName: document.getElementById("completeProjectForm").elements.mark_manager_complete_project.value,
      ProjecCreatedBy: document.getElementById("completeProjectForm").elements.mark_manager_email.value,
      AssignedProjectKey: document.getElementById("completeProjectForm").elements.assigned_project_key.value,
      ProjectCompletedDate: date,
      ProjectCompletedTime: time,
      TaskCreatedBy: document.getElementById("completeProjectForm").elements.mark_manager_complete_by.value,
      ProjectStatus: 'pending',
      ProjectCompletedBy: sessionStorage.getItem('session_email')
    }
    getMarkCompletedProjectArray.push(getMarkCompletedProjectObj);
    localStorage.setItem('MarkedCompletedProject', JSON.stringify(getMarkCompletedProjectArray));
    var getMarkedCompletedArray = JSON.parse(localStorage.getItem("AssignedProjects"));
    getMarkedCompletedArray.splice(getMarkCompletedProjectObj.AssignedProjectKey, 1);
    localStorage.setItem('AssignedProjects', JSON.stringify(getMarkedCompletedArray));
    document.getElementById("mark-completed-manager-project").innerHTML = "Done";
    alert('Project Marked Completed');
    window.location.href = "assigned-projects.html";
  }


  function markManagerCompletedProject() {
    event.preventDefault();
    var getMarkCompletedArray = JSON.parse(localStorage.getItem("MarkedCompletedProject") || "[]");
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes();
    let getMarkCompletedObj = {
      ProjectCompletedName: document.getElementById("formManagerCompleteProject").elements.mark_manager_complete.value,
      ProjectCompletedKey: document.getElementById("formManagerCompleteProject").elements.mark_manager_complete_key.value,
      ProjectCompletedBy: document.getElementById("formManagerCompleteProject").elements.mark_manager_complete_by.value,
      ProjectKey: document.getElementById("formManagerCompleteProject").elements.project_key.value,
      ProjectCompletedDate: date,
      ProjectCompletedTime: time,
      TaskCreatedBy: document.getElementById("formManagerCompleteProject").elements.task_created_by.value,
      TaskStatus: 'accepted',
      MarkCompletedBy: sessionStorage.getItem('session_email')
    }
    getMarkCompletedArray.push(getMarkCompletedObj);
    localStorage.setItem('CompletedProject', JSON.stringify(getMarkCompletedArray));
    var getMarkedCompletedArray = JSON.parse(localStorage.getItem("MarkedCompletedProject"));
    getMarkedCompletedArray.splice(getMarkCompletedObj.ProjectKey, 1);
    localStorage.setItem('MarkedCompletedProject', JSON.stringify(getMarkedCompletedArray));
    document.getElementById("mark-completed-manager-project").innerHTML = "Done";
    localStorage.removeItem('MarkCompleted');
    alert('Project Completed');
    window.location.href = "done-projects.html";
  }

  function markCompleted() {
    event.preventDefault();
    var getMarkCompletedArray = JSON.parse(localStorage.getItem("MarkCompleted") || "[]");
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes();
    let addMarkCompletedObj = {
      MarkCompletedName: document.getElementById("formMarkTask").elements.mark_completed_task.value,
      MarkCompletedId: document.getElementById("formMarkTask").elements.mark_completed_task_id.value,
      MarkCompletedHours: document.getElementById("formMarkTask").elements.completed_hours.value,
      TaskPrice: document.getElementById("formMarkTask").elements.task_price.value,
      AssignedTaskKey: document.getElementById("formMarkTask").elements.assigned_task_key.value,
      MarkCompletedDate: date,
      MarkCompletedTime: time,
      TaskCreatedBy: document.getElementById("formMarkTask").elements.task_created_by.value,
      TaskStatus: 'pending',
      MarkCompletedBy: sessionStorage.getItem('session_email')
    }
    getMarkCompletedArray.push(addMarkCompletedObj);
    localStorage.setItem('MarkedComplete', JSON.stringify(getMarkCompletedArray));
    var getMarkedCompletedArray = JSON.parse(localStorage.getItem("AssignedTasks"));
    getMarkedCompletedArray.splice(addMarkCompletedObj.AssignedTaskKey, 1);
    localStorage.setItem('AssignedTasks', JSON.stringify(getMarkedCompletedArray));
    document.getElementById("assigned-task-done").innerHTML = "Done";
    alert('Task Marked Completed');
    window.location.href = "assigned-tasks.html";
  }

  function markManagerCompleted() {
    event.preventDefault();
    var getMarkCompletedArray = JSON.parse(localStorage.getItem("MarkCompleted") || "[]");
    let markCompletedObj = {
      TaskKey: document.getElementById("formManagerCompleteTask").elements.task_key.value,
      CompletedName: document.getElementById("formManagerCompleteTask").elements.mark_manager_complete.value,
      CompletedManagerId: document.getElementById("formManagerCompleteTask").elements.task_created_by.value,
      CompletedBy: document.getElementById("formManagerCompleteTask").elements.mark_manager_complete_by.value,
      CompletedPrice: document.getElementById("formManagerCompleteTask").elements.mark_manager_complete_price.value,
      CompletedDate: document.getElementById("formManagerCompleteTask").elements.mark_manager_complete_date.value,
      TaskStatus: 'accepted',
      MarkCompletedBy: sessionStorage.getItem('session_email')
    }
    getMarkCompletedArray.push(markCompletedObj);
    localStorage.setItem('CompletedTasks', JSON.stringify(getMarkCompletedArray));
    var getMarkedCompletedArray = JSON.parse(localStorage.getItem("MarkedComplete"));
    getMarkedCompletedArray.splice(markCompletedObj.TaskKey, 1);
    localStorage.setItem('MarkedComplete', JSON.stringify(getMarkedCompletedArray));
    document.getElementById("mark-completed-manager").innerHTML = "Done";
    alert('Task Completed');
    window.location.href = "done-tasks.html";
  }

  if (localStorage.getItem('CreatedProjects')) {
    var getProjectsArray = JSON.parse(localStorage.getItem("CreatedProjects"));
    var getProjectsList = document.getElementById("projects-list");
    if (getProjectsList) {
      for (var i = 0; i < getProjectsArray.length; i++) {
        if (sessionStorage.getItem('session_email') == getProjectsArray[i].ProjectEmail) {
          getProjectsList.innerHTML += '<div class="card"><div class="card-container"><p><b>Project Id: </b>' + getProjectsArray[i].ProjectId + '</p><p><b>Project Name: </b>' + getProjectsArray[i].ProjectName + '</p><p><b>Description: </b>' + getProjectsArray[i].ProjectDescription + '</p></div></div>';
        }
      }
    }
  }

  if (localStorage.getItem('AssignedProjects')) {
    var getAssignedProjectsArray = JSON.parse(localStorage.getItem("AssignedProjects"));
    var getAssignedProjectsList = document.getElementById("assigned-projects-list");
    if (getAssignedProjectsList) {
      for (var i = 0; i < getAssignedProjectsArray.length; i++) {
        if (sessionStorage.getItem('session_email') == getAssignedProjectsArray[i].AssignedEmail) {
          getAssignedProjectsList.innerHTML += '<div class="card"><div class="card-container"><h4><b>' + getAssignedProjectsArray[i].AssignedProject + '</b></h4><p><b>Assigned By: </b>' + getAssignedProjectsArray[i].AssignedBy + '</p><form id="completeProjectForm" onsubmit="completeMarkedProject();"><input type="hidden" name="mark_manager_complete_project" id="mark_manager_complete_project" value="' + getAssignedProjectsArray[i].AssignedProject + '"/><input type="hidden" name="mark_manager_complete_by" id="mark_manager_complete_by" value="' + getAssignedProjectsArray[i].AssignedEmail + '"/><input type="hidden" name="mark_manager_email" id="mark_manager_email" value="' + getAssignedProjectsArray[i].AssignedBy + '"/><input type="hidden" name="assigned_project_key" id="assigned_project_key" value="' + i + '"/><button id="mark-completed-manager-project">Mark Completed</button></form></div></div>';
        }
      }
    }
  }

  if (localStorage.getItem('CompletedTasks')) {
    var getCompletedTasksArray = JSON.parse(localStorage.getItem("CompletedTasks"));
    var getCompletedTasksList = document.getElementById("completed-tasks-list");
    if (getCompletedTasksList) {
      for (var i = 0; i < getCompletedTasksArray.length; i++) {
        if (sessionStorage.getItem('session_email') == getCompletedTasksArray[i].CompletedManagerId) {
          getCompletedTasksList.innerHTML += '<div class="card"><div class="card-container"><h4><b>' + getCompletedTasksArray[i].CompletedName + '</b></h4><p><b>Completed By: </b>' + getCompletedTasksArray[i].CompletedBy + '</p></div></div>';
        }
      }
    }
  }

  if (localStorage.getItem('CompletedProject')) {
    var getCompletedProjectsArray = JSON.parse(localStorage.getItem("CompletedProject"));
    var getCompletedProjectsList = document.getElementById("completed-projects-list");
    if (getCompletedProjectsList) {
      for (var i = 0; i < getCompletedProjectsArray.length; i++) {
        if (sessionStorage.getItem('session_email') == getCompletedProjectsArray[i].ProjecCreatedBy) {
          getCompletedProjectsList.innerHTML += '<div class="card"><div class="card-container"><h4><p><b>Project Name: ' + getCompletedProjectsArray[i].ProjectCompletedName + '</b></p></h4><p><b>Completed By: </b>' + getCompletedProjectsArray[i].ProjectCompletedBy + '</p></div></div>';
        }
      }
    }
  }

  if (localStorage.getItem('MarkedCompletedProject')) {
    var getMarkedCompleteArray = JSON.parse(localStorage.getItem("MarkedCompletedProject"));
    var getMarkedProjectsList = document.getElementById("marked-projects-list");
    if (getMarkedProjectsList) {
      for (var i = 0; i < getMarkedCompleteArray.length; i++) {
        if ((sessionStorage.getItem('session_email') == getMarkedCompleteArray[i].ProjecCreatedBy) && (getMarkedCompleteArray[i].ProjectStatus == 'pending')) {
          getMarkedProjectsList.innerHTML += '<div class="card"><div class="card-container"><h4><b>' + getMarkedCompleteArray[i].ProjectCompletedName + '</b></h4><p><b>Assigned By: </b>' + getMarkedCompleteArray[i].ProjectCompletedBy + '</p><p><b>Completed Date: </b>' + getMarkedCompleteArray[i].ProjectCompletedDate + '</p><form id="formManagerCompleteProject" onsubmit="markManagerCompletedProject();"><input type="hidden" name="mark_manager_complete" id="mark_manager_complete" value="' + getMarkedCompleteArray[i].ProjectCompletedName + '"/><input type="hidden" name="mark_manager_complete_key" id="mark_manager_complete_key" value="' + getMarkedCompleteArray[i] + '"/><input type="hidden" name="mark_manager_complete_by" id="mark_manager_complete_by" value="' + getMarkedCompleteArray[i].ProjectCompletedBy + '"/><input type="hidden" name="mark_manager_complete_date" id="mark_manager_complete_date" value="' + getMarkedCompleteArray[i].ProjectCompletedDate + '"/><input type="hidden" name="task_created_by" id="project_created_by" value="' + getMarkedCompleteArray[i].ProjecCreatedBy + '"/><input type="hidden" name="project_key" id="project_key" value="' + i + '"/><button id="mark-completed-manager-project">Mark Completed</button></form></div></div>';
        }
      }
    }
  }

  if (localStorage.getItem('MarkedComplete')) {
    var getMarkedTasksArray = JSON.parse(localStorage.getItem("MarkedComplete"));
    var getMarkedTasksList = document.getElementById("marked-tasks-list");
    if (getMarkedTasksList) {
      for (var i = 0; i < getMarkedTasksArray.length; i++) {
        if ((sessionStorage.getItem('session_email') == getMarkedTasksArray[i].TaskCreatedBy) && (getMarkedTasksArray[i].TaskStatus == 'pending')) {
          getMarkedTasksList.innerHTML += '<div class="card"><div class="card-container"><h4><b>' + getMarkedTasksArray[i].MarkCompletedName + '</b></h4><p><b>Assigned By: </b>' + getMarkedTasksArray[i].MarkCompletedBy + '</p><p><b>Total Time: </b>' + getMarkedTasksArray[i].MarkCompletedHours + '</p><p><b>Total Price: </b>' + ((getMarkedTasksArray[i].MarkCompletedHours) * (getMarkedTasksArray[i].TaskPrice)) + '</p><p><b>Completed Date: </b>' + getMarkedTasksArray[i].MarkCompletedDate + '</p><p><b>Complete Time: </b>' + getMarkedTasksArray[i].MarkCompletedTime + '</p><form id="formManagerCompleteTask" onsubmit="markManagerCompleted();"><input type="hidden" name="mark_manager_complete" id="mark_manager_complete" value="' + getMarkedTasksArray[i].MarkCompletedName + '"/><input type="hidden" name="mark_manager_complete_by" id="mark_manager_complete_by" value="' + getMarkedTasksArray[i].MarkCompletedBy + '"/><input type="hidden" name="mark_manager_complete_price" id="mark_manager_complete_price" value="' + ((getMarkedTasksArray[i].MarkCompletedHours) * (getMarkedTasksArray[i].TaskPrice)) + '"/><input type="hidden" name="mark_manager_complete_date" id="mark_manager_complete_date" value="' + getMarkedTasksArray[i].MarkCompletedDate + '"/><input type="hidden" name="task_created_by" id="task_created_by" value="' + getMarkedTasksArray[i].TaskCreatedBy + '"/><input type="hidden" name="task_key" id="task_key" value="' + i + '"/><button id="mark-completed-manager">Mark Completed Task</button></form></div></div>';
        }
      }
    }
  }

  if (localStorage.getItem('AssignedProjects')
  ) {
    if (document.getElementById("assigned-projects")) {
      document.getElementById("assigned-projects").innerHTML = '<div class="no-task">No Project Assigned</div>';
    }
  }

  if (localStorage.getItem('AssignedTasks')) {
    var getAssignedTasksArray = JSON.parse(localStorage.getItem("AssignedTasks"));
    if (getAssignedTasksArray) {
      var getAssignedTasksList = document.getElementById("assigned-tasks-list");
      if (getAssignedTasksList) {
        for (var i = 0; i < getAssignedTasksArray.length; i++) {
          if (sessionStorage.getItem('session_email') == getAssignedTasksArray[i].AssignedTaskEmail) {
            getAssignedTasksList.innerHTML += '<div class="card"><div class="card-container"><h4><b>' + getAssignedTasksArray[i].AssignedTask + '</b></h4><p><b>Assigned By: </b>' + getAssignedTasksArray[i].AssignedTaskBy + '</p><p><b>Priority: </b>' + getAssignedTasksArray[i].AssignedTaskPriority + '</p><p><b>Description: </b>' + getAssignedTasksArray[i].AssignedTaskDesription + '</p><form id="formMarkTask" onsubmit="markCompleted();"><p>Total Hours : <input type="text" name="completed_hours" id="completed_hours" value=""/></p><input type="hidden" name="mark_completed_task_id" id="mark_completed_task_id" value="' + getAssignedTasksArray[i].AssignedTaskId + '"/><input type="hidden" name="task_created_by" id="task_created_by" value="' + getAssignedTasksArray[i].AssignedTaskBy + '"/><input type="hidden" name="mark_completed_task" id="mark_completed_task" value="' + getAssignedTasksArray[i].AssignedTask + '"/><input type="hidden" name="task_price" id="task_price" value="' + getAssignedTasksArray[i].AssignedTaskPrice + '"/><input type="hidden" name="assigned_task_key" id="assigned_task_key" value="' + i + '"/><button id="assigned-task-done">Mark Completed</button></form></div></div>';
          }
        }
      }
    }
    else {
      if (document.getElementById("assigned-tasks")) {
        document.getElementById("assigned-tasks").innerHTML = '<div class="no-task">No Task Assigned</div>';
      }
    }

  }

  if (localStorage.getItem('CreatedProjects')) {
    var getProjectsArray = JSON.parse(localStorage.getItem("CreatedProjects"));
    var getProjectsList = document.getElementById("assign_project");
    if (getProjectsList) {
      for (var i = 0; i < getProjectsArray.length; i++) {
        if (sessionStorage.getItem('session_email') == getProjectsArray[i].ProjectEmail) {
          getProjectsList.innerHTML += '<option  id="assign_project" value="' + getProjectsArray[i].ProjectName + '">' + getProjectsArray[i].ProjectName + '</option>';
        }
      }
    }
  }

  if (localStorage.getItem('CreatedTasks')) {
    var getProjectsArray = JSON.parse(localStorage.getItem("CreatedTasks"));
    var getProjectsList = document.getElementById("assign_task");
    if (getProjectsList) {
      for (var i = 0; i < getProjectsArray.length; i++) {
        if (sessionStorage.getItem('session_email') == getProjectsArray[i].TaskEmail) {
          getProjectsList.innerHTML += '<option  id="assign_task" value="' + getProjectsArray[i].TaskName + '">' + getProjectsArray[i].TaskName + '</option>';
        }
      }
    }
  }

  if (localStorage.getItem('userDetail')) {
    var getEmailsArray = JSON.parse(localStorage.getItem("userDetail"));
    var getEmailsList = document.getElementById("assign_email");
    if (getEmailsList) {
      for (var i = 0; i < getEmailsArray.length; i++) {
        if (sessionStorage.getItem('session_email') != getEmailsArray[i]) {
          getEmailsList.innerHTML += '<option  id="assign_email" value="' + getEmailsArray[i] + '">' + getEmailsArray[i] + '</option>';
        }
      }
    }
  }

  if (localStorage.getItem('CreatedTasks')) {
    var getTasksArray = JSON.parse(localStorage.getItem("CreatedTasks"));
    var getTasksList = document.getElementById("tasks-list");
    if (getTasksList) {
      for (var i = 0; i < getTasksArray.length; i++) {
        if (sessionStorage.getItem('session_email') == getTasksArray[i].TaskEmail) {
          getTasksList.innerHTML += '<div class="card"><div class="card-container"><h4><b>' + getTasksArray[i].TaskName + '</b></h4><p><b>Start : </b>' + getTasksArray[i].TaskStartDate + ' <b>End : </b>' + getTasksArray[i].TaskEndDate + '</p><p><b>Description : </b>' + getTasksArray[i].TaskDescription + '</p></div></div>';
        }
      }
    }
  }
}

if ((sessionStorage.getItem('set_user_type') == 'User')) {
  if (document.getElementById("task-create")) {
    document.getElementById("task-create").style.display = "none";
    document.getElementById("task-assign").style.display = "none";
    document.getElementById("task-completed").style.display = "none";
    document.getElementById("task-marked").style.display = "none";
  }
  if (document.getElementById("project-create")) {
    document.getElementById("project-create").style.display = "none";
    document.getElementById("project-assign").style.display = "none";
    document.getElementById("project-marked").style.display = "none";
    document.getElementById("project-completed").style.display = "none";
  }
}

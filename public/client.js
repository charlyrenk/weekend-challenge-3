console.log('client.js has been loaded');

$(document).ready(function () {
    console.log('jQuery has been loaded');
    getTasks();
    $('#addTaskButton').on('click', function () {
        console.log('addTaskButton was clicked')
    })
    var taskInput = $('#taskInput').val();
    var inputObject = {
        task: taskInput
    }

})

function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/task',
        success: function (response) {
            console.log(response);
            displayTasks(response);
        }
    })
}

function displayTasks(tasksArray) {
    $('#toDoList').empty(); // clears all tasks currently on DOM

    for (var i = 0; i < tasksArray.length; i++) {
        var task = tasksArray[i]; 
        var $tasksDiv = $('<div></div>'); 
        $tasksDiv.data('id', task.id);
        $tasksDiv.append(task.task)
        $tasksDiv.append('<button class="completeButton">Complete</button>'); 
        $tasksDiv.append('<button class="deleteButton">Delete</button>')
        $('#toDoList').prepend($tasksDiv); 
    }
}
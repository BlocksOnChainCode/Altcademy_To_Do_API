
$(document).ready(function() {

  // add item button event listener
  $('#add-item-button').click(function() {
    var newItem = $('#new-item-input').val();

    //
    $.ajax({
      type: 'POST',
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=112',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        content: $('#new-item-input').val(),
      }),
      success: function (response, textStatus) {
        console.log(response);
        $('#all-tasks-container').empty();
        fetchTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    console.log("reloaded?");
  });

  fetchTasks();
  
  $(document).on('click', '.delete-button', function() {
    var taskId = $(this).data('task-id');
    var deleteUrl = `https://fewd-todolist-api.onrender.com/tasks/${taskId}?api_key=112`;
    var $item = $(this).closest('.item');
    
    $.ajax({
      type: 'DELETE',
      url: deleteUrl,
      success: function (response, textStatus) {
        console.log(response);
        $item.remove();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  });
  
  
  
  // checkbox change event listener
  $(document).on('change', ':checkbox', function() {
    var itemId = $(this).parent().data('id');
    var completed = $(this).prop('checked');
    
    $.ajax({
      type: 'PUT',
      url: `https://fewd-todolist-api.onrender.com/tasks/${itemId}/mark_complete?api_key=112`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        completed: true
      }),
      success: function (response, textStatus) {
        fetchTasks();
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  });
  
  
  
  function switchContainers(container) {
    // hide all containers
    $('#all-tasks-container').hide();
    $('#completed-tasks-container').hide();
    
    // show the selected container
    $('#' + container + '-tasks-container').show();
  }
  
  
  
  $(document).ready(function() {
    // switch container when button is clicked
    $('#navigation button').click(function() {
      var container = $(this).text().toLowerCase();
      switchContainers(container);
    });
  }); 
});

function fetchTasks() {
  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=112',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      // response is a parsed JavaScript object instead of raw JSON
      $('#all-tasks-container').empty();
      $('#completed-tasks-container').empty(); // clear both containers
      for (var i = 0; i < response.tasks.length; i++) {
        // create a new item for each task and add it to the list
        var task = response.tasks[i];
        var itemHtml = `
          <div class="item" data-id="${task.id}">
            <input type="checkbox" id="myCheckbox${i}" ${task.completed ? 'checked' : ''}>
            <label for="myCheckbox${i}">${task.content}</label>
            <button class="delete-button" data-task-id="${task.id}">Delete</button>
          </div>
        `;
        if (task.completed) {
          $('#completed-tasks-container').append(itemHtml);
        } else {
          $('#all-tasks-container').append(itemHtml);
        }
      }
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}



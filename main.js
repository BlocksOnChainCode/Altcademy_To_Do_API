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
        content: $('#new-item-input').val()
      }),
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  });

  $.ajax({
    type: 'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=112',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      // response is a parsed JavaScript object instead of raw JSON
      for (var i = 0; i < response.tasks.length; i++) {
        // create a new item for each task and add it to the list
        var task = response.tasks[i];
        var itemHtml = `
          <div class="item">
            <input type="checkbox" id="myCheckbox${i}">
            <label for="myCheckbox${i}">${task.content}</label>
            <button class="delete-button" data-task-id="${task.id}">Delete</button>
          </div>
        `;
        $('#container').append(itemHtml);
      }
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });


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



});

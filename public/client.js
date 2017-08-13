console.log('client.js has been loaded');

$(document).ready(function () {
    console.log('jQuery has been loaded');
    $('#addTaskButton').on('click', function () {
        console.log('addTaskButton was clicked')
    })
})
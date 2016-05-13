$(document).ready(function(){
    // WebSocket
    var socket = io('http://localhost:8080');
    // neue Nachricht
    socket.on('chat', function (data) {
        var zeit = new Date(data.zeit);
        $('.chat-body').append(
            $('<li></li>').append(
                // Uhrzeit
                $('<span>').text('[' +
                    (zeit.getHours() < 10 ? '0' + zeit.getHours() : zeit.getHours())
                    + ':' +
                    (zeit.getMinutes() < 10 ? '0' + zeit.getMinutes() : zeit.getMinutes())
                    + '] '
                ),
                // Name
                $('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
                // Text
                $('<span>').text(data.text))
        );
        // nach unten scrollen
        $('.chat-body').scrollTop($('.chat-body')[0].scrollHeight);
    });
    // Nachricht senden
    function senden(){
        // Eingabefelder auslesen
        var name = 'Alex';
        var text = $('#new-msg-input').val();
        // Socket senden
        socket.emit('chat', { name: name, text: text });
        // Text-Eingabe leeren
        $('#new-msg-input').val('');
    }
    // bei einem Klick
   // $('#senden').click(senden);
    // oder mit der Enter-Taste
    $('#new-msg-input').keypress(function (e) {
        if (e.which == 13) {
            senden();
        }
    });
});

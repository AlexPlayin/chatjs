$(function () {
    $('#btn-submit').click(function () {

        var tmp_username = $('#username').val();
        var password = $('#password').val();

        if (!tmp_username === '' && !password === '') {
            $.ajax({
                url: '/login/post',
                method: 'POST',
                data: {
                    'username': tmp_username,
                    'password': password
                },
                success: function (data) {
                    var mydata = $.parseJSON(data);
                    if (mydata.success === 1) {

                        chat(mydata.token, mydata.username, mydata.avatar);

                    }
                },
                failure: function () {

                }
            });
        }

    });

    function chat(token, username, avatar) {
        var chatclient = Client('http://192.168.178.230:8080', token);
        $('.login').css('display', 'none');
        $('.chat').css('display', 'block');
        $('#user_name').text(username);
    }
});

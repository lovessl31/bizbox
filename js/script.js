// // 스크롤 헤더 이벤트
// document.addEventListener('DOMContentLoaded', function() {
//     const header = document.querySelector('.header');

//     //스크롤 이벤트를 감지하여 헤더의 스타일을 변경
//     function toogleHeaderBorder() {
//         if(window.scrollY > 0) {
//             header.classList.add('scrolled');
//         } else {
//             header.classList.remove('scrolled');
//         }
//     }

//     // 스크롤 이벤트에 함수 연결
//     window.addEventListener('scroll', toogleHeaderBorder);
// });



$(document).ready(function() {
    // 스크롤 헤더 이벤트
    const $header = $('.header');

    function toogleHeaderBorder() {
        if($(window).scrollTop() > 0) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    }

    $(window).on('scroll', toogleHeaderBorder);

    // 로그인 상태에 따라 헤더 버튼 업데이트
    function updateHeaderButton() {
        if (localStorage.getItem('loggedIn') === 'true') {
            $('#loginButtonHeader').text('로그아웃').attr('id', 'logoutButton');
        } else {
            $('#logoutButton').text('로그인').attr('id', 'loginButtonHeader');
        }
    }

    // 페이지 로드 시 헤더 버튼 상태 업데이트
    updateHeaderButton();

    // 서비스 신청 링크 클릭 이벤트
    $('.nav a[href="service.html"]').click(function(event) {
        if(!localStorage.getItem('loggedIn')) {
            // 로그인 상태가 아닌 경우 로그인 페이지로 이동
            event.preventDefault();
            window.location.href = 'login.html';
        }
    });

    // 비밀번호 표시 토글
    $('#passwordToggleImage').click(function() {
        const passwordInput = $('#passwordInput');
        const toggleImage = $('#toggleImage');

        // 비밀번호 입력 필드의 현재 타입 확인
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            toggleImage.attr('src', 'images/hidden.png');
        } else {
            passwordInput.attr('type', 'password');
            toggleImage.attr('src', 'images/visual.png');
        }
    });

    // 포커스와 값의 존재에 따라 토글 이미지 표시/숨김 관리
    $('#passwordInput').on('focus blur input', function() {
        const $wrapper = $(this).closest('.textInputWrapper');

        if ($(this).val()) {
            $wrapper.addClass('has-value');
        } else {
            $wrapper.removeClass('has-value');
        }

        if ($(this).is(':focus')) {
            $wrapper.addClass('focused');
        } else {
            $wrapper.removeClass('focused');
        }
    });

    // // 로그인 버튼 클릭 이벤트
    // $('#loginButton').click(function() {
    //     const id = $('#idInput').val();
    //     const password = $('#passwordInput').val();
    //     const autoLogin = $('#autoLoginCheckbox').is(':checked');

    //     if (autoLogin) {
    //         // 자동 로그인 정보 저장
    //         localStorage.setItem('autoLogin', 'true');
    //         localStorage.setItem('id', id);
    //         localStorage.setItem('password', password);
    //     } else {
    //         // 자동 로그인 정보 제거
    //         localStorage.removeItem('autoLogin');
    //         localStorage.removeItem('id');
    //         localStorage.removeItem('password');
    //     }
    //     login(id, password);
    // });

    // // 로그인 함수
    // function login(id, password) {
    //     const formData = {
    //         id: id,
    //         password: password
    //     };

    //     // AJAX 요청 보내기
    //     $.ajax({
    //         url: 'http://192.168.0.18:3001/biz/login',
    //         type: 'POST',
    //         data: formData,
    //         success: function(response) {
    //             console.log('로그인 성공:', response);
    //             localStorage.setItem('loggedIn', 'true');
    //             updateHeaderButton();
    //             window.location.href = 'index.html';
    //         },
    //         error: function(error) {
    //             console.log('로그인 실패:', error);
    //             alert('로그인에 실패하였습니다. 다시 시도해 주세요.');
    //         }
    //     });
    // }

    // // 로그아웃 버튼 클릭 이벤트
    // $(document).on('click', '#logoutButton', function() {
    //     $.ajax({
    //         url: 'http://192.168.0.18:3001/biz/logout',
    //         type: 'GET',
    //         success: function(response) {
    //             console.log('로그아웃 성공:', response);
    //             // 로그아웃 성공 시 loggedIn 값을 false로 설정
    //             localStorage.setItem('loggedIn', 'false');
    //             updateHeaderButton();
    //             window.location.href = 'index.html';
    //         },
    //         error: function(error) {
    //             console.log('로그아웃 실패:', error);
    //             alert('로그아웃에 실패하였습니다. 다시 시도해 주세요.');
    //         }
    //     });
    // });

    // 로그인 버튼 클릭 이벤트
    $('#loginButton').click(function() {
        const id = $('#idInput').val();
        const password = $('#passwordInput').val();

        const formData = {
            id: id,
            password: password,
        };

        // AJAX 요청 보내기
        $.ajax({
            url: 'http://192.168.0.18:3001/biz/login',
            type: 'POST',
            data: formData,
            xhrFields: {
                withCredentials: true
            },
            success: function(response) {
                // window.location.href = 'index.html';
                console.log('로그인 성공:', response);
                console.log('현재 저장된 쿠키:', document.cookie);
                updateHeaderButton();
            },
            error: function(error) {
                console.log('로그인 실패:', error);
                alert('로그인에 실패하였습니다. 다시 시도해 주세요.');
            }
        });
    });

    // 로그아웃 버튼 클릭 이벤트
    $(document).on('click', '#logoutButton', function() {
        $.ajax({
            url: 'http://192.168.0.18:3001/biz/logout',
            type: 'GET',
            success: function(response) {
                console.log('로그아웃 성공:', response);
                updateHeaderButton(); // 헤더 버튼 업데이트
                window.location.href = 'index.html'; // 로그아웃 후 이동할 페이지 설정
            },
            error: function(error) {
                console.log('로그아웃 실패:', error);
                alert('로그아웃에 실패하였습니다. 다시 시도해 주세요.');
            }
        });
    });


    $('#loginForm').on('submit', function(event) {
        event.preventDefault(); // 기본 폼 제출을 막음

        $.ajax({
            url : "http://192.168.0.18:3001/biz/login",
            type: 'POST',
            data: $(this).serialize(), // 폼 데이터를 직렬화
            xhrFields: {
                withCredentials: true // 세션 쿠키를 포함하여 요청 보냄
            },
            success: function(response) {
                console.log('Login successful');
                // 로그인 성공 후 서버가 세션 쿠키를 클라이언트에게 보냄
            },
            error: function(xhr, status, error) {
                console.error('Login failed:', status, error);
            }
        });
    });

});

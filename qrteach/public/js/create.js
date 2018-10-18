jQuery(document).ready(function () {
    let testData = {
        testOptions: {
            timeTest: {
                minutes: null,
                seconds: null
            }
        },
        test: [null, null, null, null, null]
    };
    let index = null;
    let tabIndex = null;

    function upTaskInfo(index) {
        $('#question').val(testData.test[index].question);
        $('#answer').val(testData.test[index].answers.right);
        $('#wrong1').val(testData.test[index].answers.wrongs[0]);
        $('#wrong2').val(testData.test[index].answers.wrongs[1]);
        $('#wrong3').val(testData.test[index].answers.wrongs[2]);
        $('#req-min').val(testData.test[index].timeTask.minutes);
        $('#req-sec').val(testData.test[index].timeTask.seconds);
    }
    function clearFields(index) {
        $('#question').val('');
        $('#answer').val('');
        $('#wrong1').val('');
        $('#wrong2').val('');
        $('#wrong3').val('');
        $('#req-min').val('');
        $('#req-sec').val('');
    }
    $('.tab').click(function () {
        if (tabIndex !== null && tabIndex !== "test") $('#taskTab').removeClass('chosen');
        else $('#testTab').removeClass('chosen');
        if (tabIndex === null) {
            if ($(this).attr('id') === "taskTab") {
                if (index === null) index = 0;
                if (testData.test[index] !== null) upTaskInfo(index);
                $('table tbody tr').eq(index).addClass('chosen');
                if (testData.test[index] === null) {
                    testData.test[index] = {
                        question: null,
                        answers: {
                            right: null,
                            wrongs: [null, null, null]
                        },
                        maxMark: null,
                        timeTask: {
                            minutes: null,
                            seconds: null
                        },
                        isOver: false
                    };
                }
                $('#task').fadeIn(300).delay(310).removeClass('not-chosen');
            }
            else $('#test').fadeIn(300).delay(310).removeClass('not-chosen');
        } else {
            if ($(this).attr('id') === "taskTab") {
                if (index === null) index = 0;
                if (testData.test[index] !== null) upTaskInfo(index);
                if (testData.test[index] === null) {
                    testData.test[index] = {
                        question: null,
                        answers: {
                            right: null,
                            wrongs: [null, null, null]
                        },
                        maxMark: null,
                        timeTask: {
                            minutes: null,
                            seconds: null
                        },
                        isOver: false
                    };
                }
                $('table tbody tr').eq(index).addClass('chosen');
                $('#test').fadeOut(300);
                setTimeout(function () {
                    $('#task').fadeIn(300);
                }, 310);
            }
            else {
                if (index !== null) {
                    $('table tbody tr').eq(index).removeClass('chosen');
                    upTaskInfo(index);
                }
                $('#task').fadeOut(300);
                setTimeout(function () {
                    $('#test').fadeIn(300);
                }, 310);
            }
        }
        tabIndex = ($(this).attr('id') === "taskTab") ? "task":"test";
        $(this).addClass('chosen');
    });
    $('table tbody tr').click(function () {
        if (index !== null) $('table tbody tr').eq(index).removeClass('chosen');
        index = $(this).index();
        $(this).addClass('chosen');
        if (index + 1 <= $('table tbody tr:last-child').index()) $('.next-task').fadeIn(300);
        else $('.next-task').fadeOut(200);

        if (testData.test[index] === null) {
            testData.test[index] = {
                question: null,
                answers: {
                    right: null,
                    wrongs: [null, null, null]
                },
                maxMark: null,
                timeTask: {
                    minutes: null,
                    seconds: null
                },
                isOver: false
            };
            clearFields(index);
        } else upTaskInfo(index);
        $('#taskTab').addClass('chosen');
        if (tabIndex === null) $('#task').fadeIn(300).delay(310).removeClass('not-chosen');
        else if (tabIndex === "test") {
            $('#testTab').removeClass('chosen');
            $('#test').fadeOut(300);
            setTimeout(function () {
                $('#task').fadeIn(300);
            }, 310);
        }
        tabIndex = "task";
    });

    $('#question').keyup(function () {
        let txt;
        let tdWidth = $('tbody tr').eq(index).find('td:nth-child(2)').width();
        if ($('tbody tr').eq(index).find('td:nth-child(2) .question-container').width() + 40 >= tdWidth && !testData.test[index].isOver) {
            txt = $('tbody tr').eq(index).find('td:nth-child(2) .question-container').text();
            txt += "...";
            testData.test[index].isOver = true;
        } else if ($('tbody tr').eq(index).find('td:nth-child(2) .question-container').width() + 40 < tdWidth) txt = $(this).val();
        $('tbody tr').eq(index).find('td:nth-child(2) .question-container').text(txt);

        testData.test[index].question = $(this).val();
    });
    $('#answer').change(function () {
        testData.test[index].answers.right = $(this).val();
    });
    $('#wrong1').change(function () {
        testData.test[index].answers.wrongs[0] = $(this).val();
    });
    $('#wrong2').change(function () {
        testData.test[index].answers.wrongs[1] = $(this).val();
    });
    $('#wrong3').change(function () {
        testData.test[index].answers.wrongs[2] = $(this).val();
    });
    $('#max-mark').change(function () {
        testData.test[index].maxMark = $(this).val();
    });
    $('#req-min').change(function () {
        testData.test[index].timeTask.minutes = $(this).val();
    });
    $('#req-sec').change(function () {
        testData.test[index].timeTask.seconds = $(this).val();
    });
    $('#req-test-min').change(function () {
        testData.testOptions.timeTest.minutes = $(this).val();
        $('#time-test #test-min').text($(this).val() + ' минут(-а)');
    });
    $('#req-test-sec').change(function () {
        testData.testOptions.timeTest.seconds = $(this).val();
        $('#time-test #test-sec').text($(this).val() + ' секунд(-а)');
    });
    $('.next-task').click(function () {
        $('table tbody tr').eq(index).removeClass('chosen');
        index++;
        $('table tbody tr').eq(index).addClass('chosen');
        if (index === $('table tbody tr:last-child').index()) $(this).fadeOut(200);
        if (testData.test[index] !== null) upTaskInfo(index);
        else clearFields(index);
    });
    $('button').click(function (e) {
        e.preventDefault();
        console.log(testData);
        let ajax = new XMLHttpRequest();
        ajax.open('POST', '/create/QR', true);
        ajax.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        ajax.setRequestHeader("Content-type", "application/*+json");
        ajax.onreadystatechange = function () {
            if (this.status !== 4) return;
            let ans = JSON.parse(this.responseText);
            console.log(ans);
        };
        ajax.send(JSON.stringify(testData));
    })
});